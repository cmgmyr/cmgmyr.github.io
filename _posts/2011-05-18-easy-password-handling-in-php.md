---
title: Easy Password Handling in PHP
author: Chris
layout: post
permalink: /2011/05/easy-password-handling-in-php/
dsq_thread_id:
  - 307089196
shareaholic_disable_share_buttons:
  - 0
shareaholic_disable_open_graph_tags:
  - 0
categories:
  - Code
  - PHP
tags:
  - Password
  - PHP
  - Security
---
There are many ways to handle passwords in your application, and a lot of different thoughts on it. You want to make sure your users are protected, but you also want to make sure that you are able to easily work with the data through the application. Here is how I handle passwords.<!--more-->

**Let&#8217;s start with the basic functions:**

<div class="hl-container">
  <div class="hl-main">
    <pre><span class="hl-inlinetags">&lt;?php</span><span class="hl-code">
</span><span class="hl-reserved">function</span><span class="hl-code"> </span><span class="hl-identifier">pass_rand</span><span class="hl-brackets">(</span><span class="hl-var">$min</span><span class="hl-code"> = </span><span class="hl-reserved">null</span><span class="hl-code">, </span><span class="hl-var">$max</span><span class="hl-code"> = </span><span class="hl-reserved">null</span><span class="hl-brackets">)</span><span class="hl-code">
</span><span class="hl-brackets">{</span><span class="hl-code">
    </span><span class="hl-reserved">static</span><span class="hl-code"> </span><span class="hl-var">$seeded</span><span class="hl-code">;
 
    </span><span class="hl-reserved">if</span><span class="hl-brackets">(</span><span class="hl-code">!</span><span class="hl-reserved">isset</span><span class="hl-brackets">(</span><span class="hl-var">$seeded</span><span class="hl-brackets">)</span><span class="hl-brackets">)</span><span class="hl-code">
    </span><span class="hl-brackets">{</span><span class="hl-code">
        </span><span class="hl-identifier">mt_srand</span><span class="hl-brackets">(</span><span class="hl-brackets">(</span><span class="hl-identifier">double</span><span class="hl-brackets">)</span><span class="hl-identifier">microtime</span><span class="hl-brackets">(</span><span class="hl-brackets">)</span><span class="hl-code">*</span><span class="hl-number">1000000</span><span class="hl-brackets">)</span><span class="hl-code">;
        </span><span class="hl-var">$seeded</span><span class="hl-code"> = </span><span class="hl-reserved">true</span><span class="hl-code">;
    </span><span class="hl-brackets">}</span><span class="hl-code">
 
    </span><span class="hl-reserved">if</span><span class="hl-brackets">(</span><span class="hl-reserved">isset</span><span class="hl-brackets">(</span><span class="hl-var">$min</span><span class="hl-brackets">)</span><span class="hl-code"> && </span><span class="hl-reserved">isset</span><span class="hl-brackets">(</span><span class="hl-var">$max</span><span class="hl-brackets">)</span><span class="hl-brackets">)</span><span class="hl-code">
    </span><span class="hl-brackets">{</span><span class="hl-code">
        </span><span class="hl-reserved">if</span><span class="hl-brackets">(</span><span class="hl-var">$min</span><span class="hl-code"> &gt;= </span><span class="hl-var">$max</span><span class="hl-brackets">)</span><span class="hl-code">
        </span><span class="hl-brackets">{</span><span class="hl-code">
            </span><span class="hl-reserved">return</span><span class="hl-code"> </span><span class="hl-var">$min</span><span class="hl-code">;
        </span><span class="hl-brackets">}</span><span class="hl-code">
        </span><span class="hl-reserved">else</span><span class="hl-code">
        </span><span class="hl-brackets">{</span><span class="hl-code">
            </span><span class="hl-reserved">return</span><span class="hl-code"> </span><span class="hl-identifier">mt_rand</span><span class="hl-brackets">(</span><span class="hl-var">$min</span><span class="hl-code">, </span><span class="hl-var">$max</span><span class="hl-brackets">)</span><span class="hl-code">;
        </span><span class="hl-brackets">}</span><span class="hl-code">
    </span><span class="hl-brackets">}</span><span class="hl-code">
    </span><span class="hl-reserved">else</span><span class="hl-code">
    </span><span class="hl-brackets">{</span><span class="hl-code">
        </span><span class="hl-reserved">return</span><span class="hl-code"> </span><span class="hl-identifier">mt_rand</span><span class="hl-brackets">(</span><span class="hl-brackets">)</span><span class="hl-code">;
    </span><span class="hl-brackets">}</span><span class="hl-code">
</span><span class="hl-brackets">}</span><span class="hl-code">
 
</span><span class="hl-reserved">function</span><span class="hl-code"> </span><span class="hl-identifier">validate_password</span><span class="hl-brackets">(</span><span class="hl-var">$plain</span><span class="hl-code">, </span><span class="hl-var">$encrypted</span><span class="hl-brackets">)</span><span class="hl-code">
</span><span class="hl-brackets">{</span><span class="hl-code">
    </span><span class="hl-var">$stack</span><span class="hl-code"> = </span><span class="hl-identifier">explode</span><span class="hl-brackets">(</span><span class="hl-quotes">'</span><span class="hl-string">:</span><span class="hl-quotes">'</span><span class="hl-code">, </span><span class="hl-var">$encrypted</span><span class="hl-brackets">)</span><span class="hl-code">;
 
    </span><span class="hl-reserved">if</span><span class="hl-brackets">(</span><span class="hl-identifier">sizeof</span><span class="hl-brackets">(</span><span class="hl-var">$stack</span><span class="hl-brackets">)</span><span class="hl-code"> != </span><span class="hl-number">2</span><span class="hl-brackets">)</span><span class="hl-code"> </span><span class="hl-reserved">return</span><span class="hl-code"> </span><span class="hl-reserved">false</span><span class="hl-code">;
 
    </span><span class="hl-reserved">if</span><span class="hl-brackets">(</span><span class="hl-identifier">md5</span><span class="hl-brackets">(</span><span class="hl-var">$stack</span><span class="hl-brackets">[</span><span class="hl-number">1</span><span class="hl-brackets">]</span><span class="hl-code">.</span><span class="hl-var">$plain</span><span class="hl-brackets">)</span><span class="hl-code"> == </span><span class="hl-var">$stack</span><span class="hl-brackets">[</span><span class="hl-number"></span><span class="hl-brackets">]</span><span class="hl-brackets">)</span><span class="hl-code">
    </span><span class="hl-brackets">{</span><span class="hl-code">
        </span><span class="hl-reserved">return</span><span class="hl-code"> </span><span class="hl-reserved">true</span><span class="hl-code">;
    </span><span class="hl-brackets">}</span><span class="hl-code">
 
    </span><span class="hl-reserved">return</span><span class="hl-code"> </span><span class="hl-reserved">false</span><span class="hl-code">;
</span><span class="hl-brackets">}</span><span class="hl-code">
 
</span><span class="hl-reserved">function</span><span class="hl-code"> </span><span class="hl-identifier">encrypt_password</span><span class="hl-brackets">(</span><span class="hl-var">$plain</span><span class="hl-brackets">)</span><span class="hl-code">
</span><span class="hl-brackets">{</span><span class="hl-code">
    </span><span class="hl-var">$password</span><span class="hl-code"> = </span><span class="hl-quotes">'</span><span class="hl-quotes">'</span><span class="hl-code">;
 
    </span><span class="hl-reserved">for</span><span class="hl-brackets">(</span><span class="hl-var">$i</span><span class="hl-code">=</span><span class="hl-number"></span><span class="hl-code">; </span><span class="hl-var">$i</span><span class="hl-code">&lt;</span><span class="hl-number">10</span><span class="hl-code">; </span><span class="hl-var">$i</span><span class="hl-code">++</span><span class="hl-brackets">)</span><span class="hl-code">
    </span><span class="hl-brackets">{</span><span class="hl-code">
        </span><span class="hl-var">$password</span><span class="hl-code"> .= </span><span class="hl-identifier">pass_rand</span><span class="hl-brackets">(</span><span class="hl-brackets">)</span><span class="hl-code">;
    </span><span class="hl-brackets">}</span><span class="hl-code">
 
    </span><span class="hl-var">$salt</span><span class="hl-code"> = </span><span class="hl-identifier">substr</span><span class="hl-brackets">(</span><span class="hl-identifier">md5</span><span class="hl-brackets">(</span><span class="hl-var">$password</span><span class="hl-brackets">)</span><span class="hl-code">, </span><span class="hl-number"></span><span class="hl-code">, </span><span class="hl-number">2</span><span class="hl-brackets">)</span><span class="hl-code">;
 
    </span><span class="hl-var">$password</span><span class="hl-code"> = </span><span class="hl-identifier">md5</span><span class="hl-brackets">(</span><span class="hl-var">$salt</span><span class="hl-code">.</span><span class="hl-var">$plain</span><span class="hl-brackets">)</span><span class="hl-code">.</span><span class="hl-quotes">'</span><span class="hl-string">:</span><span class="hl-quotes">'</span><span class="hl-code">.</span><span class="hl-var">$salt</span><span class="hl-code">;
 
    </span><span class="hl-reserved">return</span><span class="hl-code"> </span><span class="hl-var">$password</span><span class="hl-code">;
</span><span class="hl-brackets">}</span></pre>
  </div>
</div>

After your user registers you will need to encrypt and save their password to your database. You can easily do this by sending their password to the encrypt_password() function:

<div class="hl-container">
  <div class="hl-main">
    <pre><span class="hl-inlinetags">&lt;?php</span><span class="hl-code">
 
</span><span class="hl-var">$new_password</span><span class="hl-code"> = </span><span class="hl-identifier">encrypt_password</span><span class="hl-brackets">(</span><span class="hl-var">$_POST</span><span class="hl-brackets">[</span><span class="hl-quotes">'</span><span class="hl-string">password</span><span class="hl-quotes">'</span><span class="hl-brackets">]</span><span class="hl-brackets">)</span><span class="hl-code">;
 
</span><span class="hl-comment">//</span><span class="hl-comment">"password123" becomes something like "3be870c699b09266b3b86c98aeb31022:43"</span><span class="hl-comment"></span></pre>
  </div>
</div>

When your user tries to log into your application you will need to do some initial validation to get their record from the database, but the result will look something similar to:

<div class="hl-container">
  <div class="hl-main">
    <pre><span class="hl-inlinetags">&lt;?php</span><span class="hl-code">
 
</span><span class="hl-var">$sql</span><span class="hl-code"> = </span><span class="hl-quotes">"</span><span class="hl-string">SELECT `id`, `password` FROM `users` WHERE `email` = </span><span class="hl-quotes">"</span><span class="hl-code">.</span><span class="hl-identifier">mysql_escape_string</span><span class="hl-brackets">(</span><span class="hl-var">$_POST</span><span class="hl-brackets">[</span><span class="hl-quotes">'</span><span class="hl-string">email</span><span class="hl-quotes">'</span><span class="hl-brackets">]</span><span class="hl-brackets">)</span><span class="hl-code">;
</span><span class="hl-var">$result</span><span class="hl-code"> = </span><span class="hl-identifier">mysql_query</span><span class="hl-brackets">(</span><span class="hl-var">$sql</span><span class="hl-brackets">)</span><span class="hl-code">;
</span><span class="hl-var">$row</span><span class="hl-code"> = </span><span class="hl-identifier">mysql_fetch_row</span><span class="hl-brackets">(</span><span class="hl-var">$result</span><span class="hl-brackets">)</span><span class="hl-code">;
</span><span class="hl-reserved">if</span><span class="hl-brackets">(</span><span class="hl-identifier">validate_password</span><span class="hl-brackets">(</span><span class="hl-var">$_POST</span><span class="hl-brackets">[</span><span class="hl-quotes">'</span><span class="hl-string">password</span><span class="hl-quotes">'</span><span class="hl-brackets">]</span><span class="hl-code">, </span><span class="hl-var">$row</span><span class="hl-brackets">[</span><span class="hl-quotes">'</span><span class="hl-string">password</span><span class="hl-quotes">'</span><span class="hl-brackets">]</span><span class="hl-brackets">)</span><span class="hl-brackets">)</span><span class="hl-code">
</span><span class="hl-brackets">{</span><span class="hl-code">
    </span><span class="hl-comment">//</span><span class="hl-comment">continue with login process</span><span class="hl-comment"></span><span class="hl-code">
</span><span class="hl-brackets">}</span><span class="hl-code">
</span><span class="hl-reserved">else</span><span class="hl-code">
</span><span class="hl-brackets">{</span><span class="hl-code">
    </span><span class="hl-reserved">die</span><span class="hl-brackets">(</span><span class="hl-quotes">'</span><span class="hl-string">Login Failed</span><span class="hl-quotes">'</span><span class="hl-brackets">)</span><span class="hl-code">;
</span><span class="hl-brackets">}</span></pre>
  </div>
</div>

And that&#8217;s pretty much it. Easy right?

Note: You will want to do a lot more security checking than this especially with the database interaction. This is only for demonstration ;) I recommend you use a solid framework like [CodeIgniter][1] which has a lot already built into it.

 [1]: http://codeigniter.com