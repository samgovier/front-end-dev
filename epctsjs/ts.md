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

__Using for-of`:__  
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

If a variable can have multiple types, declare it with a *union* type, declared using the pipe `|`. Here, myVar can be string, number, or boolean:

    let myVar : string | number | boolean;

A union type may be any data type. There is no technical limitation to the number of union types, but it can get over the top. If you define a certain set often, you can define a type alias, covered later.

Instance members accessible to a union type depends on whether the compiler can determine the type. When a value is initialized, the variable can access all members of its current value. If the compiler cannot determine a data type, the variable only has access to the subset of members that all types can access. There are also *intersection types* but we won't cover them here, if you need them for the future you can read [here](https://github.com/Microsoft/TypeScript/blob/master/doc/spec.md#35-intersection-types).

__Type Guardrails:__