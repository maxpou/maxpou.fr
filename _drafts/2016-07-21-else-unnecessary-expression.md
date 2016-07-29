---
layout: post
title: Else, the unnecessary expression
lang: en
image:
    feature: abstract-1.jpg
    credit: dargadgetz
    creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
---

# Else, the unnecessary expression

First time I was using PHP Mess Detector (a PHP Quality Tool), I was very surprise. Because, when I type an **Else expression, it raises an error** which it said: *"An if expression with an else branch is never necessary"*. What the f***, I never see this before.  

After few researches, this principle came from Jeff BAY in **Object Calisthenics**, an exercice-chapter from the The ThoughWorks Anthology (written by many well-knwon programmers like Martin FOWLER). In this chapter, Jeff BAY define 9 rules to write better software.


## How to avoid Else expression

Ok, given you have a function like this:

```php
<?php
function getUserDenomination(User $aUser)
{
    if ($aUser->getFirstName() && $aUser->getLastName()) {
        $name = $aUser->getFirstName() ." ". $aUser->getLastName();
    } else {
        $name = "Unknown user.";
    }

    return $name;
}
```

The first step, is to replace `$name` variable by a `return` statement.

```php
<?php
function getUserDenomination(User $aUser)
{
    if ($aUser->getFirstName() && $aUser->getLastName()) {
        return $aUser->getFirstName() ." ". $aUser->getLastName();
    } else {
        return "Unknown user.";
    }
}
```

And because, we're not beasts, we should inverse condition (avoid finish your function with pseudo-exceptions).

```php
<?php
function getUserDenomination(User $aUser)
{
    if (!$aUser->getFirstName() && !$aUser->getLastName()) {
        return "Unknown user.";
    }

    return $aUser->getFirstName() ." ". $aUser->getLastName();
}
```

And tadaaaa! `else` condition disappears!

## Ok, you're kind but this example is very easy. Trust me, I write specific code and I can't drop else!

That was my colleague response when I talk about this. But you know, every developer write specific code (in 2016, CRUD are generated). If you don't, I'm sorry for you!  
So, sometimes it's difficult to avoid this expression. Most of times, it came from another problem: **you don't know design patterns**.

For Example, if you have condition like that:

```php
<?php
if ($command->isPending()) {
    // code
} elseif ($command->isDelivered()) {
    // code
} elseif ($command->whatEverState()) {
    // code
} else {
    // code
}
```

The first step is to replace this conditions by a `switch` statement. It's pretty much the same, but a little bit more readable.  
Maybe you should take a look on **State Pattern**. By the way, you should also take a look on the **NullObject Pattern** and **Strategy Pattern**. By the way, I implement them [in a Github repository](https://github.com/maxpou/design-pattern-php).


## Conclusion

I apply this principle every day. And now 90% of my if blocks, does not contain any else expression! (yeah, I am lazy sometime ;-)).
