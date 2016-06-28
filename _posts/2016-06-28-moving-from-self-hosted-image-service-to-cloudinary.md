---
title: Moving from self-hosted image service to Cloudinary
author: Chris
layout: post
permalink: /2016/06/moving-from-self-hosted-image-service-to-cloudinary/
categories:
  - Code
tags:
  - cloudinary
  - code
---
Image manipulation is hard. Handling images in the long term is even harder. Here at [Dose](http://about.dose.com) we have a lot of images and a number of ways to serve them. <!--more-->Our sites are responsive, so each image has the potential of getting manipulated multiple times depending on the device, orientation, and how we optimize an image for a certain platform.

# Handling this yourself
We used to have an internal image service that took an author’s uploaded image and handled some pre-processing. On upload, we’d make sure it’s within a max width and encoded correctly. Animated **GIF**? We’d have to convert the file to **MP4** and **WEBM** also. This would end up adding extra load on our servers and more space taken in our S3 account.

When an asset was requested with a certain height/width combination we’d check to see if we had it in our S3 bucket. If not we’d return the master asset and kick off a queue job to create it then add it to the bucket for the next request. As you can imagine, the usage was huge. Want to change the article promo image from 500px width to 475px width? That would invalidate all previous images and we’d need to recreate all new images the next time they were requested. What a mess!

[Read the rest on Medium](https://medium.com/@cmgmyr/moving-from-self-hosted-image-service-to-cloudinary-bd7370317a0d)