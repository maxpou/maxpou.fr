---
layout: post
title: Dealing with Enum in a Symfony App with Doctrine2 as ORM
slug: dealing-with-enum-symfony-doctrine
date: 2016-08-04
language: en
tags: ["Symfony2", "PHP", "Doctrine"]
enerate-card: false
cover: ./abstract-1.jpg
---

Using Enum in a Symfony App isn't obvious. If your Enum is short, you can directly put it on your entity. But if it grows, it will be quickly unmanageable.

## The problem

Ok given, you want to create a message object which contains an attribute called `type`. Like [Twitter Bootstrap's Alert](http://getbootstrap.com/components/#alerts), your Message type's attribute must contain some specific strings (e.g. info, success...).  

In the [official documentation](http://doctrine2.readthedocs.io/en/latest/cookbook/mysql-enums.html), Doctrine provides 2 solutions for MySQL Database. What happens if we want to use another Database like PostgreSQL? By the way, you can also take a look at these solutions. As far as I am concerned, I don't like them because it didn't solve the problem on the *PHP side*.

Obviously, we can also create a Table called MessageType. But according to me, a database table must be used to store data. In this case, a type isn't managed by a human.

So we need custom **reusable** PHP Enum.  
Let's do this!

![a kid on a ship](./ship-kid.gif)


## A solution

First, you need to create a MessageTypeEnum.

```php
<?php

namespace DemoBundle\Enum;

abstract class MessageTypeEnum
{
    const TYPE_INFO    = "info";
    const TYPE_WARNING = "warning";
    const TYPE_SUCCESS = "success";
    const TYPE_DANGER  = "danger";

    /** @var array user friendly named type */
    protected static $typeName = [
        self::TYPE_INFO    => 'Information',
        self::TYPE_WARNING => 'Attention',
        self::TYPE_SUCCESS => 'Succès',
        self::TYPE_DANGER  => 'Danger',
    ];

    /**
     * @param  string $typeShortName
     * @return string
     */
    public static function getTypeName($typeShortName)
    {
        if (!isset(static::$typeName[$typeShortName])) {
            return "Unknown type ($typeShortName)";
        }

        return static::$typeName[$typeShortName];
    }

    /**
     * @return array<string>
     */
    public static function getAvailableTypes()
    {
        return [
            self::TYPE_INFO,
            self::TYPE_WARNING,
            self::TYPE_SUCCESS,
            self::TYPE_DANGER
        ];
    }

```

Here is an example of use:

```php
<?php
echo MessageTypeEnum::TYPE_INFO;
//info
echo MessageTypeEnum::getTypeName(MessageTypeEnum::TYPE_INFO);
//Information
```


Now, you need to adapt your Entity:

```php
<?php

class Message
{
    /**
     * @var string
     * @ORM\Column(name="type", type="string", length=255, nullable=false)
     */
    private $type;

    //...

    /**
     * @param string $type
     * @return Message
     */
     public function setType($type)
     {
         if (!in_array($type, MessageTypeEnum::getAvailableTypes())) {
             throw new \InvalidArgumentException("Invalid type");
         }

         $this->type = $type;

         return $this;
     }
}
```

And this is the form: (`MessageType.php`)

```php
<?php

public function buildForm(FormBuilderInterface $builder, array $options)
{
    $builder
        ->add('content')
        ->add('type', 'choice', array(
            'required' => true,
            'choices' => MessageTypeEnum::getAvailableTypes(),
            'choices_as_values' => true,
            'choice_label' => function($choice) {
                return MessageTypeEnum::getTypeName($choice);
            },
        ))
    ;
}
```

And tadaaa it works!

Your Form should look like this:

<div class="notice">
<form>
    <input type="text" name="demobundle_message[content]" />
    <br/>
    <select name="type" name="demobundle_message[type]">
        <option value="info">Information</option>
        <option value="warning">Attention</option>
        <option value="success">Succès</option>
        <option value="danger">Danger</option>
    </select>
</form>
</div>
