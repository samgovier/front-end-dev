Typescript Stuff

TS examples in [epc.ts](../epctsjs/epc.ts)

Typescript Overview
===

Typescript is a superset of JS that is strongly typed, which helps bugs be detected at compile time. To ensure it is compatible anywhere JS is supported, it is transpiled ("compiled" from one high level language to another) to ECMAScript-standard JS before deployment.

Typescript supports variables beyond its ECMA version: eg. `let` was not included in ECMAScript until version 6, so TS must find a workaround when targeting version 5 or earlier.

For example, the code in ECMA 6 and TS can be this:

    let a = 1;
    if (true) { let a = 2; }

But the emitted JS in ECMA 5 would look like this:

    var a = 1;
    if (true) { var a_1 = 2; }

Debugging on the client
---

Even though the browser is executing JS, debugging in TS is done when using browser developer tools, like in Chrome.

This is done with a `js.map` file, like this one:

    {"version":3,"file":"app.js","sourceRoot":"","sources":["app.ts"],"names":["Epic","Epic.Training","Epic.Training.Example","Epic.Training.Example.Car","Epic.Training.Example.Car.constructor","Epic.Training.Example.Car.drive"],"mappings":"AAAA,IAAU,IAAI,CAMb;AAND,WAAU,IAAI;IAACA,IAAAA,QAAQA,CAMtBA;IANcA,WAAAA,QAAQA;QAACC,IAAAA,OAAOA,CAM9BA;QANuBA,WAAAA,OAAOA,EAACA,CAACA;YAChCC;gBAAAC;gBAIAC,CAACA;gBAHOD,mBAAKA,GAAZA;oBACCE,OAAOA,CAACA,GAAGA,CAACA,SAASA,CAACA,CAACA;gBACxBA,CAACA;gBACFF,UAACA;YAADA,CAACA,AAJDD,IAICA;YAJYA,WAAGA,MAIfA,CAAAA;QACFA,CAACA,EANuBD,OAAOA,GAAPA,gBAAOA,KAAPA,gBAAOA,QAM9BA;IAADA,CAACA,EANcD,QAAQA,GAARA,aAAQA,KAARA,aAAQA,QAMtBA;AAADA,CAACA,EANS,IAAI,KAAJ,IAAI,QAMb;AACD,IAAI,KAAK,GAAG,IAAI,IAAI,CAAC,QAAQ,CAAC,OAAO,CAAC,GAAG,EAAE,CAAC;AAC5C,KAAK,CAAC,KAAK,EAAE,CAAC"}

In order for this debugging to work, you need the executed .js, the original transpiled .ts, and the .js.map file.
__However__ if the file is being minified via deployment (.min.js), this invalidates .js.map and debugging is not possible.

Using JS with TS
---

TS allows for type declaration files (`.d.ts`). Think of this as a header file for the following purposes:
1. Providing type information for JS code so that TS code can be written against it.
2. Sharing type info for TS code from a given project so that other projects can use it as well.
3. Providing additional type info, through interfaces and generic parameters, that result in more strongly typed consuming code.

Typescript uses type declaration files to augment standard JavaScript classes and DOM objects with type information. There is a special file included with TypeScript named `lib.d.ts` explicitly for this purposes. For example, `parseInt` is included to make it strongly typed:

    /**
    * Converts A string to an integer.
    * @param s A string to convert into a number.
    * @param radix A value between 2 and 36 that specifies the base of the number in numString.
    * If this argument is not supplied, strings with a prefix of '0x' are considered hexadecimal.
    * All other strings are considered decimal.
    */
    declare function parseInt(s: string, radix?: number): number;

Not going to go in great deal here because in lots of cases, they are generated for you. It's not uncommon to have these files written for JavaScript as well, because unnecessarily rewriting JS into TS is a waste of time. In general, type declaration files are placed in a common, shared path so they are easy to find without needing to hunt down the source *.ts file.

Basic Syntax
===

Data Types
---

Because Typescript is a superset of JS, all JS data types are available. Boolean, Number and String are also available via their respective keywords (`boolean`, `number`, and `string`), which are preferred.

New types!
* __any__ - A type keyword that disables type checking for the variable.
* __unknown__ - A type keyword that forces assertion to a different type before the value can be used.
* __enum__ - Represents one of a predefined set of named values.
* __void__ - Used with functions to indicate that the function does return but has no value.
* __never__ - Use when a function won't return, e.g.:
    * A function is called that throws an exception
    * A function is called that starts an infinite loop

Controlling variable scope
---
With `var`, scope is hoisted to include the entire context scope, which is either the containing function or global scope. TypeScript also supports `let`, which is block-scoped: `let` is only available within the closest containing block (`{}`). `var` is kind of yikes... let's use `let` whenever possible.

Declaring typed variables
---
To declare a typed variable:

    let identifier[: type][ = initial value];

The type declaration and initialization are both optional. By default a variable without a type *and* without an assigned expression will have the type `any`.

    let myVar; // Type is any implicitly
    let myVar: any; // Type is any explicitly
    let myVar: string; // type is string :)

You can declare types for function variables, params, and return types, as well as fields, properties, and constants.

Once a type variable has been declared, only values that are *assignment compatible* can be assigned. If an incompatible value is assigned, there will be a compiler error. Although, TypeScript is more permissive than other OOP languages. [Rules.](https://github.com/Microsoft/TypeScript/blob/master/doc/spec.md#3114-assignment-compatibility)

!! `any` should only be used when necessary, and explicitly declared. There is an option to set a flag on the compiler to prevent implicit typing.

If you don't include a data type in your declaration but assign a value, the type will be inferred:

    let myVar = 1; // myVar is inferred to have type `number`

While it may seem safer to declare type, the opposite is actually true: version updates to TypeScript and public API return types can cause explicitly typed code to be fragile, so it is often better to infer type.

Declaring Parameter and Return Types in Functions
---

Declaring TypeScript functions is just like JS functions, but with explicit typing for parameters.

    function compareNumAndString(numVal: number, stringVal: string): boolean
    {
        return numVal.toString() === stringVal;
    }

If a function doesn't return a value, you can use `void`

    function doWork(): void
    {
        // no value returned (return statement optional)
        return;
    }

You should explicitly assign return types: if you infer them APIs are more fragile and the consuming code is harder to read.

Arrays
---

TS arrays can be declared to contain a specific type:

    let myArray: number[];

Don't let the bracket notation fool you though: it's still a JavaScript array, so it has all the weirdness of being a sparse, dynamically sizable array.

__Using `for-of`:__  
Recall JS has `for-in`: TypeScript also supports `for-of`, which iterates over the elements of an array, rather than keys. You can also use this to iterate over the characters of a string! If you try to use `for-of` on something that isn't an array or string, you'll get a compiler error. Objects cannot be iterated in this way.

In TS if you try `for-in` on a string will throw a compiler error: you need to assert type `any` on the variable to get away with this.

Constants
---
To declare a constant, use `const`:

    const myConst[: type] = value;

This imposes two restrictions: the variable must be initialized when declared, and it cannot be changed after initialization. If the constant is a reference type, like an object or function, the reference cannot be altered to point at a different instance. Properties of that instance can still be altered, though.

    const greeting = ["Good", "day", "to", "you"];
    greeting = ["a", "b", "c"]; // compiler error
    greeting[0] = "Fair"; // legal
    console.log(greeting);

Enums
---
Enums are the same as other C-style languages, but in TS enums are permitted to have non-integer numeric-values and strings. eg.

    enum Constants
    {
        e = 2.71828,
        pi = 3.14159
    }

    enum RomanNumerals
    {
        One="I",
        Two="II"
    }

Look up value with Constants.pi, look up key with Constants[3.14159]

if you don't need the enum for anything beyond traditional C-style usage, declare it as a `const enum`. This results in each instance replaced with the numeric equivalent, which is significantly more efficient than a standard enum.

Allowing Multiple Types
---

### Union Types

If a variable can have multiple types, declare it with a *union type*, declared using the pipe `|`. Here, myVar can be string, number, or boolean:

    let myVar : string | number | boolean;

A union type may be any data type. There is no technical limitation to the number of union types, but it can get over the top. If you define a certain set often, you can define a type alias, covered later.

Instance members accessible to a union type depends on whether the compiler can determine the type. When a value is initialized, the variable can access all members of its current value. If the compiler cannot determine a data type, the variable only has access to the subset of members that all types can access. There are also *intersection types* but we won't cover them here, if you need them for the future you can read [here](https://github.com/Microsoft/TypeScript/blob/master/doc/spec.md#35-intersection-types).

### Type Guardrails

Typescript detects the use of `typeof` and `instanceof` and automatically performs the appropriate type assertion on the tested variable within the following code block. The feature is known as a *type guard* and prevents compile errors because within the block, the compiler knows exactly what data type the variable is, based on the test. The type guard will also ensure you're only accessing members available to the chosen type.

    let test: any = 8;
    if (typeof test === "number")
    {
        /* Using Number.prototype.toExponential(), as if test
        were a number, even though its type is declared as any */
        console.log(test.toExponential());
    }

    let test2: Object = ["a", "b", "c"];
    if (test2 instanceof Array)
    {
        // Using Array.prototype.join(), as test2 is an Array per the test
        console.log(test2.join("; ));
    }

    let test: any = 5;
    if (typeof test === "number")
    {
        console.log(test.charAt(0)); // compiler error: number don't have charAt()
    }

### Union Types and Type Guards

Type guards are especially convenient when paired with union types, because they can narrow possible types in the else branch of an if/else.

Consider a type guard against an `any` variable.

    var myVar: any = "String";
    if (typeof myVar === "string")
    {
        console.log(myVar.charAt(0));
    }
    else
    {
        console.log(myVar.toExponential(2)); // compiler sees myVar as type any
    }

In this case, myVar could be anything other than string, so the compiler can't limit the type to something more specific.

    var MyVar: string | number = "This is a string";
    if (typeof myVar === "string")
    {
        console.log(myVar.charAt(0));
    }
    else
    {
        console.log(myVar.toExponential(2));
    }

In this case, the compiler determines the variable must be a string and so marks the else branch as unreachable. This is true for a function return value as well, like if I have `= returns String();`.

If it isn't clear at compile time which type the function will return, the type guard will narrow the type for us:

    var myVar: string | number = returnsStringOrNumber();
    if (typeof myVar === "string")
    {
        console.log(myVar.charAt(0)); // definitely a string
    }
    else
    {
        console.log(myCar.toExponential(2)); // definitely a number, since I know not `never` type
    }

### User-defined type guards

You can also create specially defined functions as a *user-defined type guard*. This allows for additional type-guard expressions beyond __typeof__ and __instanceof__. This is useful when you have a union type, *any* type, JS objects, and you want to branch based on the variable's characteristics. THe user-defined type guard returns a boolean as `argumentName is SomeType`, indicating the argument matches Some Type. This is a function return type. For example:

    function isStringArray(arg: Object): arg is string[]
    {
        if (arg instanceof Array)
        {
            for (let element of arg)
            {
                if (typeof element !== "string")
                {
                    return false;
                }
            }
            return true;
        }
        return false;
    }

In the code body, the return type is boolean, asserting the argument is or isn't the type we're checking. However, user-defined type guards should be used sparingly-- in general, their use is considered as a warning that code may be unnecessarily complex or fragile.

### Unknown

The type `unknown` is useful as a replacement for `any`. Unlike any, which disables type checking, `unknown` forces the programmer to cast or guard to a specific type.

Asserting Type
---

Occasionally you may need to tell the TS compiler that a variable is of a different type than the compiler thinks it is. This is known as *type assertion*. However, doing so can lead to compile or run-time errors if the type assertion is not correct. This can be done via the `as` keyword.

    varOfNewType = varOfOldType as NewType;

Every assertion is either *illegal, incorrect, or correct*.

### Illegal

A type assertion is illegal if a value of the original type could not possibly be assigned to a variable of the new type. Keep in mind that an assertion is deemed illegal based on the variable *type*, not the *value* itself.

    let myString = "abc";
    let myNum = myString as number; // compiler error
    myString = "123";
    myNum = myString as number; // still compiler error

### Incorrect

If the value assigned is assertable, but doesn't make sense, the assertion is legal but incorrect.

    let myVal: any = "abc";
    let myNum = myVar as number; // legal, but incorrect: no compile error

The above assertion is legal because the compiler considers `any` typeless. But the assertion is incorrect, because it doesn't make sense given the value. This assertion only matters at run time, when you try to use the new value in an incorrect way. This most commonly arises when trying to access a property on the asserted type but not the runtime value:

    console.log(myNum.toExponential(2)); // runtime error: "abc" doesn't have that method

### Correct

A type assertion is correct if it's not illegal or incorrect. No errors.

Aliasing Types
---

You can declare aliases for any types: useful for encapsulating union types.

    type AliasName = Type1 | Type2 | Type3;

    //eg
    type Nos = number | string;

    let myVal1: Nos;
    let myVal2: Nos;

In the case of Objects, interfaces tend to be more flexible (eg. `IEnumerable`).

Null and Undefined
---
There is a compiler flag in use here that recognizes `null` and `undefined` as distinct, declarable data types, rather than sub-types of each other. This means a variable can only be one of those values if they're explicitly allowed to be so. Eg:

    let myString: string = "abc";
    let myNullableString: string | null = "def";
    let myNullUndefString: string | null | undefined = "ghi";

    myString = null;  //compiler error

    myNullableString = null;
    myNullableString = undefined;  //compiler error

    myNullUndefString = null;
    myNullUndefString = undefined;  //no errors

Most variables shouldn't use these types so they can't be unset. If a variable does need to be unset, you should use `undefined` because it is the default state.

There are two ways to make variables `undefined`: either in the variable definition with `| undefined`, or with the `?` operator, which is used for Class member variables or function parameters.

Handling null and undefined really depends on the usage. In cases you may want to detect if the value is null-ish (null or undefined) or false-ish (null-ish, "", 0, `false`, etc.)

For:

    function myFunction(val: object | boolean | undefined): void 
    {
        <Code>
    }

| How handled                   | Content of `code`                             | Result                                                    |
|---|---|---|
| Ignored                       |`console.log(val.toString);`                   | `Compile error: object is possibly undefined`             |
| Non-Null assertion (`!`)      |`console.log(val!.toString);`                  | Works for all values, but runtime error on `undefined`    |
| Optional Chaining (`?`)       |`console.log(val?.toString);`                  | Works for all values, `undefined` => "undefined"          |
| Default if false-ish (\|\|)   |`console.log((val \|\| "default").toString());`  | Works, `undefined` & `false` => "default"                 |
| Default if null-ish (`??`)    |`console.log((val ?? "default").toString());`  | Works, `undefined` => "default"                           |
| Type Guard                    |`if(typeof val !== "undefined") {c.l(val);}`   | Works fully, undefined skips the block                    |

Commenting Code
---
You can do `//` single-line comments and `/* sdf */` block comments.

### JSDoc Comments

XML-style comments cannot be used for intellisense documentation in TS. Instead, we use [JSDoc](https://en.wikipedia.org/wiki/JSDoc), which is similar to Javadoc in Java.

    /**
     *   Description of the entity that immediately follows
     *   this comment
     */

Almost everything can be documented using JSDoc comments:
* Namespaces
* Classes
* Interfaces
* Enum types
* Members of the above options
* Function/method parameters

You can use *@param* to describe parameters.

Functions
===

A function is the equivalent of a class method. The can also exist class-independent. Functions have been made more flexible in TS from JS.

Anonymous Functions
---
In Typescript, anonymous functions can be created with the `function` keyword or using *fat arrow* syntax:

    (signature) => { code body; }

for example, you could pass a callback to an array's forEach method.

    ["a","b","c"].forEach( function(item: string) { console.log(item); } );
    // OR
    ["a","b","c"].forEach( (item: string) => { console.log(item); } );

While these might seem the same, there is a slight difference: arrow functions capture `this` where the function is created, rather than where it's invoked. It's important to be careful about when which is used.

Type-Safe Signatures
---

There are times when you want to declare a type name for particular function signatures. This can be done using *declared signatures*. This is essentially a function type you can add to a variable. This can be done anonymously, but we should explicitly declare our function using this unique `interface` declaration.

    interface MyMath
    {
        (baseVal: number, increment: number): number;
    }

After declaring the signature, we can only assign a function with a compatible signature. We can declare many variables of type `InterfaceName` (`MyMath`) without having to recreate the full signature each time.

    const myAdd: MyMath = function(x: number, y: number) { return x + y; }
    const mySubtract: MyMath = (x: number, y: number) => { return x - y; }

It is not recommended to use an anonymous function signature, because you have to re-declare the entire signature again, which kind of defeats the point.

    // BAD
    const myAdd: (baseVal: number, increment: number) => number;

Optional Parameters
---

In JS, all function parameters are technically optional. This makes functions flexible but it's also impossible to tell at a glance which are required and which aren't:

    function myFunc(a,b,c,d,e)
    {
        //is a required? b? c?
    }

In TS, every parameter is required, unless you explicitly declare it as optional. You can do this by including a `?` immediately after the parameter name, before its data type. They must be after any required parameters.

    function myFunc(a: string, b?: string)
    {
        if (b)
        {
            // use b
        }
        else
        {
            // no use b
        }
    }

Default Parameters
---

We still need to explicitly check whether an optional parameter has a value before using it. Instead, we can assign a default value. This can be done via a *default parameter*, which is automatically optional:

    function myFunc(a: string, b: string = "ABC")
    {
        // a has the value passed by the caller
        // b has either the value passed or "ABC"
    }

Of course, the type doesn't have to be explicitly declared; it is often inferred from the default value:

    function myFunc(a: string, b = "ABC") {}

Arbitrary Number of Parameters
---

In C#, you can define a method that accepts any number of parameters with the `params` keyword. TS has something similar by way of an ellipses, `...`, also known as a __spread__ operator. You define this before the variable, and it's called a *rest parameter*.

Let's say you want to create a function that accepts an arbitrary number of string arguments, concatenates them together, and returns the result:

    function buildSentence(firstWord: string, ...otherWords: string[]): string
    {
        const allWords = [firstWord].concat(otherWords);
        return allWords.join(" ");
    }

Because a sentence requires at least one word, the first parameter is required, but the rest are optional. You can now call `buildSentence` with one or more string arguments:

    buildSentence("Buffalo", "buffalo", "Buffalo", "buffalo", "buffalo.");

Some things to remember:
* A function can only have one rest parameter, and it must be the last, even after optional parameters.
* A rest parameter can't be assigned a default value, so your body should always check for values.
* The arguments passed for a rest parameter transpile to a normal JS array.

The __spread operator__ can be used when building, and generally:

    const allWords = [firstWord ,...otherWords];

When invoking a function, you can also use the spread operator to pass an array of values to a rest parameter:

    const otherWords = ["is","a","day","in","the","life","of","a","bear."];
    const sentence = buildSentence("This", ...otherWords);

Allowing Unused Parameters
---

Sometimes you may want to define a function that accepts some number of parameters but the code body doesn't actually use them all. If the `--noUnusedParameters` compiler flag is set, this will result in a compiler error. You can tell the compiler to ignore unused parameters by prefixing them with an underscore.

### Delegate Functions

Often, the signature of delegates is determined by where they are used. For example, `Array.forEach()` method expects a function with up to three parameters:
1. The __value__ this iteration
2. The __index__ this iteration
3. The __array__ being iterated through

Unused trailing parameters can be omitted, but unused leading parameters must be prefixed with an underscore to avoid a compile error.

Overloading Functions
---

Overloading a function or method provides calling code with multiple ways to invoke your API while minimizing the amount of code that you'll need to repeat. TS supports overloading, *kind of*. It's very different from common OOP languages. In other OOP languages, you have multiple implementations, but in TS you have multiple function declarations, and one implementation.

TS doesn't allow us to define multiple functions with the same name. Instead, we have to handle all possible argument types of any defined overloads.

To take advantage of type safety, we can add multiple function signatures that specify the only legal calls for a function. IntelliSense follows these rules. So we must first give the signatures, then the implementation itself. Here's a full implementation for the flexible function `pickCard()`:

    /**
    * Given an array of cards, choose one at random.
    * @param deck An array of cards to choose from
    */
    function pickCard(deck: Card[]): number;

    /**
    * Picks the selected card from a full deck
    * @param cardNum The number of the card to pick
    */
    function pickCard(cardNum: number): Card;

    /**
    * These comments won't show up in IntelliSense.  
    * This method will be called via one of the previous
    * declarations, so that documentation is sufficient.
    */
    function pickCard(deckOrCardNum: Card[] | number): number | Card 
    {
        if (Array.isArray(deckOrCardNum)) 
        {
            const myCard = Math.floor(Math.random() * deckOrCardNum.length);
            return myCard;
        }
        else if (typeof deckOrCardNum === "number") 
        {
            const pickedSuit = Math.floor(deckOrCardNum / 13);
            return new Card(pickedSuit, deckOrCardNum % 13)
        }
        throw new Error("pickCard only accepts Card arrays and numbers.");
    }

When you overload a function and provide overload signatures, a function call must match one of those signatures, *regardless* of what the implementation signature allows. For example, with the below signature and function, only the number call is legal because it's the only provided signature.

    function test(val: number): void;
    function test(val: number | string): void 
    {
    console.log(val);
    }

TS does code flow analysis, and so it needs to reliably represent functions that will never return. `never` is the type for this.

The main use case for `never` is to account for code paths that can happen in JS and not in TS.

Let's say you have a public API `isNumber` to determine if a string or number is valid and finite:

    function isNumber(val: string | number): boolean
    {
        if (typeof val === "string")
        {
            return isFinite(parseInt(val,10));
        }
        else if (typeof val === "number")
        {
            return isFinite(val);
        }
    }

In TS it isn't possible to call `isNumber` with anything other than the specified types, but if you are creating a library that can be used for both JS and TS, you might distribute the emitted JS code:

    // JS code for isNumber
    function isNumber(val)
    {
        if (typeof val === "string")
        {
            return isFinite(parseInt(val,10));
        }
        else if (typeof val === "number")
        {
            return isFinite(val);
        }
    }

In this case you could call isNumber with any data type, and the result would be undefined. In TS you could also force this, technically, with a variable of type `any`.

Suppose you have a function for throwing an exception:

    function logAndThrowError(message : string): void
    {
        console.log("Log: " + message);
        throw new Error(message);
    }

You could call this function at the end to throw an error, but there is still a problem, because the compiler sees this as no valid return. Therefore, we would want to make the function type `never` instead of `void`, to show that it never finishes.

    function logAndThrowError(message : string): never
    {
        console.log("Log: " + message);
        throw new Error(message);
    }

This avoids this message: `Function lacks ending return statement and return type does not include 'undefined'.`

    function isNumber(val: string | number): boolean 
    {
    if (typeof val === "string") 
    {
        return isFinite(parseInt(val,10));
    } else if (typeof val === "number") 
        {
        return isFinite(val);
    }
    logAndThrowError("isNumber only accepts strings and numbers");
    }

Object Types
===

An __object type__ is a custom data type that describes an object's "shape". When compared to untyped variables, object types make code easier to read, reuse, and type-safe. Classes are one example of an object type: in TS, we prefer __interfaces__ over classes for efficiency reasons.

Anonymous Object Types vs. Interfaces
---

To declare an anonymous object type, you describe the object's shape at variable declaration.

    let myEmployee: { name: string, id: number, attendMeeting(location: string): void };

The variable myEmployee can reference only objects with those two properties and that method with matching signature. You can't have extra either.  
But of course this is not advantageous because it's unnamed, so you must redefine it if you want to use it elsewhere. In which case, it should be declared as an interface instead.

    interface IEmployee
    {
        name: string;
        id: number;
        attendMeeting(location: string): void;
    }

You can then declare multiple variables of this type without redefining the object shape each time.

    const emp1 : IEmployee = { name: "Michael", id: 1, attendMeeting(location: string): void {} };
    const emp2 : IEmployee = { name: "Gob", id: 2, attendMeeting(location: string): void {} };

Optional Properties
---
Normally all properties are required: to make a property optional, add a `?` after the property name:

    interface IPerson
    {
        name: string;
        nickname?: string;
    }

Read-Only Properties
---
IF a property is declared as __readonly__, it can't be assigned a value after the object is created. For example:

    interface IPerson
    {
        name: string;
        readonly id: number;
    }

Index Members
---
Interfaces can also contain index members, which represent an arbitrary number of properties with a certain index type and value type. The valueType must be either `string` or `number`, and not union type.

    interface IName
    {
        [indexName: indexType ]: valueType;
    }

    // Eg
    interface ICoworkerArray
    {
        [id: number ]: IEmployee;
    }

1. Objects may contain any number of properties with the given index type that reference the given value type.

        const coworkers: ICoworkerArray = {
            A123: { name: "Bob", id: "A123" },
            B456: { name: "Bill", id: "B456" }
        };

        coworkers.favoriteCoworker = coworkers.A123;

2. Every property indexed by the given index type must return the corresponding value type.

        // compile error: 5 is not IEmployee
        const coworkers: ICoworkerArray = { averageTenure : 5 }

        // this is true for the interface definition as well

        interface ICoworkerArray
        {
            [id: string ]: IEmployee;

            favoriteCoworker: IEmployee; //OK! indexed by string and returns a string, so it matches the index member

            longestTenure: number;    //compiler error! indexed by string but doesn't return an Employee
            // you can escape this with union type (IEmployee | number)
        }

Index properties can also use the readonly keyword: this can be used to make a collection immutable.

    let siblings: { readonly [order: number]: string };
    siblings = ["Primus", "Secundus", "Tertius", "Quartus", "Quintus", "Sextus"];
    siblings[1] = "Septimus"; // compiler error

Like function types, index types allow for easier reading and reuse of code. You can declare that a parameter implements an interface with an index, rather than specifying an inline anonymous object type.

Extending One Interface with Another
---

A new interface may extend multiple existing interfaces. This allows more complex interfaces constructed from component parts.

    interface INamed
    {
        name: string;
    }

    interface IMakesNoise
    {
        makeNoise(): void;
    }

    interface INoisyNamedThing extends INamed, IMakesNoise {}

    const myCat: INoisyNamedThing =
    {
        name: "fluffy",
        makeNoise: () => { console.log("MEOW"); }
    }

Named Parameters
---
Calling code becomes difficult to read when the number of parameters increases, particularly with more optional parameters. It's hard to tell in some cases what each call refers to, and if you want to skip an optional parameter in the middle, you have to explicitly pass `undefined`.

    function createButton(caption: string, autoHide?: boolean, isDefault?: boolean, isCancel?: boolean): void {...}

    // calling code
    createButton("OK", true, false, false);
    createButton("Next", undefined, undefined, true);

It's best to group all optional parameters into one optional object type parameter. Even better, create an interface for the parameters.

    // grouped all optional parameters into an "args" object type
    function createButton(caption: string, args?: {autoHide?: boolean, isDefault?: boolean, isCancel?: boolean}): void {}

    // OR create interface
    interface ICreateButtonOptArgs
    {
        autoHide?: boolean;
        isDefault?: boolean;
        isCancel?: boolean;
    }

    function createButton(caption: string, args?: ICreateButtonOptArgs): void {}

    // calling code
    createButton("OK", {isCancel: false, autoHide: true, isDefault: false});
    createButton("Next", {isCancel: true});

Interfaces vs. Type Aliases
---
You can technically use a type alias to define an object type, but interfaces are more flexible because they can be extended by other interfaces and implemented by classes. The only time you should consider using a type alias is when naming a union type.

Destructuring an Object
---
Destructuring objects can make code easier to read: Instead of accessing properties of an existing object, you can create local variables using an object's properties.

For example, suppose you want to validate the start and end of a numeric range: both numbers should be finite and non-negative, and the start should be less than or equal to the end. With the logic worked out, the function looks like this:

    function isRangeValid(range: {start: number, end: number}): boolean
    {
        return range.start >= 0 && isFinite(range.end) && range.start <= range.end;
    }

This works, but constantly calling the object for properties is redundant and makes the function harder to read. We could use multiple assignments to store values, but destructuring the object can be done in a single line of code with TS.

    function isRangeValid(range: {start: number, end: number}): boolean
    {
        const {start, end} = range;
        return start >= 0 && isFinite(end) && start <= end;
    }

This maps the properties of `range` to two local variables. The data types are inferred.  
The names are typically matching property names, but they can be aliased to other names. For example, I could map start to begin and end to fin:

    function isRangeValid(range: {start: number, end: number}): boolean 
    {
        const {start: begin, end: fin} = range;
        return begin >= 0 && isFinite(fin) && begin <= fin;
    }

Destructuring Arrays is similar, we just use `[]` instead of `{}`. You can even assign the rest of the array to a new array, and you can omit them.

    let myString = "this is a long string thing"

    // simple pull first 3 elements
    let [word1, word2, word3] = myStr.split(" ");

    // pull first 2, rest in remain
    let [word1, word2, ...remain] = myStr.split(" ");

    // pull first and last element
    let [word1, , , , , word6] = myStr.split(" ");

Of course, the whole point of this is readability and ease. If your statement gets too complex it may be easier to just pull values individually. Such as in the last statement:

    let word1 = myStr.split(" ")[0];
    let word6 = myStr.split(" ")[5];

Classes
===

Interfaces can define the structure of objects, but if you need to add state and behavior, you can define a *class*. Classes should be in Pascal case.

Access Modifiers
---
You know, the usual:

Accessibility                                       | Access Modifier                           | Naming Convention
-- | -- | --
Anywhere                                            | `public`                                  | `camelCase`
Only the class                                      | `private`                                 | `_camelCase`
The class or derived classes                        | `protected`                               | `camelCase`, or `onCamelCase` if it's an event method to tie to
Any code from the same project                      | `public` with `@internal` in JSDoc        | `_camelCase`
The class and derived classes in the same project   | `protected` with `@internal` in JSDoc     | `camelCase`

Things to note:
1. Default access type in TS is `public`, not `private`
2. No `internal` modifier, just the JSDoc note.

Fields
---

Fields in classes are just like variable declarations, just with the `var`/`let` keyword replaced by an access modifier.

    class MyClass
    {
        AccessModifier fieldName: Type = initialValue;
    }

Methods
---

Behavior is added to a class by defining methods. In TS, methods are declared like fields, but also include a parameter list and a code body, like function definitions:

    class MyClass
    {
        AccessModifier methodName(param1: Type1, param2: Type2): ReturnType
        {
            // code body, including return if required
        }
    }

Properties
---

Similar to other OOP languages, properties are prevented to consuming code as values, but are actually implemented as methods, with a fixed signature and return type.

    class MyClass
    {
        private _backingField: Type;

        AccessModifier get propertyName(): Type
        {
            // optional logic
            return this._backingfield;
        }

        AccessModifier set propertyName(value: Type)
        {
            // optional logic
            this._backingField = value;
        }
    }

In TypeScript, __the getter and setter must have the same access level__. However, you are free to omit either to create read-only/write-only properties.

Write-only properties shouldn't be used, though. Instead, just create a separate setting function that follows what might be a Java-style set method:

    setProperty(value: PropType): void { this._property = value; }

Constructors
---

A constructor must literally be a function named __constructor__.

    class MyClass
    {
        // This function is actually called "constructor"
        AccessModifier constructor(inputParameters)
        {
            // Initialize object based on input
        }
    }

Default constructor is assumed if you don't define one. As defined, you can't have more than one function with the same name, so you can only have one __constructor__ class, but you can still overload the constructor with multiple signatures. This also means all overloads must have the same AccessModifier, however.

__Private Constructors__ can only be instantiated or extended in its own class, meaning the class can't be inherited. This is similar to sealing in other OOP languages.
__Protected Constructors__ can only be instantiated in its own class, but can be extended in derived classes.

Static Members
---

Static members of a class are called CLASS members, identified with `static`. Called with class name instead of instance name. Anything `static` related has to be declared, like getters and setters.

Inheritance
---

Inheritance is similar to other OOP languages.

    class DerivedClass extends BaseClass {}

To override a base-class method, all you need to do is redefine the method. Just remember:
1. The derived class must have access to the member. This means that private members cannot be overridden.
2. The new implementation must have an access level that is *the same or more relaxed* than the original.
3. The new implementation must have the same signature as the original.

You can use __super__ to reference the base class's implementation, eg:

    class DerivedClass extends BaseClass
    {
        protected onThisFunction()
        {
            // do things maybe
            super.onThisFunction();
            // do other things
        }
    }

Subclasses
---
When defining a constructor in a subclass, you must always include a reference to the base class for initializing all the inherited state. Essentially, if you've included a `extends` class, you must include the `super();` keyword in the constructor.

    class SubClass extends BaseClass
    {
        constructor(name)
        {
            super();
        }
    }

Default Field Values and Inheritance
---
In TS, default field values are assigned as part of the class constructor, and not inserted directly into the prototype. You don't really see this in the TS but would see in the output JavaScript.  
This means that when a derived class overrides the default value of a field, the default from the base class will persist until the constructor of the derived class executes. This is a short time, obviously, but important to know.

    // TS
    class Employee
    {
        public wage = 50;
        public constructor() {}
        public toString():string { return "Employee"; }
    }

    // JS
    var Employee = /** @class */ (function () {
        function Employee() {
            this.wage = 50;
        }
        Employee.prototype.toString = function () { return "Employee"; };
        return Employee;
    }());

Deferring Implementation (Abstract)
---
At times you may include a method, but leave it to derived classes to implement. This is done with the `abstract` keyword, on the class and on the function(s). In TS 2.0, properties can also be made abstract, although this should generally be set in an interface.

    abstract class Animal
    {
        public abstract makeNoise()
        {
            // this is different depending on the animal
        }
    }

Interface Implementation
---
To implement an interface, use `implements`, like you would in Java. A field in an interface can be implemented as a field or a property, in all it's access types (getters/setters).

    class MyClass implements IInterfaceName {}

When you are writing for getters/setters on an interface, and the interface variable is for an implementing object, the compiling code won't always recognize when an assignment didn't work, even if it's marked as read-only (ie. `var x:IInterfaceName = new MyClass()`) Thus it's important to set readonly for fields in the interface, and since there is no writeonly modifier for fields, writeonly properties should not be used.

Assignment Compatibility
---

Recall from Object Types, an object literal must exactly match it's assigned type. Classes are permitted to have excess properties beyond what is expected, even if the class doesn't explicitly implement the interface. Eg:

    interface IPerson
    {
        name: string;
    }
    const myPerson1: IPerson = { name: "Bob", faveColor: "red"}; // Compile error

    class Person
    {
        name: string;
        faveColor?: string;
        public constructor(name: string, faveColor?: string)
        {
            this.name = name;
            this.faveColor = faveColor;
        }
    }
    const myPerson2: IPerson = new Person("Bob", "red"); // works.... :)

Generics
===
A *generic* creates a class, interface, or function that works with many different data types by deferring specification of 1+ underlying types until it is declared by the consuming code. This is accompished with *type parameters*, via `Type<typeParam>`. By not specifying an underlying type, generics add flexibility and reusability while still maintaining type safety.

For example, an array declaration must contain the inner value type:

    const stringArray = new Array<string>();

Declaring and Inferring Type Parameters
---

You can declare generics with a type parameter, typically `<T>`.

    class SimpleSet<T>
    {
        private _vals: T[] = [];
    }

It's also possible to specify multiple type parameters. When doing so it's common to give types a meaningful name in Pascal case, prefixed with "T". (Although in CS 400 you used E, so that should work too).

    class Dictionary<TKey, TValue>
    {
        private _vals: TValue[] : [];
        // Dictionaries are obviously complex so this would take a lot more thought :)
    }

It's possible to infer type parameters based on types passed in as arguments:

    function countMatches<T>(ary: T[], search: T): number
    {
        return ary.filter(val => val === search).length;
    }

    // these work, even without <T>
    countMatches([1,2,1],1); // infers number
    countMatches(["a","b","c"],"b"); // infers string
    countMatches([1,2,1],"a"); // compile error

Constraining Type Parameters
---

You can also restrain the type parameter if you need the type to follow a specific interface.

    interface ILengthable
    {
        length: number;
    }

    function loggingIdentity<T extends ILengthable>(arg: T): T
    {
        console.log(arg.length);
        return arg;
    }

This can lead to some unintuitive scenarios, however, because of duck typing. The type need not explicitly implement the interface, as long as it has the same "shape" (eg. interface requirements). So an array would work for the above example, even though array doesn't explicitly implement my interface `ILengthable`.

Organizing Code: Modules
===

There are two different ways to organize code in TS: __Modules__, which rely on the underlying filesystem to organize code, and __Namespaces__, which rely on a separate logical structure. Usually, a framework or application will pick one and stick to it.

Modules, generally, are preferred. You can think of a module like a library: a single file that packs up code for reusability. Most modules will contain one or more entities (classes, interfaces, etc.). Having fewer modules makes things easier for consumers since there is less to import. It may improve performance if bundling isn't used, because fewer separate script files need to be sent to the client.  
You must choose a module system when you use modules. HSW uses the AMD module system.

Creating Modules
---
No special syntax is required to identify a TS file as a module, but you do need to make entities in the file publicly available, which is done via the `export` keyword. For example, if we had a `Shapes.ts` file, I would want to export any classes I want to be usable outside the file:

    //Shapes.ts

    export class Shape {}
    export class Oval extends Shape {}
    export class Circle extends Oval {}

Each file should have a standard header:

    /** 
    * @copyright Copyright <first_year>-<last_year> Corporation
    * @file <brief description of file>
    * @author <your full name>
    * @module <@module_name>
    */

Using Modules
---

Any exported info can be used with the `import` keyword in other files, and specifying the filepath to `Filename`, relative to the current file. Filepaths are case-sensitive, and refer to emitted JavaScript, though the `.js` extension is omitted.

There are two ways to use `import`:

1. If you only need a few entities, you can list them out and assign aliases as desired:

        import { Oval, Circle as Circ } from "./Shapes";

        // available on their own
        let myOval = new Oval();
        let myCirc = new Circ();

2. If you need all of them, you can import them all with a wildcard:

        import * as shps from "./Shapes";

        // available as properties of the imported object
        let myOval = new shps.Oval();
        let myCirc = new shps.Circle();

Managing Dependencies
---

Of course, code that imports modules can also export itself as a module. Importing a class with buried imports won't include the nested imports. We can solve this by either importing any dependencies, or by re-exporting any of its own dependencies. For example:

    import { Shape } from "./Shapes";

    export class McShape
    {
        writeShape(shapeToWrite: Shape): void
        {
            console.log(shapeToWrite);
        }
    }

    // RE-EXPORT
    export { Shape };

Now we only need one import statement.

    import * as shapies from "./McShape";

    const ms = new shapies.McShape();
    ms.writeShape(new shapies.Shape());

There aren't strict rules that dictate what a module must contain. Below are some suggestions to aid in code grouping logic and efficiency.

* Each loaded file is an HTTP request, so err on the side of fewer modules. They can always be broken up later.
* In TS, it's okay to have more than one class in a module.
* If code is only used in one module, it should be part of that module.
* If there are clear dependencies and logical groups among code segments, include them in a single module.
* Entities not needed outside a module shouldn't be exported. This effectively makes them internal to the module.

Organizing Code: Namespaces
===

While modules are preferred, sometimes namespaces are needed. For example, if you need to import JavaScript data structures into TypeScript. They can be defined as such:

    namespace Epic.Training.Example
    {
        // namespace level variable
        let namespaceSetting: number = 1138;
    }

Imports and Exports
---

By default, entities defined within a namespace are only visible within the namespace block itself. If you want to access code from another namespace, you must export it. This is done with the `export` keyword, again, eg:

    namespace Epic.Training.Example
    {
        export class MyClass {}
    }

    namespace Epic.Training.ExampleTwo
    {
        class MyClas extends Epic.Training.Example.MyClass {}
    }

Notice that import isn't required for access. With namespaces, import is only used to *alias* a namespace and give it a shorter name.

    namespace Epic.Training.ExampleTwo
    {
        import ete = Epic.Training.Example;
        class MyClas extends ete.MyClass {}
    }

Async Programming
===
Any action that is initiated now but can't resolve until later is *asynchronous*. This might include:
* Responding to a UI event, like a button click
* A web service call
* A timeout

How the Browser Sequences Asynchronous Actions
---
JS in a browser can only have one execution thread at a time. Any async action that is ready to be resolved (eg. a button click event, web service call, timeout) is placed on a queue. Once the current code on the stack has completed, the next action on a queue is handled.

### Adding an Async action to the queue
The easiest way to add something to the queue is by using setTimeout. If you don't specify a delay, then the task is placed on the queue to be executed as soon as possible. In the below code, the task being placed on the queue happens synchronously, but the actual code doesn't execute until the current task is done. This is what makes it __asynchronous__.

    console.log("Adding task to queue.");
    var startTime = Date.now();
    setTimeout(function () { console.log("Milliseconds on queue: " + (Date.now() - startTime)); });
    console.log("Task added.");
    console.log("Output:");

    // Example output:
    // Adding task to queue.
    // Task added.
    // Output:
    // Milliseconds on queue: 13

### Waiting for Async results using Callbacks

The classic way to wait for async results is with a callback. If you need actions to perform in a certain order, you're going to have a problem when you add a function asynchronously. You can augment an async function by specifying a callback, which is only invoked after the async event happens. This ensures order.

    function sayHi(callback: Function): void
    {
        setTimeout(() =>
        {
            console.log("Hi");
            callback();
        });
    }
    function sayBye(): void
    {
        console.log("Bye");
    }

    sayHi(sayBye);

However, callback order can obviously get complicated fast, so you must use __promises__ to make it easier to read.

### Waiting for Async results using Promises

A __promise__ represents the eventual result of an async call. You can use it as a placeholder until the result is available, or a failure occurs. If you wrap the async code in a promise, you can delay the dependent code until after the promise resolves. The promise constructor takes a delegate function as input, which is where the async code is kicked off. The delegate function is also passed two arguments whne invoked: the first is called on completion, the second on failure. The convention is to call the first argument *resolve* and the second one *reject*. You use the `then` method to place dependent code, and the `catch` method to execute code if it fails.

    function sayHi(): Promise<void>
    {
        return new Promise<void>( (resolve, reject) =>
        {
            setTimeout( () =>
            {
                try
                {
                    //throw new Error("Feeling Grumpy... no talk...");
                    console.log("Hi");
                    resolve();
                }
                catch(error)
                {
                    reject(error);
                }
            });
        });
    }

    function sayBye(): void
    {
        console.log("Bye");
    }

    function displayError(error: Error): void
    {
        console.log(error.message);
    }

    // the good stuff
    sayHi().then(sayBye).catch(displayError);

#### Returning Promise Values
If you need to return a value from a promise, specify the value in the type parameter, pass the return value to the resolve function, and use the output parameter as input in the function specified in `then`.

    function sayHi(): Promise<string>
    {
        return new Promise<string>( resolve =>
        {
            setTimeout( () =>
            {
                console.log("Hi");
                let name: string = prompt("Name?", "Bobby") || "Bobithy";
                console.log("My name is " + name);
                resolve(name);
            });
        });
    }

    function sayBye(name: string): void
    {
        console.log("Bye, " + name);
    }

    sayHi().then(sayBye);

#### Chaining Promise Actions
If you have multiple async actions to chain together, promises can be chained with multiple `then` statements.

    function sayHi(): Promise<void>
    {
        return new Promise<void>( resolve =>
        {
            setTimeout( () =>
            {
                console.log("Hi");
                resolve();
            });
        });
    }

    function sayBye(): Promise<void>
    {
        return new Promise<void>( resolve =>
        {
            setTimeout( () =>
            {
                console.log("Bye");
                resolve();
            });
        });
    }

    function dontForget(): void
    {
        console.log("Don't forget to call!");
    }

    sayHi().then(sayBye).then(dontForget);

Of course, all of this then leads to using async/await in TS.

Using async/await to make Async code easier to follow
---

TypeScript introduces some syntactic sugar that makes async code using promises look like synchronous code. The goal is to improve readability. Here's the process:

1. Wrap all async operations in functions that return a promise.
2. Mark those functions with `async`
3. Use the `await` to pause execution until an async operation finishes. This has two critical implications:
    * Any code that depends on the async operation can be written after the `await` call. From the perspective of that code, things will happen synchronously.
    * Since this code block is now waiting on an asynchronous action, *it has become asynchronous itself*.
4. Wrap the `await` call and all dependent code in a function that is marked as async and returns a promise.
5. Repeat the previous steps until all async operations are accounted for.

Say we have the following code with a promise:

    function DoAsyncStuff(): Promise<void> {}
    function DoOtherStuff(): void {}
    DoAsyncStuff().then(DoOtherStuff);

The first step to allow us to use await is to mark DoAsyncStuff with async.

    async function DoAsyncStuff(): Promise<void> {}

Next use await instead of then to delay DoOtherStuff until DoAsyncStuff resolves:

    async function DoAsyncStuff(): Promise<void> {}
    function DoOtherStuff(): void {}

    await DoAsyncStuff();
    DoOtherStuff();

Almost done, but this code currently has a compile error. Everything coming after the await call needs to be delayed and is now asynchronous itself, so it __must__ be contained in an async function. To fix the problem, wrap it in an async method.

    async main(): Promise<void>
    {
        await DoAsyncStuff();
        DoOtherStuff();
    }

    main();

While in C# we like to be strict about async functions, we are not as strict about TypeScript: the big difference being that if we have a sync and async version of a function, then we should append the end of the function with `Async`.

### Returning a value from async/await
The initial setup is the same as promises:
1. Specify the type of the return type in the type parameter
2. Pass the result to the resolve function.

The big difference is that if you call it directly, the promise is returned instead of the eventual value. If you await the promise, you'll get the value directly.

    let name = await sayHi();
    await sayBye(name);
    dontForget();

### Handling errors in async functions

Recall that the goal with async/await is to make async code read more like sync code. Same is true with errors. To catch an error, simply wrap the await in a try/catch.

Async Loading Modules
---

In the previous imports, modules were loaded statically. This means whenever the script file is loaded, all dependencies are also loaded. This can be wasteful for imports that are rarely used:

    // Statically loaded modules
    import * as common from "../CommonlyUsedStuff";
    import * as rare from "../RarelyUsedStuff";

    let isEdgeCase: boolean = common.DoCommonStuff();

    if(isEdgeCase)
    {
        rare.DoRareStuff();
    }

In this case, it would be more efficient to load RarelyUsedStuff dynamically. To do so, use import as a function. Because loading the file in this way is async, import returns a promise and is marked as async.

    // Statically loaded module
    import * as common from "../CommonlyUsedStuff";

    async main(): Promise<void>
    {
        let isEdgeCase: boolean = common.DoCommonStuff();

        if(isEdgeCase)
        {
            // Dynamically load module
            const rare = await import("../RarelyUsedStuff");
            rare.DoRareStuff();
        }
    }

    main();