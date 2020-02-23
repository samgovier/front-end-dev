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

