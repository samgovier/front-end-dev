Javascript Language Basics

JS examples in [epc.js](../epctsjs/epc.js)

JS Overview
===
JavaScript is a lightweight, loosely-typed, object-based, interpreted language created by Netscape in 1995. Interestingly, it has very little to do with Java, though both were released in the same year. They share names to piggyback off the marketing of the other.

We're learning JS on an older EMCA-Script version because IE11 supports only 5 and earlier... so there are newer things you may be missing that you can get in newer versions. The latest release is version 10, we're doing version 5...

Whatever.

This will only cover JS as a programming language. You can also use JS for other things, such as:  
1. __Client Browser Scripting__  
Typically Javascript runs in client browsers to make the page dynamic. Common uses include validating user input, altering page content, and async communication with the web server via Ajax requests. Further reading:  
[Document Object Model (DOM)](http://www.w3schools.com/js/js_htmldom.asp)  
[Browser Object Model (BOM)](http://www.w3schools.com/js/js_window.asp)  
  
2. __Web Server Scripting__  
Although traditionally used for client scripting, JS can also be used for web server scripting via [NodeJS](https://nodejs.org/en/about/)

3. __[Windows Script Host](https://docs.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/windows-scripting/9bbdkx3k(v=vs.84)?redirectedfrom=MSDN)__  
Technically. There's probably many other applications.

Interactive JS Commands
---

Simple scripts can be created using the following functions. They'll be often used here so they're good to know.
* `prompt(message,def)`: Present the user with a popup asking for string input, returning the string. `message` is the prompt, `def` is the default response.
* `document.write(text)`: Write text to HTML of the page.
* `alert(message)`: Display a message to the user in a popup
* `console.log(message)`: Write a message to the console

Basic Syntax
---

Similar to other C languages:
* Keywords are *case sensitive*
* White space is ignored, so make your code *readable*
* File size affects download time, though there are tools to compress JS files.
* Commenting is exemplified in the epc.js document.
* Statements end with `;`, blocks contained with `{}`

Data Types
===
There are 5 primitive types: __Boolean__, __Number__, __String__, __null__, and __undefined__.  
There are 2 composite types: __Object__, __Function__.  
Additional composite types are defined as object extensions, such as __Array__, __Date__.  

The `typeof` keyword/operator is used to determine the type of a value or expression.

Boolean
---
True and false, pretty simple.

Number
---
64-bit floating point number. By default numbers are in decimal, but other forms are possible as well:
* Hexadecimal notation, such as 0x##, 0xFF
* Exponential notation, ie. #e# (4.18e10)
* __NaN__ is a specific value for "Not a Number". To test, use the __isNaN__ function
* __Infinity__ is a special value representing positive infinity. To test if a number is both finite and not __NaN__, use __isFinite__.

Unlike other numbers, you cannot rely on equality for NaN tests, ie. `NaN == NaN` is false. you must use the testing functions.

String
---

A string is an immutable zero-based array of Unicode characters, each taking two bytes of space. String literals can be enclosed in single or double quotes. Single quotes take every character literally, otherwise double quotes should be used, where variables are respected and other characters must be escaped. Escape with `\<char>`.

Undefined and Null
---

A variable that has been declared but not initialized is __undefined__, as will an object property that doesn't exist. __null__, however, represents the absence of data. It must be explicitly assigned.

Object, Array, Function
---
__Object__: unordered collection of values  

    var obj = {key1:val1, key2:val2, ..., keyN:valN};

__Array__: ordered collection of values

    var ary = [val1, val2, ... , valN];

__function__: line-delimited collection of executable code

    var func = function() { /* code */ }

Type Conversion
---
Any basic type can be converted to any other basic type without error. The following describes the most common conversions.

To String
---
You can get a string by:
* `String()` standalone function converts
* `toString()` method on objects or functions
* concat a value/expression to a string

String to Number
---
You can parse numbers by:

    n = s – 0;  // If s="2", then 2 is returned.  If s="2two" then NaN is returned
    n = Number(s); // must be a base 10 number, may have whitespace, no alpha
    n = parseInt(s); // parse integer number from beginning of string
    n = parseInt(s,base); // parse integer using base provided
    n = parseFloat(s); // parse integer or float number from beginning of string

Boolean Conversion
---
* To convert a value in `x` to Boolean, `Boolean(x)` or `!!x`.  
* Number to Boolean: `true` unless `0` or `NaN`  
* String to Boolean: `true` unless empty string  
* Objects to Boolean: `true` unless null or undefined

Type Handling
---
* Strings are immutable, you must create a new one.
* Numbers & Booleans are handled by value
* Objects & Arrays are handled by reference

Variables
===

Variable identifiers should be whole word, start with a letter, _ or $. They are case-sensitive and some words are reserved.

Variables in JS have a *loosely typed* storage location, which will auto-convert between types. In JS, `var` is used to explicitly declare a variable. If no initial value is given, the variable is undefined. When you assign, it will create the variable __*globally*__. Generally this is not desirable, so don't do it often. (??)

Reading a non-declared variable throws an error, reading undefined variables gives undefined. You should always declare a variable before use.

Scope
---
* Global variables, defined anywhere outside of a function, have global scope
* Local variables, defined in a function, are available in a function
* Local variables are automatically [hoisted](http://www.w3schools.com/js/js_hoisting.asp) to the top of the function in which they're defined. This means they can be used before definition.
* functions can be nested and each have their own scope.
* Scope is defined at the function level only. There is no block level scope.
* __You should__ declare all variables at the top of the function, so that the code is read as it would execute.

Garbage Collection
---
Strings, Objects, Arrays use dynamic memory allocation. JavaScript automatically garbage collects when a variable will never be used again

The Global Object
---
Created when the interpreter starts, all variables are properties of the global object. Keyword `this` at the top level refers to the global object.

Operators
===

All the same. Just gonna write the Conditional Operator here for practice. More compact than if statement.

    booleanExpr ? trueValue : falseValue

Other operators:
* `new Constructor(arguments)` : you know
* `typeof x` : Returns the type of x
* `void x` : ignores x and evaluates to undefined
* `, // comma` : evaluates expressions from left to right and return value of rightmost expression

Oh, I guess the last thing... JS and TS both have this differentiation where a c#/powershell `==` acts more like a `===`. The rules of `==` in ECMA 5: [The Abstract Equality Comparison Algorithm](http://www.ecma-international.org/ecma-262/5.1/#sec-11.9.3)

I'm not gonna do conditionals, except to say that switches don't require breaks, and so can go through to other cases. Don't forget your breaks!

Global Object
===
The global object is a storage location for variables and functions that are available anywhere, "globally". This includes those that are built into the language or the environment. Although the global object is inferred in many contexts, it also have a name that may vary from one execution environment to the next.
* In a web browser, it is often called `window`
* In Node.js, it is called `global`
* Outside a function, `this` refers to the global object

__Global Properties__: `Infinity`, `NaN`, `undefined`

__Global Functions__:
* `eval(code)`: Evaluates a string of JS and returns the result. Note that eval should only be used when absolutely necessary.
* `isFinite(x)`: Returns true if x is not NaN or +/- infinity
* `isNaN(x)`: Returns true if x is the value NaN
* `parseFloat(s)`: Returns parsed number or NaN if not a valid number
* `parseInt(s, [base])`: Converts a string to an integer, defaulting to a base 10 (or 16 if string starts with 0x or 0X, or 8 if the string starts with a 0, but not followed by an x). Returns parsed number in the specified base, or NaN if the number is not a valid integer.

__*Other* Global Objects__:  
Properties that are constructor functions for predefined classes.
* General Constructors: __Array, Boolean, Date, Function, Number, Object, RegExp, String__
* Error Constructors: __Error, EvalError, RangeError, ReferenceError, SyntaxError, TypeError, URIError__
* Exception is __Math__ which is an object reference (a.k.a., a module or static class), not a constructor. In other words, you cannot create a new instance of Math.

Objects
===
In Javascript, an __Object__ is an unordered collection of named values, also called properties. Object class is a base class.

Object Literals
---
    var obj1 = { property1: value1, property2: value2, ... };
    // or
    var obj2 = { "property1": value1, ... };
    // or
    var objEmpty = {};

* In the case of obj1, the properties must be valid identifiers
* In the case of obj2, the properties can be any string

In general, Object Literals are preferred over `new Object()` constructor.

Properties
---
Accessing a property depends on the design. For obj1, you would use `obj1.property1`. for obj2, you would use `obj2["property1"]`.

Operators
---
`str in obj`: Returns true if str is the name of a property in object obj. Includes properties in the prototype.
See the Classes section for more details on the prototype.

`delete obj.propName`: Returns true if the property propName was deleted from object obj. If property does not exist, returns true.
This isn't a typo, they both return true. There are some properties (some global functions) that you are not allowed to delete... which can cause delete to return false.

`obj instanceof className`: Returns true if obj is an instance of className, where className is the name of the constructor function

For In Statement
---
Acts kind of like `foreach`.

    var variable;

    // loop through properties of an object
    for (variable in object)
    {
        // code
    }

Object Methods
---
All objects have the following methods:
* `obj.hasOwnProperty(propName)`: Returns true if obj has a non-inherited property with name propName. Does not look to the prototype.
* `obj.isPrototypeOf(object)`: Returns true if obj is the prototype of object.
* `obj.propertyIsEnumerable(propName)`: Returns true if obj has a non-inherited property with the given name and that property is enumerable (will be included in a for/in loop).
* `obj.toLocaleString()`: Returns localized string representation of obj, may be overridden.
* `obj.toString()`: Returns string representation of obj, may be overridden.
* `obj.valueOf()`: Returns the primitive value of obj, if any, may be overridden.

JSON
---
Lastly- JSON is a subset of object literals. It contains no functions, and all keys must be enclosed in quotes.

Arrays
===
Constructors
--
* `new Array()`
* `new Array(size)`
* `new Array(e0, e1, e2, ...)`
* Or just: `var a = [e1, e2, e3, ...]`

One property: `a.length`  
Operators: `a[index]`, `delete a[index]`

Arrays in Javascript are sparse: so any un-set element is undefined. Size is not fixed. This means the length property can bloat, as well: if you store in a random bigger number, the length will go to there, even though the other values are all undefined.

The Array properties don't have to be integers. The keys can be strings (so basically auto-convert to dictionary).

Jagged Array
---
A *Jagged Array* is an array of arrays. It's jagged because the column size can vary, so it's not quadrilateral.

Array Methods
---

    a.sort([sortOrderFunction]) // string order by default

* Specify sortOrderFunction to change order.
    * A sort-order function takes two parameters and returns an integer
    * If the result is negative, then the first parameter should be earlier in the array
    * If the result is 0, then the two parameters are equivalent in terms of sort order
    * If the result is positive, then the second parameter should be earlier in the array

.

    a.indexOf(searchElement, [fromIndex = 0])

    a.lastIndexOf(searchElement, [fromIndex = a.length - 1])

    a.forEach(callback, [thisArg]) // executes a provided function once per array element
    a.every(callback, [thisArg]) // tests whether all elements in the array pass the test implemented by the provided callback

.

    a.concat(e1, e2, ...)
    a.reverse()
    a.slice(start, [end]) // returns a new array with elements from start but not including end
    a.splice(start, deleteCount, [value1], [value2], [...]) // deletes zero or more elements starting with start
    a.filter(callback) // creates a new array with all elements that pass the test implemented by the provided function

.

    a.join([separator])
    a.toLocaleString()
    a.toString()
.
Stack and Queue Methods

    a.pop()
    a.push(value)
    a.shift()
    a.unshift(value)

Functions
===
Info:
* Defined once, execute whenever
* Can be assigned to variables or passed as parameters
* Automatically hoisted to the global namespace, unless defined within another function (in which case it's hoisted to the top of the parent function)
* May be unnamed (anonymous)
* Parameters and return value are optional

Function Definition
---
    function funName(param1, param2, ...)
    {
        // code
    }

Function Literal
---
    var funVar = function (param1, param2, ...)
    {
        // code
    }

Named Function Literal
---
Same as literal, but the function has a name in the call stack:

    var funVar = function Epic$Namespace$FunctionName(p1, p2, ...)
    {
        // code
    }

Function Calling
---
* Use () to invoke
* Extra Arguments are passed via special *arguments* objet. See more below
* Unspecified arguments are undefined as a value
* Data types aren't check. You must check in function code

Arguments Object
---
Exists within a function body as `arguments`. It has numbered properties that behave as an array. It allows for arbitrary number of arguments to a function.

    arguments[n] // n-th argument passed
    arguments.callee // reference to the currently executing function
    arguments.length // you know ;?

Function Properties
---

    func.length // number of named parameters declared vs. arguments.length, number of args sent
    func.prototype // defined when func is a constructor. It's a template for a class of objects

Function Methods
---

    func.apply(obj, argsArray) // invokes func as if it were a method of obj, passing in the arguments contained in argsArray. Within func, this refers to obj.
    func.call(obj, arg0, arg1, ...) // same as apply, but args are individual instead of an array
    func.toString() // returns a string representation of the function. By default this is just the code of the function

About Functions
---
* Scope is lexical, not dynamic: it exists when it's defined, not executed
* Call object is created when the function is called and added to the front of the scope chain
    * Call object is used during the body of a function: All function parameters & local variables are properties of the call object, including `arguments`
* Execution Context is in which any piece of code executes. Uses the global object and the call object to get variables, along with the scope chain to search for variables
* Functions may be nested: inner has access to outer, but not the other way around. It's also not accessible outside it's definition scope
* Look up [closures](http://www.jibbering.com/faq/notes/closures/)...

Function Binding
---
The process of deciding with `this` is is called __function binding__. When a function is a property of an object and that function is invoked from the object, the function becomes bound to the object, giving you access to the containing object via this.

Depending on the context in which the function is invoked, `this` may refer to an object other than it's origin. This can cause confusion for new developers, because `this` will not contain what you're expecting in some cases. Eg. an HTML element may call the function, and in that case `this` refers to the element and not the original object.

This can be corrected by creating a "wrapper function" that ensures the function is invoked by the correct object. However, this may cause issues if any arguments are meant to be passed: they'll be lost in translation. In this case, we'd want to use the `.apply()` method to pass any arguments... this gets verbose though.

The Microsoft Ajax framework adds a class method to the Function class to make this easier, named `createDelegate`. I would maybe look this up when you need it.

Error Handling
===
