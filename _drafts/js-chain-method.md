---
layout: post
title: Chaîner des méthodes en JavaScript
description: "Chaîner des méthodes en JavaScript"
modified: 2015-08-19
tags: ["JavaScript"]
image:
    feature: abstract-6.jpg
    credit: dargadgetz
    creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
---

http://javascriptissexy.com/beautiful-javascript-easily-create-chainable-cascading-methods-for-expressiveness/


{% highlight javascript %}
// The data store:
var usersData = [{
    firstName: "tommy",
    lastName: "MalCom",
    email: "test@test.com",
    id: 102
}, {
    firstName: "Peter",
    lastName: "breCht",
    email: "test2@test2.com",
    id: 103
}, {
    firstName: "RoHan",
    lastName: "sahu",
    email: "test3@test3.com",
    id: 104
}]; // A quick utility function that does what it says:

function titleCaseName(str) {
    return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
} // Our object with the chainable methods

var userController = {
    currentUser: "",

    findUser: function(userEmail) {
        var arrayLength = usersData.length,
            i;
        for (i = arrayLength - 1; i >= 0; i--) {
            if (usersData[i].email === userEmail) {
                this.currentUser = usersData[i];
                break;
            }
        }
        return this;
    },

    formatName: function() {
        if (this.currentUser) {
            this.currentUser.fullName = titleCaseName(this.currentUser.firstName) + " " + titleCaseName(this.currentUser.lastName);
        }
        return this;
    },

    createLayout: function() {
        if (this.currentUser) {
            this.currentUser.viewData = "<h2>Member: " + this.currentUser.fullName + "</h2>" + "<p>ID: " + this.currentUser.id + "</p>" + "<p>Email: " + this.currentUser.email + "</p>";
        }
        return this;
    },

    displayUser: function() {
        if (!this.currentUser) return;
        console.log(this.currentUser.viewData);
    }
};
userController.findUser("test2@test2.com").formatName().createLayout().displayUser();

{% endhighlight %}
