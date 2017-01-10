---
title: Prioritizing Queued Jobs in Laravel
author: Chris
layout: post
permalink: /2017/01/prioritizing-queued-jobs-in-laravel/
categories:
  - Code
tags:
  - laravel
  - queue
  - redis
---
Laravel queues allow you to defer long running, or resource intensive, processes until a later time. A queue system is imperative for larger applications, but can be helpful for smaller ones as well. But with so many jobs and queues, how can we prioritize them?<!--more-->

On a current project, I had to figure out how to grab a ton of data from an API (Facebook) that had dependent data - meaning the script cannot proceed to get new data before it's done with the current data set. This typically ended up being an ID that was needed for the next call as well as some data that needed to be processed.

In pseudo code, this would look something similar to:

```
$a = $get->a();
$b = $get->b($a);
$c = $get->c($b);
$this->doSomethingWith($c);
```

As you can see, the code should not move ahead without processing the previous data. In my situation, I had to process all of the "A" jobs, then all of the "B" jobs, and so on, before continuing.

The data that I needed was quite large and each round needed a good amount of processing before continuing to the next step. Luckily this is where [Laravel](https://laravel.com) and its queue system stepped in to help!

Laravel let's you specify a dynamic queue name along with a job, like so:

```
dispatch((new JobA($data))->onQueue('a'));
```

In my application in each "JobA" a "JobB" would be called. For each "JobB" a "JobC" would be called. At the end of "JobC", we'd do some additional work on the whole data collection. So you'd get something like this:

```
// In Controller
dispatch((new JobA($data))->onQueue('a'));

// In JobA
dispatch((new JobB($data))->onQueue('b'));

// In JobB
dispatch((new JobC($data))->onQueue('c'));

// In JobC
dispatch((new JobFinish($data))->onQueue('finish'));
```

I wanted to make sure we ran all of the jobs in order, and only continued onto the next set of jobs once the current batch was finished. This was very important since the application could easily have 20, or so, JobAs, 50 JobBs, and hundreds of JobCs.

In my supervisior config file, I added something similar to this:

```
[program:artisan-queue]
command = php artisan queue:work --queue=a,b,c,finish
```

Now all of the jobs on the "a" queue would have to finish before the "b" jobs would start, and "c" would wait for "b", and so on.

So there you have it - a prioritized queuing system in only a few lines of code!

The Laravel Queue system is very robust, and if you haven't used it, I'd highly recommend trying them in your next project. You can read more about the queue system and queue priorities [here](https://laravel.com/docs/5.3/queues#queue-priorities).