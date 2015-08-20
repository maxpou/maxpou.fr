---
layout: post
title: Astuces JavaScript
description: "Astuces JavaScript"
modified: 2015-08-19
tags: ["JavaScript"]
image:
    feature: abstract-7.jpg
    credit: dargadgetz
    creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
---
#1

{% highlight javascript %}
function documentTitle(theTitle)
    ​if (!theTitle) {
        theTitle  = "Untitled Document";
    }
}
{% endhighlight %}

{% highlight javascript %}
function documentTitle(theTitle)
    theTitle  = theTitle || "Untitled Document";
}
{% endhighlight %}

#2

{% highlight javascript %}
function isAdult(age) {
    if (age && age > 17) {
        return true;
    } else {
        return false;
    }
}
{% endhighlight %}

{% highlight javascript %}
function isAdult(age) {
    return age && age > 17 ;
}
{% endhighlight %}

#3

{% highlight javascript %}
if (userName) {
    logIn(userName);
}
 else {
     signUp ();
}
{% endhighlight %}

{% highlight javascript %}
userName && logIn (userName) || signUp ();
{% endhighlight %}
