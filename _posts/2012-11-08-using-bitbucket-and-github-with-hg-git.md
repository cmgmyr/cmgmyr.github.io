---
title: Using BitBucket and GitHub with hg-git
author: Chris
layout: post
permalink: /2012/11/using-bitbucket-and-github-with-hg-git/
dsq_thread_id:
  - 919281385
categories:
  - Git
  - Mercurial
tags:
  - BitBucket
  - Git
  - Mercurial
  - VCS
---
I&#8217;ve been using Mercurial and BitBucket since 2010 and my experiences have been really great with it. BitBucket has a great service and Mercurial is very easy to use. However, within my need to learn new and different things (and seeing everyone else use it), I decided to take a look at Git and GitHub. <!--more-->The reason I initially went with Mercurial over Git is because EllisLab/CodeIgniter was initially using it too (they have since moved to Git), but I also found it easier to use and understand compared to Git. Now it seems like Git and the services and resources around it have improved a lot, so I figured I would try it out.

The first thing that I wanted to accomplish is to be able to copy my public BitBucket repos over to GitHub. After doing some looking around, I came across this <a href="http://philsturgeon.co.uk/blog/2010/07/bitbucket-or-github" target="_blank">brilliant blog post</a>/video done by Phil Sturgeon. However, I was having some trouble setting everything up on my systems &#8211; so I figured I would write about it to hopefully help some of you out too.

## Purpose:

  * Take existing BitBucket repos and mirror them on GitHub
  * Use BitBucket/GitHub together without too much work moving forward
  * Use multiple development environments (PC/Mac)

##  Mac Setup:

  1. Open the terminal and run: **easy_install hg-git**
  2. Edit your ~/.hgrc file to make sure it includes:  
    [extensions]  
    hgext.bookmarks =  
    hggit =
  3. Setup SSH keys for Git and Mercurial: <a href="https://confluence.atlassian.com/pages/viewpage.action?pageId=270827678" target="_blank">https://confluence.atlassian.com/pages/viewpage.action?pageId=270827678</a> and once you have created a key, add that to GitHub and BitBucket

## PC Setup:

  1. Clone: <a href="https://bitbucket.org/durin42/hg-git" target="_blank">https://bitbucket.org/durin42/hg-git</a> to C:\
  2. Edit your mercurial.ini file (C:\Users\{USERNAME}\mercurial.ini &#8211; or you can edit through the TortoiseHG workbench) to include:  
    [extensions]  
    hgext.bookmarks =  
    hggit = C:\hg-git\hggit
  3. Setup SSH keys for Mercurial: <a href="https://confluence.atlassian.com/display/BITBUCKET/Set+up+SSH+for+Mercurial" target="_blank">https://confluence.atlassian.com/display/BITBUCKET/Set+up+SSH+for+Mercurial</a> and once you have created a key, add that to GitHub and BitBucket
  4. <span style="color: #ff0000;">Note</span>: You will need to open Pageant and import your key before you will be able to use SSH through command prompt

## Update your repo:

  1. Create a new repo on GitHub that is similar to the one on BitBucket: 
      1. Current: <a href="https://bitbucket.org/modomg/codeigniter-pagination" target="_blank">https://bitbucket.org/modomg/codeigniter-pagination</a>
      2. New: <a href="https://github.com/modomg/codeigniter-pagination" target="_blank">https://github.com/modomg/codeigniter-pagination</a>
  2. Edit your local repo&#8217;s hgrc file to look like:  
    [paths]  
    default = ssh://hg@bitbucket.org/modomg/codeigniter-pagination  
    gh = git+ssh://git@github.com/modomg/codeigniter-pagination.git
  3. Note that we are keeping the BitBucket location as &#8220;default&#8221;, this is so that you can work with this location without using a specified name. Also note that our GitHub location is named &#8220;gh&#8221; and also has a &#8220;git+&#8221; prefix to the URL string&#8230;this is very important!
  4. Open a terminal/command prompt pointing to your local repo and enter the following: **hg gexport**
  5. If you look in your .hg directory now, you will see that there has been a &#8220;git&#8221; directory and a &#8220;git-mapfile&#8221; added
  6. Now to see if everything works, enter: **hg push** &#8211; which should connect you to BitBucket and return that there were no changes found (assuming nothing changed).
  7. To push everything to GitHub, enter: **hg push gh** &#8211; which should connect and push everything to GitHub
  8. Check your GitHub repo and you will see that everything has been replicated: files, commits, tags, branches, etc

## Moving Forward:

Now that you have properly set up a replicated repo on your system you can now work with Mercurial/TortoiseHG/BitBucket as usual. When you would like to move everything up to GitHub, just open the terminal and enter the **hg push gh** command and you will be all set!

<span style="color: #ff0000;">Note</span>: You can also use this similar process if your initial repo is on GitHub and you would like to replicate it on BitBucket.

**Resources:**

  * <a href="http://philsturgeon.co.uk/blog/2010/07/bitbucket-or-github" target="_blank">http://philsturgeon.co.uk/blog/2010/07/bitbucket-or-github</a>
  * <a href="http://hg-git.github.com/" target="_blank">http://hg-git.github.com/</a>
  * <a href="http://mercurial.selenic.com/wiki/HgGit" target="_blank">http://mercurial.selenic.com/wiki/HgGit</a>