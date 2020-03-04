Typescript Stuff

JS examples in [epc.ts](../epctsjs/epc.ts)

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

Even though the browser is executin JS, debugging in TS is done when using browser developer tools, like in Chrome.

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

You can declare types for function variables, params, and return types, and well as fields, properties, and constants.

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
| Default if false-ish (`||`)   |`console.log((val || "default").toString());`  | Works, `undefined` & `false` => "default"                 |
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