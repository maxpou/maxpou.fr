"use strict";(self.webpackChunkmaxpou_fr=self.webpackChunkmaxpou_fr||[]).push([[5950],{9157:function(n,a,e){e.r(a),e.d(a,{default:function(){return h}});var t=e(1151),s=e(7294);function p(n){const a=Object.assign({h1:"h1",a:"a",span:"span",p:"p",br:"br",ul:"ul",li:"li",strong:"strong",img:"img",em:"em",h2:"h2",ol:"ol"},(0,t.ah)(),n.components);return s.createElement(s.Fragment,null,s.createElement(a.h1,{id:"vagrant-symfony-and-windows-are-not-incompatibles",style:{position:"relative"}},s.createElement(a.a,{href:"#vagrant-symfony-and-windows-are-not-incompatibles","aria-label":"vagrant symfony and windows are not incompatibles permalink",className:"anchor before"},s.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Vagrant, Symfony and Windows are not incompatibles"),"\n",s.createElement(a.p,null,"At work, I’m using Vagrant on my Windows 10 because Docker really sucks on windows :(",s.createElement(a.br),"\n","So after promote ",s.createElement(a.a,{href:"https://puphpet.com/"},"PuPHPet"),", I’m now using\n",s.createElement(a.a,{href:"https://box.scotch.io/"},"Scotch Box"),"."),"\n",s.createElement(a.p,null,"In a few words, this is some features already in this box:"),"\n",s.createElement(a.ul,null,"\n",s.createElement(a.li,null,"Ubuntu 14.04 LTS (Trusty Tahr)"),"\n",s.createElement(a.li,null,"PHP 5.6"),"\n",s.createElement(a.li,null,"Ruby 2.2.x"),"\n",s.createElement(a.li,null,"MySQL, PostreSQL, SQLite, MongoDB"),"\n",s.createElement(a.li,null,"Redis, Memcache, Memcached"),"\n",s.createElement(a.li,null,"Vim, Git, cURL, Composer, Node, NPM, Mailcatcher, Bower, Grunt…"),"\n",s.createElement(a.li,null,"…"),"\n"),"\n",s.createElement(a.p,null,"It is a good base.",s.createElement(a.br),"\n","For my needs, I pimp this box (take a look on\n",s.createElement(a.a,{href:"https://github.com/maxpou/scotch-box"},"my fork (on GitHub)"),"). I found it pretty cool on my own\nlinux… but on my Windows, it’s ",s.createElement(a.strong,null,"really SLOW!")),"\n",s.createElement(a.img,{src:"/3faf0c6cfca18318d668184edc42fb2a/snail-1.gif",alt:"funny snail gif"}),"\n",s.createElement(a.p,null,s.createElement(a.em,null,"Before: running a Symfony app into a Vagrant box")),"\n",s.createElement(a.p,null,"Here is some tip’s to speed up your application."),"\n",s.createElement(a.h2,{id:"first-step-install-plugins",style:{position:"relative"}},s.createElement(a.a,{href:"#first-step-install-plugins","aria-label":"first step install plugins permalink",className:"anchor before"},s.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"First step: Install plugins"),"\n",s.createElement(a.ol,null,"\n",s.createElement(a.li,null,"\n",s.createElement(a.p,null,"Install ",s.createElement(a.a,{href:"https://github.com/dotless-de/vagrant-vbguest"},"VirtualBox Guest plugin")),"\n",s.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="bash"><pre class="language-bash"><code class="language-bash">vagrant plugin <span class="token function">install</span> vagrant-vbguest</code></pre></div>'}}),"\n"),"\n",s.createElement(a.li,null,"\n",s.createElement(a.p,null,"Install ",s.createElement(a.a,{href:"https://github.com/winnfsd/vagrant-winnfsd"},"Vagrant WinNFSd plugin")),"\n",s.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="bash"><pre class="language-bash"><code class="language-bash">vagrant plugin <span class="token function">install</span> vagrant-winnfsd</code></pre></div>'}}),"\n"),"\n"),"\n",s.createElement(a.p,null,"I don’t reinvent the wheel here. If you type ",s.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">speed up vagrant on windows</code>'}})," you will see the same\nresults.",s.createElement(a.br),"\n","With this config I switch ",s.createElement(a.strong,null,"from ~16s to ~4s for a page to load"),"."),"\n",s.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<span\n      class="gatsby-resp-image-wrapper"\n      style="position: relative; display: block; margin-left: auto; margin-right: auto; max-width: 590px; "\n    >\n      <span\n    class="gatsby-resp-image-background-image"\n    style="padding-bottom: 4.72972972972973%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAABCAYAAADeko4lAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAWElEQVR42mOIz4r4HxsX8786w+v/xlqz/9G+Zv+trM3+e7jZ/7ezNfvv7eX8397O/L+Zqd5/czN9MLYw1/9vYKT/PyXA4P/ePq//mxut/s8qtvvfWBX5HwD9xibPARx+SQAAAABJRU5ErkJggg==\'); background-size: cover; display: block;"\n  ></span>\n  <picture>\n          <source\n              srcset="/static/8392d58c8b4177e9f28c4a777518d42b/cbe2e/1.webp 148w,\n/static/8392d58c8b4177e9f28c4a777518d42b/3084c/1.webp 295w,\n/static/8392d58c8b4177e9f28c4a777518d42b/5ca24/1.webp 590w,\n/static/8392d58c8b4177e9f28c4a777518d42b/9ec5a/1.webp 807w"\n              sizes="(max-width: 590px) 100vw, 590px"\n              type="image/webp"\n            />\n          <source\n            srcset="/static/8392d58c8b4177e9f28c4a777518d42b/12f09/1.png 148w,\n/static/8392d58c8b4177e9f28c4a777518d42b/e4a3f/1.png 295w,\n/static/8392d58c8b4177e9f28c4a777518d42b/fcda8/1.png 590w,\n/static/8392d58c8b4177e9f28c4a777518d42b/d2a60/1.png 807w"\n            sizes="(max-width: 590px) 100vw, 590px"\n            type="image/png"\n          />\n          <img\n            class="gatsby-resp-image-image"\n            src="/static/8392d58c8b4177e9f28c4a777518d42b/fcda8/1.png"\n            alt="step 1"\n            title=""\n            loading="lazy"\n            decoding="async"\n            style="width:100%;height:100%;margin:0;vertical-align:middle;position:absolute;top:0;left:0;"\n          />\n        </picture>\n    </span>'}}),"\n",s.createElement(a.h2,{id:"second-step-install-php7",style:{position:"relative"}},s.createElement(a.a,{href:"#second-step-install-php7","aria-label":"second step install php7 permalink",className:"anchor before"},s.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Second step: Install PHP7"),"\n",s.createElement(a.p,null,"In my case PHP7 really decrease page loading time. Be careful, installing PHP7 will remove php5."),"\n",s.createElement(a.p,null,s.createElement(a.strong,null,"1. Update package list")),"\n",s.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="bash"><pre class="language-bash"><code class="language-bash"><span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> python-software-properties\n<span class="token function">sudo</span> <span class="token assign-left variable"><span class="token environment constant">LC_ALL</span></span><span class="token operator">=</span>C.UTF-8 add-apt-repository ppa:ondrej/php</code></pre></div>'}}),"\n",s.createElement(a.p,null,s.createElement(a.strong,null,"2. Install PHP7 and remove PHP5")),"\n",s.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="bash"><pre class="language-bash"><code class="language-bash"><span class="token function">sudo</span> <span class="token function">apt-get</span> update\n<span class="token function">sudo</span> <span class="token function">apt-get</span> purge php5-common <span class="token parameter variable">-y</span>\n<span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> <span class="token parameter variable">-y</span> <span class="token punctuation">\\</span>\n    <span class="token operator">&amp;&amp;</span> php7.0 <span class="token punctuation">\\</span>\n    <span class="token operator">&amp;&amp;</span> php7.0-fpm <span class="token punctuation">\\</span>\n    <span class="token operator">&amp;&amp;</span> php7.0-mysql <span class="token punctuation">\\</span>\n    <span class="token operator">&amp;&amp;</span> php-curl <span class="token punctuation">\\</span>\n    <span class="token operator">&amp;&amp;</span> libapache2-mod-php7.0 <span class="token punctuation">\\</span>\n    <span class="token operator">&amp;&amp;</span> php7.0-mbstring\n<span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token parameter variable">--purge</span> autoremove <span class="token parameter variable">-y</span></code></pre></div>'}}),"\n",s.createElement(a.p,null,s.createElement(a.strong,null,"3. Set timezone (i.e. date.timezone = Europe/Paris)")),"\n",s.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="bash"><pre class="language-bash"><code class="language-bash"><span class="token function">sudo</span> <span class="token function">vi</span> /etc/php/7.0/cli/php.ini\n<span class="token function">sudo</span> <span class="token function">vi</span> /etc/php/7.0/apache2/php.ini</code></pre></div>'}}),"\n",s.createElement(a.p,null,s.createElement(a.strong,null,"4. Restart apache service")),"\n",s.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="bash"><pre class="language-bash"><code class="language-bash"><span class="token function">sudo</span> a2enmod php7.0\n<span class="token function">sudo</span> <span class="token function">service</span> apache2 restart</code></pre></div>'}}),"\n",s.createElement(a.p,null,"Now my app ",s.createElement(a.strong,null,"run in ~2s"),"."),"\n",s.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<span\n      class="gatsby-resp-image-wrapper"\n      style="position: relative; display: block; margin-left: auto; margin-right: auto; max-width: 590px; "\n    >\n      <span\n    class="gatsby-resp-image-background-image"\n    style="padding-bottom: 4.72972972972973%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAABCAYAAADeko4lAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAVElEQVR42mPwjwv5Hx0Z/d/bx/u/oaHhf11d3f/6evr/TUxM/puYmv43MND/b2pq+l9FReW/kpISHKsoK/2XlFH4Xxis/X9Xq+P/NaX6/2dm6f0HADb9IjkaAlDjAAAAAElFTkSuQmCC\'); background-size: cover; display: block;"\n  ></span>\n  <picture>\n          <source\n              srcset="/static/2bc6d0d68aa8c4b444cccf67fa10ed8b/cbe2e/2.webp 148w,\n/static/2bc6d0d68aa8c4b444cccf67fa10ed8b/3084c/2.webp 295w,\n/static/2bc6d0d68aa8c4b444cccf67fa10ed8b/5ca24/2.webp 590w,\n/static/2bc6d0d68aa8c4b444cccf67fa10ed8b/02aff/2.webp 790w"\n              sizes="(max-width: 590px) 100vw, 590px"\n              type="image/webp"\n            />\n          <source\n            srcset="/static/2bc6d0d68aa8c4b444cccf67fa10ed8b/12f09/2.png 148w,\n/static/2bc6d0d68aa8c4b444cccf67fa10ed8b/e4a3f/2.png 295w,\n/static/2bc6d0d68aa8c4b444cccf67fa10ed8b/fcda8/2.png 590w,\n/static/2bc6d0d68aa8c4b444cccf67fa10ed8b/2e237/2.png 790w"\n            sizes="(max-width: 590px) 100vw, 590px"\n            type="image/png"\n          />\n          <img\n            class="gatsby-resp-image-image"\n            src="/static/2bc6d0d68aa8c4b444cccf67fa10ed8b/fcda8/2.png"\n            alt="step 2"\n            title=""\n            loading="lazy"\n            decoding="async"\n            style="width:100%;height:100%;margin:0;vertical-align:middle;position:absolute;top:0;left:0;"\n          />\n        </picture>\n    </span>'}}),"\n",s.createElement(a.h2,{id:"third-step-dont-sync-cachelog-folders-with-your-windows-host",style:{position:"relative"}},s.createElement(a.a,{href:"#third-step-dont-sync-cachelog-folders-with-your-windows-host","aria-label":"third step dont sync cachelog folders with your windows host permalink",className:"anchor before"},s.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Third step: Don’t sync cache/log folders with your windows host!"),"\n",s.createElement(a.p,null,"On Benjamin\n",s.createElement(a.a,{href:"http://www.whitewashing.de/2013/08/19/speedup_symfony2_on_vagrant_boxes.html"},"Eberlei’s blog"),", I\nfound this last tip: put yours logs and cache on non-shared folders."),"\n",s.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="php"><pre class="language-php"><code class="language-php"><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>\n<span class="token comment">//app/AppKernel.php</span>\n\n<span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">getCacheDir</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n<span class="token punctuation">{</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">in_array</span><span class="token punctuation">(</span><span class="token variable">$this</span><span class="token operator">-></span><span class="token property">environment</span><span class="token punctuation">,</span> <span class="token keyword">array</span><span class="token punctuation">(</span><span class="token string single-quoted-string">\'dev\'</span><span class="token punctuation">,</span> <span class="token string single-quoted-string">\'test\'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token string single-quoted-string">\'/dev/shm/application-name/cache/\'</span> <span class="token operator">.</span>  <span class="token variable">$this</span><span class="token operator">-></span><span class="token property">environment</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">return</span> <span class="token keyword static-context">parent</span><span class="token operator">::</span><span class="token function">getCacheDir</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">getLogDir</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n<span class="token punctuation">{</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">in_array</span><span class="token punctuation">(</span><span class="token variable">$this</span><span class="token operator">-></span><span class="token property">environment</span><span class="token punctuation">,</span> <span class="token keyword">array</span><span class="token punctuation">(</span><span class="token string single-quoted-string">\'dev\'</span><span class="token punctuation">,</span> <span class="token string single-quoted-string">\'test\'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token string single-quoted-string">\'/dev/shm/application-name/logs\'</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">return</span> <span class="token keyword static-context">parent</span><span class="token operator">::</span><span class="token function">getLogDir</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span></span></code></pre></div>'}}),"\n",s.createElement(a.p,null,"If you need, here is some aliases to help you."),"\n",s.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="bash"><pre class="language-bash"><code class="language-bash"><span class="token comment"># Remove cache</span>\n<span class="token builtin class-name">alias</span> cache-clear<span class="token operator">=</span><span class="token string">\'rm -rf /dev/shm/application-name/cache/\'</span>\n<span class="token comment"># Copy logs into your Sf project</span>\n<span class="token builtin class-name">alias</span> <span class="token assign-left variable">cplogs</span><span class="token operator">=</span><span class="token string">\'cp -R /dev/shm/application-name/logs /var/www/application-name/public/app\'</span></code></pre></div>'}}),"\n",s.createElement(a.p,null,"And… tadaaaa! It took Some hundred milliseconds ♥ (I also add some SQL request to MySQL… just\nfor fun)."),"\n",s.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<span\n      class="gatsby-resp-image-wrapper"\n      style="position: relative; display: block; margin-left: auto; margin-right: auto; max-width: 590px; "\n    >\n      <span\n    class="gatsby-resp-image-background-image"\n    style="padding-bottom: 4.72972972972973%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAABCAYAAADeko4lAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAU0lEQVR42gXBuxFAQBiFUa2YsR7Rz7WCfQQCM3Qg1wQF6IZYe59zijhnYghoFJIYJLz3hBiRBnLOmPWklDAz6trRtQ1l1bAFx3cvPKfnvSaOfeUHG1Yil9H2D1gAAAAASUVORK5CYII=\'); background-size: cover; display: block;"\n  ></span>\n  <picture>\n          <source\n              srcset="/static/df613c0c5dd383e83b099fb9774b1c47/cbe2e/3.webp 148w,\n/static/df613c0c5dd383e83b099fb9774b1c47/3084c/3.webp 295w,\n/static/df613c0c5dd383e83b099fb9774b1c47/5ca24/3.webp 590w,\n/static/df613c0c5dd383e83b099fb9774b1c47/4d911/3.webp 788w"\n              sizes="(max-width: 590px) 100vw, 590px"\n              type="image/webp"\n            />\n          <source\n            srcset="/static/df613c0c5dd383e83b099fb9774b1c47/12f09/3.png 148w,\n/static/df613c0c5dd383e83b099fb9774b1c47/e4a3f/3.png 295w,\n/static/df613c0c5dd383e83b099fb9774b1c47/fcda8/3.png 590w,\n/static/df613c0c5dd383e83b099fb9774b1c47/ea7fb/3.png 788w"\n            sizes="(max-width: 590px) 100vw, 590px"\n            type="image/png"\n          />\n          <img\n            class="gatsby-resp-image-image"\n            src="/static/df613c0c5dd383e83b099fb9774b1c47/fcda8/3.png"\n            alt="step 3"\n            title=""\n            loading="lazy"\n            decoding="async"\n            style="width:100%;height:100%;margin:0;vertical-align:middle;position:absolute;top:0;left:0;"\n          />\n        </picture>\n    </span>'}}),"\n",s.createElement(a.img,{src:"/911ed759acb03094b31f025306bcffe5/snail-2.gif",alt:"funny gif turbo-snail"}),"\n",s.createElement(a.p,null,s.createElement(a.em,null,"After: running a Symfony app into a Vagrant box")))}var c=function(n){void 0===n&&(n={});const{wrapper:a}=Object.assign({},(0,t.ah)(),n.components);return a?s.createElement(a,n,s.createElement(p,n)):p(n)},l=e(4222),o=e(418),i=e(4529),r=e(7953),u=e(4849),d=e(5536),g=e(2404);function m(n){let{data:a,pageContext:e,children:t,location:p}=n;const c=a.post,{previous:m,next:h}=e;return s.createElement(l.Z,{location:p},s.createElement(d.Z,{title:c.frontmatter.title,description:c.frontmatter.description||c.excerpt,cover:c.frontmatter.cover&&c.frontmatter.cover.publicURL,imageShare:c.frontmatter.imageShare&&c.frontmatter.imageShare.publicURL,lang:c.frontmatter.language,translations:c.frontmatter.translations,path:c.frontmatter.slug,isBlogPost:!0}),s.createElement(i.Z,{heroImg:c.frontmatter.cover,title:c.frontmatter.title}),s.createElement(o.Z,null,s.createElement(r.Z,{post:c},t)),s.createElement(o.Z,{as:"aside"},s.createElement(g.Z,{slug:c.frontmatter.slug,title:c.frontmatter.title,redditPostId:c.frontmatter.redditPostId})),s.createElement(u.Z,{previous:m,next:h}))}function h(n){return s.createElement(m,n,s.createElement(c,n))}}}]);
//# sourceMappingURL=component---src-templates-blog-post-js-content-file-path-content-posts-2016-2016-05-25-vagrant-symfony-windows-index-md-540b3391d57ad92b3c98.js.map