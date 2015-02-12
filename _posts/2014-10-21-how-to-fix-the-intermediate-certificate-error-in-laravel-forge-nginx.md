---
title: How to fix the Intermediate Certificate error in Laravel Forge (nginx)
author: Chris
layout: post
permalink: /2014/10/how-to-fix-the-intermediate-certificate-error-in-laravel-forge-nginx/
dsq_thread_id:
  - 3140663732
categories:
  - DevOps
tags:
  - certificate
  - forge
  - godaddy
  - laravel
  - ssl
---
When setting up a new site in [Laravel Forge](https://forge.laravel.com) with an SSL certificate, I kept on coming across an "Intermediate Certificate" error in some browsers and SSL checkers online. From always using Apache in the past, I had never come across this before.<!--more-->

After a lot of poking and prodding around the internet I was able to find a solution. In nginx, which is what Laravel Forge uses, you need to include the certificate bundle that comes with your standard certificate. I usually get my personal and side project SSL certificates from GoDaddy.com, but this will work with any SSL provider.

Once you download the SSL files to your computer (usually a zip file), open your terminal and enter the following:

{% gist cmgmyr/97f49ae311ae1043bac4 %}

Where __godaddy-ca.crt__ is your certificate file, __gd_bundle.crt__ is your additional bundle file from your provider, and __godaddy-combined.crt__ is the new name you want your certificate to be. Now simply upload your __godaddy-combined.crt__ file to Laravel Forge, and you'll be all set.

__Note__: If you want to skip this step and just copy/paste your SSL into the Forge interface, you can do that too. Just make sure that you paste your certificate code **BEFORE** your bundle code.