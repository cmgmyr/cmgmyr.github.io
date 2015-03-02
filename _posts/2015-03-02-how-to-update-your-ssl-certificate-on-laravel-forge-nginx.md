---
title: How to update your SSL certificate on Laravel Forge (nginx)
author: Chris
layout: post
permalink: /2015/03/how-to-update-your-ssl-certificate-on-laravel-forge-nginx/
categories:
  - DevOps
tags:
  - certificate
  - forge
  - godaddy
  - laravel
  - ssl
---
As most of you know [Laravel Forge](https://forge.laravel.com/) doesn't have an easy way to update your SSL certificate when you need to renew it. Here's how...<!--more-->

1. Move to your SSL directory and back up your files:

		$ cd /etc/nginx/ssl/{domain}/{id}
		$ sudo mv server.csr server.csr.bak
		$ sudo mv server.crt server.crt.bak
		$ sudo mv server.key server.key.bak

2. Generate new key and CSR files:

		$ sudo openssl req -nodes -newkey rsa:2048 -keyout server.key -out server.csr

	and fill out the following information:

		Country Name (2 letter code) [AU]:
		State or Province Name (full name) [Some-State]:
		Locality Name (eg, city) []:
		Organization Name (eg, company) [Internet Widgits Pty Ltd]:
		Organizational Unit Name (eg, section) []:
		Common Name (e.g. server FQDN or YOUR name) []:
		Email Address []:

		Please enter the following 'extra' attributes
		to be sent with your certificate request
		A challenge password []:
		An optional company name []:

3. Get the new CSR, and copy to your clipboard:

		$ cat server.csr

4. Go to your SSL provider, renew your certificate and re-key with your new CSR.
5. Download your new SSL files and [combine them](/2014/10/how-to-fix-the-intermediate-certificate-error-in-laravel-forge-nginx/).
6. Copy the new combined intermediate certificate and regular certificate to your clipboard.
7. In your favorite Linux editor create a new `/etc/nginx/ssl/{domain}/{id}/server.crt` and paste the certificate information you have in your clipboard.
8. Restart nginx

		$ sudo /etc/init.d/nginx restart