---
title: How to alter Laravel's "quickstart" authentication process
author: Chris
layout: post
permalink: /2015/05/how-to-alter-laravels-quickstart-authentication-process/
categories:
  - Code
tags:
  - laravel
  - code
  - authentication
---
Laravel makes it super easy to get a new app up and running. Sometimes too easy. How do you use these features to benefit you and your new app when your new app doesn't seem to fit the use case? Let's take a look...<!--more-->

## Use Case

You want to be able to be able to utilize Laravel's simple `Illuminate\Foundation\Auth\AuthenticatesUsers` (or `AuthenticatesAndRegistersUsers`) trait, but you want to have another credential to check against, like `active` being set in the database to `true`.

## The Problem

When you look into `Illuminate\Foundation\Auth\AuthenticatesUsers` you'll see:

	public function postLogin(Request $request)
    {
        $this->validate($request, [
            $this->loginUsername() => 'required', 'password' => 'required',
        ]);                

        $throttles = $this->isUsingThrottlesLoginsTrait();

        if ($throttles && $this->hasTooManyLoginAttempts($request)) {
            return $this->sendLockoutResponse($request);
        }

        $credentials = $this->getCredentials($request);

        if (Auth::attempt($credentials, $request->has('remember'))) {
            return $this->handleUserWasAuthenticated($request, $throttles);
        }

        if ($throttles) {
            $this->incrementLoginAttempts($request);
        }

        return redirect($this->loginPath())
            ->withInput($request->only($this->loginUsername(), 'remember'))
            ->withErrors([
                $this->loginUsername() => $this->getFailedLoginMessage(),
            ]);
    }

There is a lot going on in there, which we don't want to duplicate. What we're really interested is in this block:

	$credentials = $this->getCredentials($request);

    if (Auth::attempt($credentials, $request->has('remember'))) {
       return $this->handleUserWasAuthenticated($request, $throttles);
    }

We already know that we can include more credentials when calling `Auth::attempt()`. But we need to figure out the best way to *merge* them with what we are already getting. So lets take a look at `$this->getCredentials($request)`:

	protected function getCredentials(Request $request)
    {
        return $request->only($this->loginUsername(), 'password');
    }

We *could* simply override the method and do something like this within our `AuthController`:

	protected function getCredentials(Request $request)
    {
        $login = $request->only($this->loginUsername(), 'password');
        
        return array_merge($login, ['active' => 1]);
    }
    
but that would mean we are duplicating `$request->only($this->loginUsername(), 'password');` which is not ideal. Well what are our options? We are using a trait instead of extending a class, so we can't use something like `parent::getCredentials($request)`. We can alias the method on the trait though!

At the top of your `AuthController` you'll have something that looks like:

	use AuthenticatesUsers, ThrottlesLogins;
	
You'll need to update that to look like:

	use AuthenticatesUsers {
        getCredentials as traitGetCredentials;
    }

    use ThrottlesLogins;

This is telling PHP to simply alias the `getCredentials()` method to be called by `traitGetCredentials()` instead. Then your new `AuthController@getCredentials()` will look like:

	protected function getCredentials(Request $request)
    {
        $login = $this->traitGetCredentials($request);

        return array_merge($login, ['active' => 1]);
    }
    
Bonus points if you refactor this a bit more, because [Adam Wathan](https://twitter.com/adamwathan) doesn't like temporary variables:

	protected function getCredentials(Request $request)
    {
        return array_merge($this->traitGetCredentials($request), ['active' => 1]);
    }
    
## Full Solution

Now your `AuthController` should look something like this (use statements and comments removed for brevity):

	class AuthController extends Controller
	{
    	use AuthenticatesUsers {
    	    getCredentials as traitGetCredentials;
    	}

    	use ThrottlesLogins;
    
    	public function __construct()
    	{
        	$this->middleware('guest', ['except' => 'getLogout']);
	    }
    
    	protected function getCredentials(Request $request)
	    {
	        return array_merge($this->traitGetCredentials($request), ['active' => 1]);
    	}
	}

Pretty simple, right?

## Final Thoughts

* Look through the "parent" code first to really understand what it's doing before you start working through a new solution.
* Duplicating code is usually never the best way to solve a problem. Look to see if you can re-use, or extend, other functionality first.
* See what secrets PHP has to offer. Look through the manual and ask questions. You'll be surprised what it can do for you.
* Refactor your solution to make it as easy to use and as readable as you can. Your future self will thank you!
