---
title: CodeIgniter Pagination Library
author: Chris
layout: post
permalink: /2011/02/codeigniter-pagination-library/
dsq_thread_id:
  - 236899454
categories:
  - Code
  - CodeIgniter
tags:
  - Code
  - CodeIgniter
  - Library
---
Over the last few years I&#8217;ve been using my own version of pagination for CodeIgniter. The default one is pretty weak for my purposes, so I created one for all of my projects that has been very handy. <!--more-->There has been a number of posts on the CodeIgniter forums and their UserVoice account about updating their included pagination library, so I decided to [share mine][1].

## Installation

  1. Drop everything into your application folder (assets folder is just for demo purposes)
  2. Use: $config[&#8216;uri\_protocol&#8217;] = &#8216;PATH\_INFO';
  3. Go to the test controller and start working with it. You will have to make your own SQL queries/models.

## Features

  * Handles a directory structure or by using the $_GET array. (Ex: domain.com/users/5/ or domain.com/users/?page=5)
  * Directory structure can add a trailing slash or not, which is good for SEO (Ex: domain.com/users/5/ or domain.com/users/5)
  * Page 1 links will not show a pagination number. Search engines will look at domain.com/users/ and domain.com/users/1/ as duplicate content, so the pagination is dropped.
  * Handles regular links or AJAX update links
  * Automatically builds sorting links
  * Handles different HTML tags (li, div, etc) for pagination links and additional HTML/CSS options.
  * Handles additional search/sorting parameters and will add to the $_GET array
  * Page stats output (Ex: Displaying 1 to 25 (of 115 users))

Please visit the [GitHub][1] repo to learn more.

Feel free to leave any feedback or feature requests. Thanks for checking out my library.

[1]: https://github.com/modomg/codeigniter-pagination