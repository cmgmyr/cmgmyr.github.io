---
title: Sync htdocs and MySQL data with Dropbox
author: Chris
layout: post
permalink: /2012/11/sync-htdocs-and-mysql-data-with-dropbox/
dsq_thread_id:
  - 933350118
categories:
  - Mobility
tags:
  - Dropbox
  - Mac
  - MAMP
  - Mobility
  - PC
  - XAMPP
---
I&#8217;ve recently made the decision to move away from a PC to a Mac for day to day use and for work/development. This process has been slow so far, but one of the first things that I tackled was being able to sync my web files to all of my computers and also be able to access them locally without having an internet connection, if needed. <!--more-->I use 

<a href="http://www.apachefriends.org/en/xampp-windows.html" target="_blank">XAMPP</a> on Windows and <a href="http://www.mamp.info/en/index.html" target="_blank">MAMP</a> on Mac.

This article assumes that you are starting on a windows machine and mirroring it to a Mac (or other machine). You can easily reverse these steps if you would like to go the other way too.

## Windows:

  1. In Xampp Stop MySQL server
  2. Rename C:\xampp\mysql\data to C:\xampp\mysql\data_old
  3. Copy C:\xampp\mysql\data\_old to C:\Users\Chris\Dropbox\Development\db (rename &#8216;data\_old&#8217; to &#8216;db&#8217;)
  4. Run command prompt in Administrator mode
  5. Edit/run the following command: **mklink /J C:\xampp\mysql\data C:\Users\{USER}\Dropbox\Development\db**
  6. Start MySQL &#8211; You shouldn&#8217;t get any errors and should be able to get to phpMyAdmin (You can delete C:\xampp\mysql\data_old now)
  7. In Xampp > Disable the MySQL service &#8211; you do not want this running on start up since you will get errors with Dropbox (using active files)
  8. In Xampp stop the Apache server
  9. Rename C:\xampp\htdocs to C:\xampp\htdocs_old
 10. Edit/run the following command: **mklink /J C:\xampp\htdocs C:\Users\{USER}\Dropbox\Development\htdocs**
 11. In Xampp start the apache server &#8211; you should be able to access all of your files now through localhost
 12. Delete C:\xampp\htdocs_old

## Mac:

  1. Stop MAMP Servers (if running)
  2. Rename /Applications/MAMP/db/mysql to /Applications/MAMP/db/mysql_old
  3. In the Terminal run: **ln -s ~/Dropbox/Development/db /Applications/MAMP/db/mysql**
  4. In the Terminal run: **/Applications/MAMP/Library/bin/mysqladmin -u root -p password** {Your Windows MySQL password here}
  5. Enter the windows MySQL password again
  6. Update the following with the new password: 
      1. /Applications/MAMP/bin/mamp/index.php
      2. /Applications/MAMP/bin/mamp/{Language}/index.php
      3. /Applications/MAMP/bin/phpMyAdmin/config.inc.php
  7. Start MAMP servers and check to make sure you can connect
  8. Delete /Applications/MAMP/db/mysql_old
  9. Stop MAMP Servers
 10. Delete /Applications/MAMP/htdocs (if you have any files that you would like to keep, move to your ~/Dropbox/Development/htdocs folder first!)
 11. In the Terminal run: **ln -s ~/Dropbox/Development/htdocs /Applications/MAMP/htdocs**
 12. Start MAMP servers &#8211; everything should be working through localhost now

## In Dropbox

You should now have **Development/db** and **Development/htdocs** in your Dropbox folder.

## Important Notes:

Do not start MySQL on either platform without pausing the sync on Dropbox. Dropbox will not be able to sync the active files that MySQL is using. To re-enable sync, stop the MySQL service first, then resume Dropbox sync.