---
title: Dynamically load modules, models, and configurations in Yii
author: Chris
layout: post
permalink: /2011/09/dynamically-load-modules-models-and-configurations-in-yii/
shareaholic_disable_share_buttons:
  - 0
shareaholic_disable_open_graph_tags:
  - 0
dsq_thread_id:
  - 412388868
categories:
  - Code
  - Yii
tags:
  - Admin
  - Module
  - Yii
---
As I stated in a <a href="/2011/09/checking-out-the-yii-framework/" target="_blank">previous post</a> I have started to play around with the <a href="http://www.yiiframework.com/" target="_blank">Yii Framework</a>, and I really love it so far. I&#8217;m moving over from CodeIgniter, and even though the 2 frameworks are very different, I haven&#8217;t had too much trouble getting up and going with it. I have built a pretty large CMS on top of CI and I&#8217;m now working on porting that over to Yii. I&#8217;m trying to mimic as much as I had before without affecting the workflow that I had previously. So far so good.<!--more-->

What I had in CodeIgniter:

  * <a href="http://codeigniter.com" target="_blank">CodeIgniter 2.0.3</a>
  * <a href="https://bitbucket.org/wiredesignz/codeigniter-modular-extensions-hmvc/wiki/Home" target="_blank">HMVC</a>
  * One main controller called &#8220;admin&#8221; to handle a few functions/pages
  * Everything else in application/modules

In routes.php I had:

<div class="hl-container">
  <div class="hl-main">
    <pre><span class="hl-inlinetags">&lt;?php</span><span class="hl-code">
</span><span class="hl-var">$route</span><span class="hl-brackets">[</span><span class="hl-quotes">'</span><span class="hl-string">admin/logout</span><span class="hl-quotes">'</span><span class="hl-brackets">]</span><span class="hl-code"> = </span><span class="hl-quotes">'</span><span class="hl-string">admin/logout</span><span class="hl-quotes">'</span><span class="hl-code">;
</span><span class="hl-var">$route</span><span class="hl-brackets">[</span><span class="hl-quotes">'</span><span class="hl-string">admin/forgot</span><span class="hl-quotes">'</span><span class="hl-brackets">]</span><span class="hl-code"> = </span><span class="hl-quotes">'</span><span class="hl-string">admin/forgot</span><span class="hl-quotes">'</span><span class="hl-code">;
</span><span class="hl-var">$route</span><span class="hl-brackets">[</span><span class="hl-quotes">'</span><span class="hl-string">admin/dashboard</span><span class="hl-quotes">'</span><span class="hl-brackets">]</span><span class="hl-code"> = </span><span class="hl-quotes">'</span><span class="hl-string">admin/dashboard</span><span class="hl-quotes">'</span><span class="hl-code">;
</span><span class="hl-var">$route</span><span class="hl-brackets">[</span><span class="hl-quotes">'</span><span class="hl-string">admin/([a-zA-Z_-]+)/(:any)</span><span class="hl-quotes">'</span><span class="hl-brackets">]</span><span class="hl-code"> = </span><span class="hl-quotes">'</span><span class="hl-string">$1/admin/$2</span><span class="hl-quotes">'</span><span class="hl-code">;
</span><span class="hl-var">$route</span><span class="hl-brackets">[</span><span class="hl-quotes">'</span><span class="hl-string">admin/([a-zA-Z_-]+)</span><span class="hl-quotes">'</span><span class="hl-brackets">]</span><span class="hl-code"> = </span><span class="hl-quotes">'</span><span class="hl-string">$1/admin/index</span><span class="hl-quotes">'</span><span class="hl-code">;
</span><span class="hl-var">$route</span><span class="hl-brackets">[</span><span class="hl-quotes">'</span><span class="hl-string">admin</span><span class="hl-quotes">'</span><span class="hl-brackets">]</span><span class="hl-code"> = </span><span class="hl-quotes">'</span><span class="hl-string">admin</span><span class="hl-quotes">'</span><span class="hl-code">;</span></pre>
  </div>
</div>

So if you go to domain.com/admin/users you would be in application/modules/users/controller/admin.php and anything like domain.com/admin/users/edit/1/ would work and find it&#8217;s place. On the front end there would be something like domain.com/users/view/1 which would go to application/modules/users/controller/users.php

Now moving over to Yii&#8230;  
1. Create &#8220;admin&#8221; controller in Gii with dashboard, logout, and forgot actions  
2. Create &#8220;user&#8221; module in Gii  
3. Create the following urlManager rules in /protected/config/main.php:

<div class="hl-container">
  <div class="hl-main">
    <pre><span class="hl-inlinetags">&lt;?php</span><span class="hl-code">
</span><span class="hl-var">$config</span><span class="hl-code"> = </span><span class="hl-reserved">array</span><span class="hl-brackets">(</span><span class="hl-code">
    </span><span class="hl-quotes">'</span><span class="hl-string">components</span><span class="hl-quotes">'</span><span class="hl-code"> =&gt; </span><span class="hl-reserved">array</span><span class="hl-brackets">(</span><span class="hl-code">
        </span><span class="hl-quotes">'</span><span class="hl-string">urlManager</span><span class="hl-quotes">'</span><span class="hl-code"> =&gt; </span><span class="hl-reserved">array</span><span class="hl-brackets">(</span><span class="hl-code">
            </span><span class="hl-quotes">'</span><span class="hl-string">urlFormat</span><span class="hl-quotes">'</span><span class="hl-code"> =&gt; </span><span class="hl-quotes">'</span><span class="hl-string">path</span><span class="hl-quotes">'</span><span class="hl-code">,
            </span><span class="hl-quotes">'</span><span class="hl-string">showScriptName</span><span class="hl-quotes">'</span><span class="hl-code"> =&gt; </span><span class="hl-reserved">false</span><span class="hl-code">,
            </span><span class="hl-quotes">'</span><span class="hl-string">rules</span><span class="hl-quotes">'</span><span class="hl-code"> =&gt; </span><span class="hl-reserved">array</span><span class="hl-brackets">(</span><span class="hl-code">
                </span><span class="hl-comment">//</span><span class="hl-comment">admin rules</span><span class="hl-comment"></span><span class="hl-code">
                </span><span class="hl-quotes">'</span><span class="hl-string">admin/&lt;action:(dashboard|forgot|logout)&gt;</span><span class="hl-quotes">'</span><span class="hl-code"> =&gt; </span><span class="hl-quotes">'</span><span class="hl-string">admin/&lt;action&gt;</span><span class="hl-quotes">'</span><span class="hl-code">,
                </span><span class="hl-quotes">'</span><span class="hl-string">admin/&lt;module:\w+&gt;/&lt;action:\w+&gt;/&lt;id:\d+&gt;</span><span class="hl-quotes">'</span><span class="hl-code"> =&gt; </span><span class="hl-quotes">'</span><span class="hl-string">&lt;module&gt;/admin/&lt;action&gt;</span><span class="hl-quotes">'</span><span class="hl-code">,
                </span><span class="hl-quotes">'</span><span class="hl-string">admin/&lt;module:\w+&gt;/&lt;action:\w+&gt;</span><span class="hl-quotes">'</span><span class="hl-code"> =&gt; </span><span class="hl-quotes">'</span><span class="hl-string">&lt;module&gt;/admin/&lt;action&gt;</span><span class="hl-quotes">'</span><span class="hl-code">,
                </span><span class="hl-quotes">'</span><span class="hl-string">admin/&lt;module:\w+&gt;</span><span class="hl-quotes">'</span><span class="hl-code"> =&gt; </span><span class="hl-quotes">'</span><span class="hl-string">&lt;module&gt;/admin</span><span class="hl-quotes">'</span><span class="hl-code">,
            </span><span class="hl-brackets">)</span><span class="hl-code">,
        </span><span class="hl-brackets">)</span><span class="hl-code">,
</span><span class="hl-brackets">)</span><span class="hl-code">;</span></pre>
  </div>
</div>

4. Instead of just returning the config array, assign it to $config, and at the bottom of main.php enter: 

<div class="hl-container">
  <div class="hl-main">
    <pre><span class="hl-code">return $config;</span></pre>
  </div>
</div>

Your basic webapp should work as it did before at this point.

5. In /protected/modules/user/controllers/DefaultController.php have something like:

<div class="hl-container">
  <div class="hl-main">
    <pre><span class="hl-inlinetags">&lt;?php</span><span class="hl-code">
</span><span class="hl-reserved">class</span><span class="hl-code"> </span><span class="hl-identifier">DefaultController</span><span class="hl-code"> </span><span class="hl-reserved">extends</span><span class="hl-code"> </span><span class="hl-identifier">Controller</span><span class="hl-code"> </span><span class="hl-brackets">{</span><span class="hl-code">
 
    </span><span class="hl-reserved">public</span><span class="hl-code"> </span><span class="hl-reserved">function</span><span class="hl-code"> </span><span class="hl-identifier">actionIndex</span><span class="hl-brackets">(</span><span class="hl-brackets">)</span><span class="hl-code"> </span><span class="hl-brackets">{</span><span class="hl-code">
        </span><span class="hl-var">$this</span><span class="hl-code">-&gt;</span><span class="hl-identifier">render</span><span class="hl-brackets">(</span><span class="hl-quotes">'</span><span class="hl-string">index</span><span class="hl-quotes">'</span><span class="hl-brackets">)</span><span class="hl-code">;
    </span><span class="hl-brackets">}</span><span class="hl-code">
    
    </span><span class="hl-reserved">public</span><span class="hl-code"> </span><span class="hl-reserved">function</span><span class="hl-code"> </span><span class="hl-identifier">actionCreate</span><span class="hl-brackets">(</span><span class="hl-brackets">)</span><span class="hl-code"> </span><span class="hl-brackets">{</span><span class="hl-code">
        </span><span class="hl-reserved">die</span><span class="hl-brackets">(</span><span class="hl-quotes">'</span><span class="hl-string">this is default create</span><span class="hl-quotes">'</span><span class="hl-brackets">)</span><span class="hl-code">;
    </span><span class="hl-brackets">}</span><span class="hl-code">
    
    </span><span class="hl-reserved">public</span><span class="hl-code"> </span><span class="hl-reserved">function</span><span class="hl-code"> </span><span class="hl-identifier">actionEdit</span><span class="hl-brackets">(</span><span class="hl-var">$id</span><span class="hl-brackets">)</span><span class="hl-code"> </span><span class="hl-brackets">{</span><span class="hl-code">
        </span><span class="hl-reserved">die</span><span class="hl-brackets">(</span><span class="hl-quotes">'</span><span class="hl-string">this is default edit = </span><span class="hl-quotes">'</span><span class="hl-code">.</span><span class="hl-var">$id</span><span class="hl-brackets">)</span><span class="hl-code">;
    </span><span class="hl-brackets">}</span><span class="hl-code">
 
</span><span class="hl-brackets">}</span></pre>
  </div>
</div>

6. Copy that file and rename it &#8220;AdminController.php&#8221;, then just change the &#8220;default&#8221; text to &#8220;admin&#8221;:

<div class="hl-container">
  <div class="hl-main">
    <pre><span class="hl-inlinetags">&lt;?php</span><span class="hl-code">
</span><span class="hl-reserved">class</span><span class="hl-code"> </span><span class="hl-identifier">AdminController</span><span class="hl-code"> </span><span class="hl-reserved">extends</span><span class="hl-code"> </span><span class="hl-identifier">Controller</span><span class="hl-code"> </span><span class="hl-brackets">{</span><span class="hl-code">
 
    </span><span class="hl-reserved">public</span><span class="hl-code"> </span><span class="hl-reserved">function</span><span class="hl-code"> </span><span class="hl-identifier">actionIndex</span><span class="hl-brackets">(</span><span class="hl-brackets">)</span><span class="hl-code"> </span><span class="hl-brackets">{</span><span class="hl-code">
        </span><span class="hl-var">$this</span><span class="hl-code">-&gt;</span><span class="hl-identifier">render</span><span class="hl-brackets">(</span><span class="hl-quotes">'</span><span class="hl-string">index</span><span class="hl-quotes">'</span><span class="hl-brackets">)</span><span class="hl-code">;
    </span><span class="hl-brackets">}</span><span class="hl-code">
    
    </span><span class="hl-reserved">public</span><span class="hl-code"> </span><span class="hl-reserved">function</span><span class="hl-code"> </span><span class="hl-identifier">actionCreate</span><span class="hl-brackets">(</span><span class="hl-brackets">)</span><span class="hl-code"> </span><span class="hl-brackets">{</span><span class="hl-code">
        </span><span class="hl-reserved">die</span><span class="hl-brackets">(</span><span class="hl-quotes">'</span><span class="hl-string">this is admin create</span><span class="hl-quotes">'</span><span class="hl-brackets">)</span><span class="hl-code">;
    </span><span class="hl-brackets">}</span><span class="hl-code">
    
    </span><span class="hl-reserved">public</span><span class="hl-code"> </span><span class="hl-reserved">function</span><span class="hl-code"> </span><span class="hl-identifier">actionEdit</span><span class="hl-brackets">(</span><span class="hl-var">$id</span><span class="hl-brackets">)</span><span class="hl-code"> </span><span class="hl-brackets">{</span><span class="hl-code">
        </span><span class="hl-reserved">die</span><span class="hl-brackets">(</span><span class="hl-quotes">'</span><span class="hl-string">this is admin edit = </span><span class="hl-quotes">'</span><span class="hl-code">. </span><span class="hl-var">$id</span><span class="hl-brackets">)</span><span class="hl-code">;
    </span><span class="hl-brackets">}</span><span class="hl-code">
 
</span><span class="hl-brackets">}</span></pre>
  </div>
</div>

7. Copy and rename /protected/modules/user/views/default to /protected/modules/user/views/admin for your admin only views.

8. Create a /protected/modules/user/config directory and add a main.php file with something like:

<div class="hl-container">
  <div class="hl-main">
    <pre><span class="hl-inlinetags">&lt;?php</span><span class="hl-code">
</span><span class="hl-var">$module_name</span><span class="hl-code"> = </span><span class="hl-identifier">basename</span><span class="hl-brackets">(</span><span class="hl-identifier">dirname</span><span class="hl-brackets">(</span><span class="hl-identifier">dirname</span><span class="hl-brackets">(</span><span class="hl-reserved">__FILE__</span><span class="hl-brackets">)</span><span class="hl-brackets">)</span><span class="hl-brackets">)</span><span class="hl-code">;
</span><span class="hl-var">$default_controller</span><span class="hl-code"> = </span><span class="hl-quotes">'</span><span class="hl-string">default</span><span class="hl-quotes">'</span><span class="hl-code">;
 
</span><span class="hl-reserved">return</span><span class="hl-code"> </span><span class="hl-reserved">array</span><span class="hl-brackets">(</span><span class="hl-code">
    </span><span class="hl-quotes">'</span><span class="hl-string">import</span><span class="hl-quotes">'</span><span class="hl-code"> =&gt; </span><span class="hl-reserved">array</span><span class="hl-brackets">(</span><span class="hl-code">
        </span><span class="hl-quotes">'</span><span class="hl-string">application.modules.</span><span class="hl-quotes">'</span><span class="hl-code"> . </span><span class="hl-var">$module_name</span><span class="hl-code"> . </span><span class="hl-quotes">'</span><span class="hl-string">.models.*</span><span class="hl-quotes">'</span><span class="hl-code">,
    </span><span class="hl-brackets">)</span><span class="hl-code">,
    
    </span><span class="hl-quotes">'</span><span class="hl-string">modules</span><span class="hl-quotes">'</span><span class="hl-code"> =&gt; </span><span class="hl-reserved">array</span><span class="hl-brackets">(</span><span class="hl-code">
        </span><span class="hl-var">$module_name</span><span class="hl-code"> =&gt; </span><span class="hl-reserved">array</span><span class="hl-brackets">(</span><span class="hl-code">
            </span><span class="hl-quotes">'</span><span class="hl-string">defaultController</span><span class="hl-quotes">'</span><span class="hl-code"> =&gt; </span><span class="hl-var">$default_controller</span><span class="hl-code">,
        </span><span class="hl-brackets">)</span><span class="hl-code">,
    </span><span class="hl-brackets">)</span><span class="hl-code">,
    
    </span><span class="hl-quotes">'</span><span class="hl-string">components</span><span class="hl-quotes">'</span><span class="hl-code"> =&gt; </span><span class="hl-reserved">array</span><span class="hl-brackets">(</span><span class="hl-code">
        </span><span class="hl-quotes">'</span><span class="hl-string">urlManager</span><span class="hl-quotes">'</span><span class="hl-code"> =&gt; </span><span class="hl-reserved">array</span><span class="hl-brackets">(</span><span class="hl-code">
            </span><span class="hl-quotes">'</span><span class="hl-string">rules</span><span class="hl-quotes">'</span><span class="hl-code"> =&gt; </span><span class="hl-reserved">array</span><span class="hl-brackets">(</span><span class="hl-code">
                </span><span class="hl-var">$module_name</span><span class="hl-code"> . </span><span class="hl-quotes">'</span><span class="hl-string">/&lt;action:\w+&gt;/&lt;id:\d+&gt;</span><span class="hl-quotes">'</span><span class="hl-code"> =&gt; </span><span class="hl-var">$module_name</span><span class="hl-code"> . </span><span class="hl-quotes">'</span><span class="hl-string">/</span><span class="hl-quotes">'</span><span class="hl-code"> . </span><span class="hl-var">$default_controller</span><span class="hl-code"> . </span><span class="hl-quotes">'</span><span class="hl-string">/&lt;action&gt;</span><span class="hl-quotes">'</span><span class="hl-code">,
                </span><span class="hl-var">$module_name</span><span class="hl-code"> . </span><span class="hl-quotes">'</span><span class="hl-string">/&lt;action:\w+&gt;</span><span class="hl-quotes">'</span><span class="hl-code"> =&gt; </span><span class="hl-var">$module_name</span><span class="hl-code"> . </span><span class="hl-quotes">'</span><span class="hl-string">/</span><span class="hl-quotes">'</span><span class="hl-code"> . </span><span class="hl-var">$default_controller</span><span class="hl-code"> . </span><span class="hl-quotes">'</span><span class="hl-string">/&lt;action&gt;</span><span class="hl-quotes">'</span><span class="hl-code">,
            </span><span class="hl-brackets">)</span><span class="hl-code">,
        </span><span class="hl-brackets">)</span><span class="hl-code">,
    </span><span class="hl-brackets">)</span><span class="hl-code">,
</span><span class="hl-brackets">)</span><span class="hl-code">;</span></pre>
  </div>
</div>

and you can add more rules and config settings if you want&#8230;

9. Go back to your /protected/config/main.php file and right before you return $config, add this:

<div class="hl-container">
  <div class="hl-main">
    <pre><span class="hl-inlinetags">&lt;?php</span><span class="hl-code">
</span><span class="hl-var">$modules_dir</span><span class="hl-code"> = </span><span class="hl-identifier">dirname</span><span class="hl-brackets">(</span><span class="hl-identifier">dirname</span><span class="hl-brackets">(</span><span class="hl-reserved">__FILE__</span><span class="hl-brackets">)</span><span class="hl-brackets">)</span><span class="hl-code"> . </span><span class="hl-reserved">DIRECTORY_SEPARATOR</span><span class="hl-code"> . </span><span class="hl-quotes">'</span><span class="hl-string">modules</span><span class="hl-quotes">'</span><span class="hl-code"> . </span><span class="hl-reserved">DIRECTORY_SEPARATOR</span><span class="hl-code">;
</span><span class="hl-var">$handle</span><span class="hl-code"> = </span><span class="hl-identifier">opendir</span><span class="hl-brackets">(</span><span class="hl-var">$modules_dir</span><span class="hl-brackets">)</span><span class="hl-code">;
</span><span class="hl-reserved">while</span><span class="hl-code"> </span><span class="hl-brackets">(</span><span class="hl-reserved">false</span><span class="hl-code"> !== </span><span class="hl-brackets">(</span><span class="hl-var">$file</span><span class="hl-code"> = </span><span class="hl-identifier">readdir</span><span class="hl-brackets">(</span><span class="hl-var">$handle</span><span class="hl-brackets">)</span><span class="hl-brackets">)</span><span class="hl-brackets">)</span><span class="hl-code"> </span><span class="hl-brackets">{</span><span class="hl-code">
    </span><span class="hl-reserved">if</span><span class="hl-code"> </span><span class="hl-brackets">(</span><span class="hl-var">$file</span><span class="hl-code"> != </span><span class="hl-quotes">"</span><span class="hl-string">.</span><span class="hl-quotes">"</span><span class="hl-code"> && </span><span class="hl-var">$file</span><span class="hl-code"> != </span><span class="hl-quotes">"</span><span class="hl-string">..</span><span class="hl-quotes">"</span><span class="hl-code"> && </span><span class="hl-identifier">is_dir</span><span class="hl-brackets">(</span><span class="hl-var">$modules_dir</span><span class="hl-code"> . </span><span class="hl-var">$file</span><span class="hl-brackets">)</span><span class="hl-brackets">)</span><span class="hl-code"> </span><span class="hl-brackets">{</span><span class="hl-code">
        </span><span class="hl-var">$config</span><span class="hl-code"> = </span><span class="hl-identifier">CMap</span><span class="hl-code">::</span><span class="hl-identifier">mergeArray</span><span class="hl-brackets">(</span><span class="hl-var">$config</span><span class="hl-code">, </span><span class="hl-reserved">require</span><span class="hl-brackets">(</span><span class="hl-var">$modules_dir</span><span class="hl-code"> . </span><span class="hl-var">$file</span><span class="hl-code"> . </span><span class="hl-reserved">DIRECTORY_SEPARATOR</span><span class="hl-code"> . </span><span class="hl-quotes">'</span><span class="hl-string">config</span><span class="hl-quotes">'</span><span class="hl-code"> . </span><span class="hl-reserved">DIRECTORY_SEPARATOR</span><span class="hl-code"> . </span><span class="hl-quotes">'</span><span class="hl-string">main.php</span><span class="hl-quotes">'</span><span class="hl-brackets">)</span><span class="hl-brackets">)</span><span class="hl-code">;
    </span><span class="hl-brackets">}</span><span class="hl-code">
</span><span class="hl-brackets">}</span><span class="hl-code">
</span><span class="hl-identifier">closedir</span><span class="hl-brackets">(</span><span class="hl-var">$handle</span><span class="hl-brackets">)</span><span class="hl-code">;</span></pre>
  </div>
</div>

which will scan your modules directory and automatically add your module config to the main application config array.

Now you can have nice admin URLs that correspond with your modules: domain.com/admin, domain.com/admin/dashboard, domain.com/admin/user/create, domain.com/admin/user/edit/1 , domain.com/user/create, domain.com/user/edit/1 (instead of domain.com/user/default/edit/1 &#8211; you do not want &#8220;default&#8221; in the URL)

Note 1: You want to make sure you load the URL rules at the bootstrap so your whole application knows to redirect your module to the &#8220;default&#8221; controller without stating it. If you use the UserModule.php init() it will NOT work since you will already have to be in the module to load those rules, by that time it&#8217;s too late and you will get an error.

Note 2: You will obviously not want to use domain.com/user/create or domain.com/user/edit/1 on the front end of your site. I just put those as examples to show that everything is working.

Note 3: By adding the import statement for each module model you can now access all of your models throughout your whole application and other modules like: 

<div class="hl-container">
  <div class="hl-main">
    <pre><span class="hl-code">$model = User::model()-&gt;findByPK(1);</span></pre>
  </div>
</div>

I hope this helps some people who are looking to move over to Yii from CodeIgniter.