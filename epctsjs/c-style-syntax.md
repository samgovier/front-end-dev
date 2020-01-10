C-Style Syntax
===============

All code written in `Typescript`

Basic Pieces
---------------

*Statements* are used to declare variables, assign values, call functions, and perform any other task in a program.

A *simple statement* is a line of code ending with a `;` , a *compound statement* is a group of statements enclosed in a block with braces, like `{  }` .

There are two ways to write comments: either with forward slashes (`//`) for single-line/end-of-line,  
or, for multi-line, use asterisks too (`/* <information> */`)

    //simple statement
    let sum: number = 0;

    //compound statement
    for (let i: number = 1; i < 11; i++)
    {
        /* PerformAddition returns a
        value, so it's an expression */
        sum = PerformAddition(sum, i);
    }

Variables
---------------

### Data Types

In code, we need to represent information as *data types*. In most cases, the type is declared before or simultaneously with the value assigned ot it. C# and Typescript are *strongly typed*, ie. they can only hold values that match the type. If you violate this rule, your code won't compile, which assures *type safety*.

    let name: string = "Shaquille O'Neal";
    let isActive: boolean = false;
    let heightInInches: number = 85;

    name = 10; //compiler error! 10 isn't a string.

### Scope

In most cases, a variable declared in a block is only accessible within the block.

    for (let i: number = 1; i < 11; i++)
    {
        let sum: number = 0; // declare variable *inside* this block
        sum = PerformAddition(sum, i);
    }

    sum = sum + 1; // compiler error! outside the scope