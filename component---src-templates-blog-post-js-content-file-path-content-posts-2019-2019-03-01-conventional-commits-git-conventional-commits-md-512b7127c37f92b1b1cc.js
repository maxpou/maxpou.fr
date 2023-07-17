"use strict";(self.webpackChunkmaxpou_fr=self.webpackChunkmaxpou_fr||[]).push([[4370],{8254:function(e,t,n){n.r(t),n.d(t,{default:function(){return p}});var a=n(1151),l=n(7294);function r(e){const t=Object.assign({p:"p",br:"br",span:"span",ul:"ul",li:"li",strong:"strong",h2:"h2",a:"a"},(0,a.ah)(),e.components);return l.createElement(l.Fragment,null,l.createElement(t.p,null,"Git is a very powerful tool installed on most of our machines. As developer, we use it every day.\nBut, unfortunately, at first glance, this tool is not very developer friendly. That’s why a lot of\npeople bypass the command line interface (CLI) with a graphical user interface (GUI).",l.createElement(t.br),"\n","It’s like using a framework without knowing the language itself. It can be OK at the beginning but,\nsooner or later you, you will have problems."),"\n",l.createElement(t.p,null,"Let’s take an example:"),"\n",l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">$ git log --oneline ./src/components/button/\n\ndaccff1f test should pass\n3fff19f6 test should pass\n5b998d9a add disabled property for button\n06faab4d fix lint\n186cce90 refactor button\n4b99d91a fix spinner component\n5b998d9a fix css\n263288a5 test should pass\nc3fb85af Create Button component</code></pre></div>'}}),"\n",l.createElement(t.p,null,"There’s might be nothing wrong for you with this log. Let me show you the issues I’ve found with\nthis log:"),"\n",l.createElement(t.ul,null,"\n",l.createElement(t.li,null,"It’s hard to understand the Component’s history. We might repeat errors already fixed."),"\n",l.createElement(t.li,null,"There are unnecessary commits which pollute logs and make history hard to read. Also,\nfunctionalities like ",l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">git blame</code>'}})," become irrelevant."),"\n",l.createElement(t.li,null,"It seems that a feature was added by a few commits. Which commit should I include if I want to\nrevert this operation?"),"\n",l.createElement(t.li,null,l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">4b99d9a</code>'}})," say something about a different component. Is it an unwanted change? Again, what if we\nneed to revert?"),"\n",l.createElement(t.li,null,"…"),"\n"),"\n",l.createElement(t.p,null,"I think we shouldn’t confound ",l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">git commit</code>'}})," with ",l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">ctrl</code>'}})," + ",l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">s</code>'}}),". A ",l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">git log</code>'}})," should be like ",l.createElement(t.strong,null,"reading a\nstory"),". By reading the log, I should be able to understand in ~10s the whole file history."),"\n",l.createElement(t.p,null,"What if we had something like this:"),"\n",l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">$ git log --oneline ./src/components/button/\n\n06faab4d revert: feat: add disabled property\n186cce90 feat: add disabled property\n5b998d9a test: add scenario for readonly property\n263288a5 fix: fix css when hover\nc3fb85af feat: add button component</code></pre></div>'}}),"\n",l.createElement(t.p,null,"Way cleaner, isn’t it? That something called ",l.createElement(t.strong,null,"Conventional Commits"),"."),"\n",l.createElement(t.h2,{id:"conventional-commits",style:{position:"relative"}},l.createElement(t.a,{href:"#conventional-commits","aria-label":"conventional commits permalink",className:"anchor before"},l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Conventional commits"),"\n",l.createElement(t.p,null,"Conventional commits is a Git commit convention made by the\n",l.createElement(t.a,{href:"https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit"},"Angular team"),". Basically,\nevery pull request should end up with one commit and a standardized commit message."),"\n",l.createElement(t.p,null,"The message should follow this regex:"),"\n",l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">/^(revert: )?(feat|fix|docs|style|refactor|perf|test|chore)(\\(.+\\))?: .{1,50}/</code></pre></div>'}}),"\n",l.createElement(t.p,null,"Types of commit:"),"\n",l.createElement(t.ul,null,"\n",l.createElement(t.li,null,l.createElement(t.strong,null,"feat"),": Add a new feature (equivalent to a ",l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">MINOR</code>'}})," in\n",l.createElement(t.a,{href:"https://semver.org"},"Semantic Versioning"),")."),"\n",l.createElement(t.li,null,l.createElement(t.strong,null,"fix"),": Fix a bug (equivalent to a ",l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">PATCH</code>'}})," in ",l.createElement(t.a,{href:"https://semver.org"},"Semantic Versioning"),")."),"\n",l.createElement(t.li,null,l.createElement(t.strong,null,"docs"),": Documentation changes."),"\n",l.createElement(t.li,null,l.createElement(t.strong,null,"style"),": Code style change (semicolon, indentation…)."),"\n",l.createElement(t.li,null,l.createElement(t.strong,null,"refactor"),": Refactor code without changing public API."),"\n",l.createElement(t.li,null,l.createElement(t.strong,null,"perf"),": Update code performances."),"\n",l.createElement(t.li,null,l.createElement(t.strong,null,"test"),": Add test to an existing feature."),"\n",l.createElement(t.li,null,l.createElement(t.strong,null,"chore"),": Update something without impacting the user (ex: bump a dependency in ",l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">package.json</code>'}}),")."),"\n"),"\n",l.createElement(t.p,null,"Project that uses this convention: ",l.createElement(t.a,{href:"https://github.com/angular/angular"},"Angular"),",\n",l.createElement(t.a,{href:"https://github.com/vuejs/vue"},"Vue.js"),", ",l.createElement(t.a,{href:"https://github.com/gatsbyjs/gatsby"},"Gatsby (almost)"),",\n",l.createElement(t.a,{href:"https://github.com/lerna/lerna"},"Lerna (almost)"),", ",l.createElement(t.a,{href:"https://github.com/facebook/jest"},"jest (almost)"),"."),"\n",l.createElement(t.h2,{id:"benefits",style:{position:"relative"}},l.createElement(t.a,{href:"#benefits","aria-label":"benefits permalink",className:"anchor before"},l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Benefits"),"\n",l.createElement(t.p,null,l.createElement(t.strong,null,"Project/code understandability"),l.createElement(t.br),"\n","Commits are more descriptives and it’s easier to understand the project’s history. It became also\neasier and to contribute.",l.createElement(t.br),"\n","For example, I never contributed to the Angular’s http package. But,\n",l.createElement(t.a,{href:"https://github.com/angular/angular/commits/master/packages/http"},"reading the repo’s git log")," helps\nme to better understand this package’s history."),"\n",l.createElement(t.p,null,l.createElement(t.strong,null,"Usability"),l.createElement(t.br),"\n","If you have one action per commit, it became easier to revert a change. Same if you have git\nconflict…"),"\n",l.createElement(t.p,null,l.createElement(t.strong,null,"Master your Git skills"),l.createElement(t.br),"\n","Because not all Git-repository manager have a “squash and merge” option, you sometimes have to do\nthis operation by yourself. So, you will learn how to “squash” your commits, how to “fixup” a\ncommit, how to remove a specific commit… It’s always important to know what’s going on under the\nhood!"),"\n",l.createElement(t.h2,{id:"see-also",style:{position:"relative"}},l.createElement(t.a,{href:"#see-also","aria-label":"see also permalink",className:"anchor before"},l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"See also"),"\n",l.createElement(t.ul,null,"\n",l.createElement(t.li,null,l.createElement(t.a,{href:"https://www.conventionalcommits.org/en/v1.0.0-beta.2/"},"conventionalcommits.org")),"\n",l.createElement(t.li,null,l.createElement(t.a,{href:"https://github.com/vuejs/vue/blob/dev/.github/COMMIT_CONVENTION.md"},"Vue.js commit convention")),"\n",l.createElement(t.li,null,l.createElement(t.a,{href:"https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular"},"github.com/conventional-changelog/conventional-changelog")," -\nA nice tool to generate changelog based on the git message."),"\n",l.createElement(t.li,null,l.createElement(t.a,{href:"https://github.com/conventional-changelog/commitlint"},"github.com/conventional-changelog/commitlint")," -\nA git commit linter. Use it with Husky."),"\n"))}var o=function(e){void 0===e&&(e={});const{wrapper:t}=Object.assign({},(0,a.ah)(),e.components);return t?l.createElement(t,e,l.createElement(r,e)):r(e)},s=n(4222),c=n(418),i=n(4529),m=n(7953),u=n(4849),h=n(5536),g=n(2404);function d(e){let{data:t,pageContext:n,children:a,location:r}=e;const o=t.post,{previous:d,next:p}=n;return l.createElement(s.Z,{location:r},l.createElement(h.Z,{title:o.frontmatter.title,description:o.frontmatter.description||o.excerpt,cover:o.frontmatter.cover&&o.frontmatter.cover.publicURL,imageShare:o.frontmatter.imageShare&&o.frontmatter.imageShare.publicURL,lang:o.frontmatter.language,translations:o.frontmatter.translations,path:o.frontmatter.slug,isBlogPost:!0}),l.createElement(i.Z,{heroImg:o.frontmatter.cover,title:o.frontmatter.title}),l.createElement(c.Z,null,l.createElement(m.Z,{post:o},a)),l.createElement(c.Z,{as:"aside"},l.createElement(g.Z,{slug:o.frontmatter.slug,title:o.frontmatter.title,redditPostId:o.frontmatter.redditPostId})),l.createElement(u.Z,{previous:d,next:p}))}function p(e){return l.createElement(d,e,l.createElement(o,e))}}}]);
//# sourceMappingURL=component---src-templates-blog-post-js-content-file-path-content-posts-2019-2019-03-01-conventional-commits-git-conventional-commits-md-512b7127c37f92b1b1cc.js.map