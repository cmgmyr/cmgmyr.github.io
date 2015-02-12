---
title: 'Debugging Uncaught Error: [$injector:modulerr] in AngularJS'
author: Chris
layout: post
permalink: /2014/08/debugging-uncaught-error-injectormodulerr-in-angularjs/
dsq_thread_id:
  - 2941396345
categories:
  - Angular
---
In a current AngularJS project at work I came across the following error after merging some changes from a teammate.<!--more-->

    Uncaught Error: [$injector:modulerr] Failed to instantiate module app due to:
    Error: [$injector:modulerr] Failed to instantiate module app due to:
    Error: [$injector:modulerr] Failed to instantiate module app.common due to:
    Error: [$injector:moduler......1)

<!--more-->

## The Reason

Something is either not found, or has been moved/renamed. In my case a few pieces of code have been moved and their references have been updated, which then broke my code.

## The Solution

  1. Open your angular.js file
  2. Go to lines 71-72, and you will see the following (depending on your version): <div class="hl-container">

        message = message + '\nhttp://errors.angularjs.org/1.3.0-beta.8/' +
        (module ? module + '/' : '') + code;

  3. After the second line (72) add a: `console.log(message);`

  4. Refresh the your app and view the top of your console. Within a few logs there will be a reference to what Angular could not find.
  5. Simply do a search/replace within your code base for the incorrect reference and update it to the new reference. Refresh the app again and you should be all set.

**What are your other tips & tricks for debugging Angular?**