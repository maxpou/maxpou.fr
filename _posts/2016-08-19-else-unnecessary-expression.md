---
layout: post
title: Else, the unnecessary expression
lang: en
image:
image:
    feature: articles/else-unnecessary/header.jpg
---

# Else, the unnecessary expression

First time I was using PHP Mess Detector (a PHP Quality Tool), I was very surprise. Because, when I type an **Else expression, it raises an error** which it said: *"An if expression with an else branch is never necessary"*. What the f***, I have never seen something like this before.  

Indeed, this principle came from Jeff BAY in **Object Calisthenics**, an exercise-chapter from the **The ThoughWorks Anthology** (written by many well-known programmers like Martin FOWLER). In this chapter, Jeff BAY define 9 rules to write better software. *Avoid else expression* is one of them.

> Whaaaaaaaaaaaaaaaaaaaaaaaaaaaaaat?!  
— **one of my colleague** when I say 'Else is unnecessary'

## Solution 1: reorder your code

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
        return "Unknown user."; // <-- early return
    }

    return $aUser->getFirstName() ." ". $aUser->getLastName();
}
```

And tadaaaa! `else` condition disappears!


> Ok, you're kind but this example is very easy. Trust me, I write specific code and I can't drop else!
— **one of my colleague**

That was my colleague response when I talk about this. But you know, every developer write specific code (in 2016, CRUD are generated). If you don't, I'm sorry for you!  
So, sometimes it's difficult to avoid this expression. Most of times, it came from another problem: **you don't know design patterns**.

# Solution 2: State Pattern

If your code look like this:

```php
<?php
// I want to move my car
if ($car->isStarted()) {
    $car->move();
} elseif ($car->isStopped()) {
    throw new Exception("Start car first!");
} elseif ($car->is moving()) {
    // do nothing
}
```

First of all, replace this conditions by a `switch` statement. It's pretty much the same, but a little bit more readable.  
And then, you should use the **State Pattern**.

```php
<?php

class Car
{
    // ...
    private $state;

    function __construct(CarStateInterface $state)
    {
        $this->setState($state);
    }

    private function setState(CarStateInterface $state)
    {
        $this->state = $state;
    }
}

interface CarStateInterface
{
    public function start();
    public function move();
    public function stop();
}


abstract class AbstractCarState implements CarStateInterface
{
    public function start()
    {
        throw new \Exception("Illegal state transition");
    }
    public function move()
    {
        throw new \Exception("Illegal state transition");
    }
    public function stop()
    {
        throw new \Exception("Illegal state transition");
    }
}

//
// 1 Class per State
//

class MoveCarState extends AbstractCarState
{
    /** @return StopCarState */
    public function stop()
    {
        return new StopCarState;
    }

    /** @return MoveCarState */
    public function move()
    {
        return $this;
    }
}
class StopCarState extends AbstractCarState
{
    /** @return StartCarState */
    public function start()
    {
        return new StartCarState;
    }
}
class StartCarState extends AbstractCarState
{
    /** @return StopCarState */
    public function stop()
    {
        return new StopCarState;
    }

    /** @return MoveCarState */
    public function move()
    {
        return new MoveCarState;
    }
}
```

Now I can move my car like this, without switch/else/elseif condition!

```php
<?php
$myTestcar = new Car(new >WhateverCarState());
$myTestcar->move();
```

**Nb:** Instead of creating an AbstractCarState, you can simply implement the CarStateInterface for all of your XXXCarState.


## Solution 3: Strategy Pattern

Sometimes, you have to check the object's instance before doing something.

```php
<?php
if ($mybeer->type == "noAlcoholBeer") {
    $mybeer->drinkNoAlcoholBeer();
} elseif ($mybeer->type == "strongBeer") {
    $mybeer->drinkStrongBeer();
} else {
    $mybeer->drinkSoftBeer();
}
```

```php
<?php
interface DrinkBehaviorInterface
{
    public function drink();
}
//1 class per behavior
class DrinkNoAlcoholBeer implements DrinkBehaviorInterface
{
    /** @return string */
    public function drink()
    {
        return "Oh it's shitty!";
    }
}
class DrinkSoftBeer implements DrinkBehaviorInterface
{
    /** @return string */
    public function drink()
    {
        return "I feel dehydrated and I'm Ok!";
    }
}

class DrinkStrongBeer implements DrinkBehaviorInterface
{
    /** @return string */
    public function drink()
    {
        return "Damn, I can't drive!";
    }
}
class Beer
{
    /**  @var DrinkBehaviorInterface */
    private $iBeerBehavior;

    function __construct(DrinkBehaviorInterface $beerBehaviorType)
    {
        $this->setBeerBehavior();
    }

    public function applyDrink()
    {
        return $this->iBeerBehavior->drink();
    }

    public function setBeerBehavior(DrinkBehaviorInterface $beerBehaviorType)
    {
        $this->iBeerBehavior = $beerBehaviorType;
    }
}
```

Now you can use it like this:

```php
<?php
$kwak = new Beer(new DrinkStrongBeer());
echo $kwak->applyDrink(); //Damn, I can't drive!
```

## Solution 4: NullObject Pattern

*In this solution, examples come from [Dominik Liebler Github repository](https://github.com/domnikl/DesignPatternsPHP/blob/master/Behavioral/NullObject/Service.php)*  
Sometimes need to check if an object isn't null before doing something. Like that:

```php
<?php
if (!is_null($logger)) {
    $logger->log("banana");
}
```

This is how NullObject Pattern works:

```php
<?php

interface LoggerInterface
{
    public function log($str);
}
class PrintLogger implements LoggerInterface
{
    public function log($str)
    {
        echo $str;
    }
}
class NullLogger implements LoggerInterface
{
    public function log($str)
    {
        // do nothing
    }
}

class Service
{
    public function __construct(LoggerInterface $log)
    {
        $this->logger = $log;
    }

    public function doSomething()
    {
        // no more check "if (!is_null($this->logger))..." with the NullObject pattern
        $this->logger->log("Oh, I'm doing something!");
        // something to do...
    }
}
```

And this is how does it works:

```php
<?php
$service = new Service(new NullLogger());
$service->doSomething(); //(no output)

$service = new Service(new PrintLogger());
$service->doSomething(); //Oh, I'm doing something!
```

As far as I'm concerned, I prefer this pattern when he's combined with patterns like [Factory](https://github.com/maxpou/design-pattern-php/blob/master/DP/NullObject/nullObject.md).


## Conclusion

I apply this principle every day. And now 90% of my if blocks, does not contain any else expression! (yeah, I am lazy sometime ;-)). Most of time, the first solution is the solution. Take care, sometimes too much design patterns lead your application to **overengineering**. First, make sure it's relevant and remember: **pragmatism over theory**.

![]({{ site.url }}/images/articles/else-unnecessary/overengineering.jpg)

Oh, by the way, I implement this patterns [in a Github repository](https://github.com/maxpou/design-pattern-php). You can take a look, it's fully tested!
