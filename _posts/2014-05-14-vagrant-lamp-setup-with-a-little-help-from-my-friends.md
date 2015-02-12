---
title: Vagrant LAMP Setup (with a little help from my friends)
author: Chris
layout: post
permalink: /2014/05/vagrant-lamp-setup-with-a-little-help-from-my-friends/
dsq_thread_id:
  - 2684925921
categories:
  - Vagrant
tags:
  - Ansible
  - bash
  - Chef
  - MAMP
  - Puppet
  - Vagrant
  - WAMP
  - XAMPP
---
Over the last year or so there has been a lot of hype around Vagrant and other Virtual Machine type systems. Ever since I've converted to a Mac I've been on MAMP 2, which has been great. But as the projects get larger, the multiple production environments enter into the picture, and other complications pop up, MAMP loses some steam.<!--more-->

As a single developer things like MAMP, WAMP, and XAMPP, are great - but when is it time to take it to the next level? Personally I wanted to learn more about Linux, devops, and the tools that go with it. I have a number of personal projects that I can try this stuff out with and it would help with future full time, or contracting gigs. Vagrant is a great tool that you can use locally on your machine and it makes it easy to test out and use different provisioning options like a simple bash script, Chef, Puppet, or Ansible. There are a million blog posts out there to help you install and set up and initial environment, so I won't repeat that here.

I just wanted to share my initial Vagrant set up which you can find here: [https://github.com/cmgmyr/vagrant-setup](https://github.com/cmgmyr/vagrant-setup) Feel free to fork or do a pull request to add in some new features and options. Please leave a comment below with any questions/comments you have too