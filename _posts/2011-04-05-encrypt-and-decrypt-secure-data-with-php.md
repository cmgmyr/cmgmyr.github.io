---
title: Encrypt/Decrypt Secure Data with PHP
author: Chris
layout: post
permalink: /2011/04/encrypt-and-decrypt-secure-data-with-php/
dsq_thread_id:
  - 271559433
shareaholic_disable_share_buttons:
  - 0
shareaholic_disable_open_graph_tags:
  - 0
categories:
  - Code
  - PHP
tags:
  - mcrypt
  - PHP
  - Security
---
Mcrypt is a very powerful library in PHP that can give you a number of ways to encrypt then decrypt data in a secure way. If you need to keep sensitive data in your database like credit cards, social security numbers, bank account numbers, etc &#8211; this library is a must for you.<!--more-->

**Let&#8217;s start with the basic functions:**

<div class="hl-container">
  <div class="hl-main">
    <pre><span class="hl-inlinetags">&lt;?php</span><span class="hl-code">
</span><span class="hl-reserved">function</span><span class="hl-code"> </span><span class="hl-identifier">encrypt_text</span><span class="hl-brackets">(</span><span class="hl-var">$value</span><span class="hl-brackets">)</span><span class="hl-code">
</span><span class="hl-brackets">{</span><span class="hl-code">
   </span><span class="hl-reserved">if</span><span class="hl-brackets">(</span><span class="hl-code">!</span><span class="hl-var">$value</span><span class="hl-brackets">)</span><span class="hl-code"> </span><span class="hl-reserved">return</span><span class="hl-code"> </span><span class="hl-reserved">false</span><span class="hl-code">;
 
   </span><span class="hl-var">$crypttext</span><span class="hl-code"> = </span><span class="hl-identifier">mcrypt_encrypt</span><span class="hl-brackets">(</span><span class="hl-identifier">MCRYPT_RIJNDAEL_256</span><span class="hl-code">, </span><span class="hl-quotes">'</span><span class="hl-string">SECURE_STRING_1</span><span class="hl-quotes">'</span><span class="hl-code">, </span><span class="hl-var">$value</span><span class="hl-code">, </span><span class="hl-identifier">MCRYPT_MODE_ECB</span><span class="hl-code">, </span><span class="hl-quotes">'</span><span class="hl-string">SECURE_STRING_2</span><span class="hl-quotes">'</span><span class="hl-brackets">)</span><span class="hl-code">;
   </span><span class="hl-reserved">return</span><span class="hl-code"> </span><span class="hl-identifier">trim</span><span class="hl-brackets">(</span><span class="hl-identifier">base64_encode</span><span class="hl-brackets">(</span><span class="hl-var">$crypttext</span><span class="hl-brackets">)</span><span class="hl-brackets">)</span><span class="hl-code">;
</span><span class="hl-brackets">}</span><span class="hl-code">
 
</span><span class="hl-reserved">function</span><span class="hl-code"> </span><span class="hl-identifier">decrypt_text</span><span class="hl-brackets">(</span><span class="hl-var">$value</span><span class="hl-brackets">)</span><span class="hl-code">
</span><span class="hl-brackets">{</span><span class="hl-code">
   </span><span class="hl-reserved">if</span><span class="hl-brackets">(</span><span class="hl-code">!</span><span class="hl-var">$value</span><span class="hl-brackets">)</span><span class="hl-code"> </span><span class="hl-reserved">return</span><span class="hl-code"> </span><span class="hl-reserved">false</span><span class="hl-code">;
 
   </span><span class="hl-var">$crypttext</span><span class="hl-code"> = </span><span class="hl-identifier">base64_decode</span><span class="hl-brackets">(</span><span class="hl-var">$value</span><span class="hl-brackets">)</span><span class="hl-code">;
   </span><span class="hl-var">$decrypttext</span><span class="hl-code"> = </span><span class="hl-identifier">mcrypt_decrypt</span><span class="hl-brackets">(</span><span class="hl-identifier">MCRYPT_RIJNDAEL_256</span><span class="hl-code">, </span><span class="hl-quotes">'</span><span class="hl-string">SECURE_STRING_1</span><span class="hl-quotes">'</span><span class="hl-code">, </span><span class="hl-var">$crypttext</span><span class="hl-code">, </span><span class="hl-identifier">MCRYPT_MODE_ECB</span><span class="hl-code">, </span><span class="hl-quotes">'</span><span class="hl-string">SECURE_STRING_2</span><span class="hl-quotes">'</span><span class="hl-brackets">)</span><span class="hl-code">;
   </span><span class="hl-reserved">return</span><span class="hl-code"> </span><span class="hl-identifier">trim</span><span class="hl-brackets">(</span><span class="hl-var">$decrypttext</span><span class="hl-brackets">)</span><span class="hl-code">;
</span><span class="hl-brackets">}</span></pre>
  </div>
</div>

In addition to using the [mcrypt][1] library we are also going to use the base64 encode/decode functions for an extra level of protection. You will want to choose 2 random string values before you run these and update **SECURE\_STRING\_1** and **SECURE\_STRING\_2**. You want to make sure these are the same every time you call these functions or else these will not encrypt/decrypt correctly. Once you have updated these values, you can test using something like this:

<div class="hl-container">
  <div class="hl-main">
    <pre><span class="hl-inlinetags">&lt;?php</span><span class="hl-code">
</span><span class="hl-var">$my_credit_card</span><span class="hl-code"> = </span><span class="hl-quotes">'</span><span class="hl-string">5105105105105100</span><span class="hl-quotes">'</span><span class="hl-code">;
</span><span class="hl-var">$secure_credit_card</span><span class="hl-code"> = </span><span class="hl-identifier">encrypt_text</span><span class="hl-brackets">(</span><span class="hl-var">$my_credit_card</span><span class="hl-brackets">)</span><span class="hl-code">;
</span><span class="hl-reserved">echo</span><span class="hl-code"> </span><span class="hl-var">$secure_credit_card</span><span class="hl-code">; </span><span class="hl-comment">//</span><span class="hl-comment">JIkkfj6yzQqMTZoUufuyI8FL1isqH/QXblQk90IIuqA=</span><span class="hl-comment"></span><span class="hl-code">
 
</span><span class="hl-var">$unsecure_credit_card</span><span class="hl-code"> = </span><span class="hl-identifier">decrypt_text</span><span class="hl-brackets">(</span><span class="hl-var">$secure_credit_card</span><span class="hl-brackets">)</span><span class="hl-code">;
</span><span class="hl-reserved">echo</span><span class="hl-code"> </span><span class="hl-var">$unsecure_credit_card</span><span class="hl-code">; </span><span class="hl-comment">//</span><span class="hl-comment">5105105105105100 (original card number)</span><span class="hl-comment"></span></pre>
  </div>
</div>

All you have to do is save $secure\_credit\_card to your database and you are all set.

## Taking this to the next level

If you are interested in kicking the security up a notch you can always come up with some random strings on the fly and also save these to your database. You want to be careful to save the correct keys per user so that you can decrypt the information correctly at a later time. Let&#8217;s say for example that when your user registers they enter a first name, last name, email address, and password. You can take this information and create the user&#8217;s encryption keys by doing something like this:

<div class="hl-container">
  <div class="hl-main">
    <pre><span class="hl-inlinetags">&lt;?php</span><span class="hl-code">
</span><span class="hl-var">$first_name</span><span class="hl-code"> = </span><span class="hl-quotes">'</span><span class="hl-string">Chris</span><span class="hl-quotes">'</span><span class="hl-code">;
</span><span class="hl-var">$last_name</span><span class="hl-code"> = </span><span class="hl-quotes">'</span><span class="hl-string">Gmyr</span><span class="hl-quotes">'</span><span class="hl-code">;
</span><span class="hl-var">$email</span><span class="hl-code"> = </span><span class="hl-quotes">'</span><span class="hl-string">email@domain.com</span><span class="hl-quotes">'</span><span class="hl-code">;
</span><span class="hl-var">$password</span><span class="hl-code"> = </span><span class="hl-quotes">'</span><span class="hl-string">mypassword123</span><span class="hl-quotes">'</span><span class="hl-code">;
 
</span><span class="hl-var">$secure_string_1</span><span class="hl-code"> = </span><span class="hl-identifier">md5</span><span class="hl-brackets">(</span><span class="hl-var">$first_name</span><span class="hl-code">.</span><span class="hl-quotes">'</span><span class="hl-string">|</span><span class="hl-quotes">'</span><span class="hl-code">.</span><span class="hl-var">$email</span><span class="hl-brackets">)</span><span class="hl-code">;
</span><span class="hl-reserved">echo</span><span class="hl-code"> </span><span class="hl-var">$secure_string_1</span><span class="hl-code">; </span><span class="hl-comment">//</span><span class="hl-comment">9c46de8e3b1f557c20c964be2b54d4d9</span><span class="hl-comment"></span><span class="hl-code">
 
</span><span class="hl-var">$secure_string_2</span><span class="hl-code"> = </span><span class="hl-identifier">md5</span><span class="hl-brackets">(</span><span class="hl-var">$last_name</span><span class="hl-code">.</span><span class="hl-quotes">'</span><span class="hl-string">|</span><span class="hl-quotes">'</span><span class="hl-code">.</span><span class="hl-var">$password</span><span class="hl-brackets">)</span><span class="hl-code">;
</span><span class="hl-reserved">echo</span><span class="hl-code"> </span><span class="hl-var">$secure_string_2</span><span class="hl-code">; </span><span class="hl-comment">//</span><span class="hl-comment">131d88ad82d9c94c65ba3945c38b06e1</span><span class="hl-comment"></span></pre>
  </div>
</div>

Even though the user could change their information in the future, you do not want to change the encryption keys in your database. After some slight modifications to pass the 2 keys to the functions, you have something like:

<div class="hl-container">
  <div class="hl-main">
    <pre><span class="hl-inlinetags">&lt;?php</span><span class="hl-code">
</span><span class="hl-reserved">function</span><span class="hl-code"> </span><span class="hl-identifier">encrypt_text</span><span class="hl-brackets">(</span><span class="hl-var">$value</span><span class="hl-code">, </span><span class="hl-var">$key1</span><span class="hl-code">, </span><span class="hl-var">$key2</span><span class="hl-brackets">)</span><span class="hl-code">
</span><span class="hl-brackets">{</span><span class="hl-code">
   </span><span class="hl-reserved">if</span><span class="hl-brackets">(</span><span class="hl-code">!</span><span class="hl-var">$value</span><span class="hl-code"> || !</span><span class="hl-var">$key1</span><span class="hl-code"> || !</span><span class="hl-var">$key2</span><span class="hl-brackets">)</span><span class="hl-code"> </span><span class="hl-reserved">return</span><span class="hl-code"> </span><span class="hl-reserved">false</span><span class="hl-code">;
 
   </span><span class="hl-var">$crypttext</span><span class="hl-code"> = </span><span class="hl-identifier">mcrypt_encrypt</span><span class="hl-brackets">(</span><span class="hl-identifier">MCRYPT_RIJNDAEL_256</span><span class="hl-code">, </span><span class="hl-var">$key1</span><span class="hl-code">, </span><span class="hl-var">$value</span><span class="hl-code">, </span><span class="hl-identifier">MCRYPT_MODE_ECB</span><span class="hl-code">, </span><span class="hl-var">$key2</span><span class="hl-brackets">)</span><span class="hl-code">;
   </span><span class="hl-reserved">return</span><span class="hl-code"> </span><span class="hl-identifier">trim</span><span class="hl-brackets">(</span><span class="hl-identifier">base64_encode</span><span class="hl-brackets">(</span><span class="hl-var">$crypttext</span><span class="hl-brackets">)</span><span class="hl-brackets">)</span><span class="hl-code">;
</span><span class="hl-brackets">}</span><span class="hl-code">
 
</span><span class="hl-reserved">function</span><span class="hl-code"> </span><span class="hl-identifier">decrypt_text</span><span class="hl-brackets">(</span><span class="hl-var">$value</span><span class="hl-code">, </span><span class="hl-var">$key1</span><span class="hl-code">, </span><span class="hl-var">$key2</span><span class="hl-brackets">)</span><span class="hl-code">
</span><span class="hl-brackets">{</span><span class="hl-code">
   </span><span class="hl-reserved">if</span><span class="hl-brackets">(</span><span class="hl-code">!</span><span class="hl-var">$value</span><span class="hl-code"> || !</span><span class="hl-var">$key1</span><span class="hl-code"> || !</span><span class="hl-var">$key2</span><span class="hl-brackets">)</span><span class="hl-code"> </span><span class="hl-reserved">return</span><span class="hl-code"> </span><span class="hl-reserved">false</span><span class="hl-code">;
 
   </span><span class="hl-var">$crypttext</span><span class="hl-code"> = </span><span class="hl-identifier">base64_decode</span><span class="hl-brackets">(</span><span class="hl-var">$value</span><span class="hl-brackets">)</span><span class="hl-code">;
   </span><span class="hl-var">$decrypttext</span><span class="hl-code"> = </span><span class="hl-identifier">mcrypt_decrypt</span><span class="hl-brackets">(</span><span class="hl-identifier">MCRYPT_RIJNDAEL_256</span><span class="hl-code">, </span><span class="hl-var">$key1</span><span class="hl-code">, </span><span class="hl-var">$crypttext</span><span class="hl-code">, </span><span class="hl-identifier">MCRYPT_MODE_ECB</span><span class="hl-code">, </span><span class="hl-var">$key2</span><span class="hl-brackets">)</span><span class="hl-code">;
   </span><span class="hl-reserved">return</span><span class="hl-code"> </span><span class="hl-identifier">trim</span><span class="hl-brackets">(</span><span class="hl-var">$decrypttext</span><span class="hl-brackets">)</span><span class="hl-code">;
</span><span class="hl-brackets">}</span><span class="hl-code">
 
</span><span class="hl-var">$my_credit_card</span><span class="hl-code"> = </span><span class="hl-quotes">'</span><span class="hl-string">5105105105105100</span><span class="hl-quotes">'</span><span class="hl-code">;
</span><span class="hl-var">$secure_credit_card</span><span class="hl-code"> = </span><span class="hl-identifier">encrypt_text</span><span class="hl-brackets">(</span><span class="hl-var">$my_credit_card</span><span class="hl-code">, </span><span class="hl-var">$secure_string_1</span><span class="hl-code">, </span><span class="hl-var">$secure_string_2</span><span class="hl-brackets">)</span><span class="hl-code">;
</span><span class="hl-var">$unsecure_credit_card</span><span class="hl-code"> = </span><span class="hl-identifier">decrypt_text</span><span class="hl-brackets">(</span><span class="hl-var">$secure_credit_card</span><span class="hl-code">, </span><span class="hl-var">$secure_string_1</span><span class="hl-code">, </span><span class="hl-var">$secure_string_2</span><span class="hl-brackets">)</span><span class="hl-code">;</span></pre>
  </div>
</div>

## Your Turn

How do you secure data in your applications? Do you have any other tips that you would like to share?

 [1]: http://us.php.net/mcrypt