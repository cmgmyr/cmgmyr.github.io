---
title: Batch renaming files in windows
author: Chris
layout: post
permalink: /2011/09/batch-renaming-files-in-windows/
shareaholic_disable_share_buttons:
  - 0
shareaholic_disable_open_graph_tags:
  - 0
dsq_thread_id:
  - 417549286
categories:
  - Random
tags:
  - CMD
  - REN
  - Rename
---
I always have clients sending me images and other assets for their web projects. Sometimes they send them over in a nice format, other times not so much. I&#8217;ve been using the REN command in windows to do a lot of the automated work.<!--more-->

First you will want to CD (Change Directory) to the one that you want to work within. In windows 7 this is pretty easy, just hold down the SHIFT key and RIGHT click on the folder you want to work in. You will then see a &#8220;Open Command Window Here&#8221; option, or you can always just go to Run > cmd, then go to the specific directory.

The REN (Rename) command is pretty simple, it&#8217;s just: 

<div class="hl-container">
  <div class="hl-main">
    <pre><span class="hl-code">REN oldname newname
REN old_image.jpg new_image.jpg</span></pre>
  </div>
</div>

You can also use * as a wildcard and ? for a space, as well as putting quotes around text.

## Change Uppercase Extension to Lowercase

This is probably the most common one that I use. All of our websites we create all reference the lower case extension, our Linux box views uppercase and lowercase as different files, so if an uppercase one gets uploaded, it won&#8217;t show. So the simple command is just: 

<div class="hl-container">
  <div class="hl-main">
    <pre><span class="hl-code">REN *.JPG *.jpg</span></pre>
  </div>
</div>

## Remove Certain Text

One client sent me some files like: 0134-009\_s1 copy.jpg, 0134-009\_s2 copy.jpg, 0134-009\_s3 copy.jpg, 0134-009\_s4 copy.jpg, 0134-009\_L1 copy.jpg, 0134-009\_L2 copy.jpg, 0134-009\_L3 copy.jpg, 0134-009\_L4 copy.jpg. I had to remove the &#8221; copy&#8221; part of the file, and there were about 800 of these images with the same naming convention. Luckily they all had either 1-4 before the space and &#8220;copy&#8221; so I was able to use that to my benefit. 4 commends later, they were all renamed: 

<div class="hl-container">
  <div class="hl-main">
    <pre><span class="hl-code">REN "*1?copy.jpg" *1.jpg
REN "*2?copy.jpg" *3.jpg
REN "*3?copy.jpg" *3.jpg
REN "*4?copy.jpg" *4.jpg</span></pre>
  </div>
</div>

This saves a bunch of time when you have a lot of files to rename. It sure beats manually renaming 800 files one by one. What other REN commands have you used?