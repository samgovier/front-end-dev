C-Style Syntax
===

All code written in `Typescript`

Basic Pieces
---

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
---

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

### Constants

If you're using a value in 2+ places, but don't expect it to change, consider making it a constant. Once set, constants can't change in runtime. *(Of course, you can always modify code)*

    const name: string = "Shaquille O'Neal";
    name = "Superman";  // compiler error! name is a constant and can't be changed. This is an illegal statement

### Enumerated Types

An *enum* is a data type that represents a set of named constants. It's just a number you've given a title to, essentially. Once the type is defined, use the syntax `<enum name>.<enum value>`

    enum Temperature
    {
        ReallyCold,          
        Freezing = 32,
        JustAboveFreezing,  
        Boiling = 212,
    }

    let tempToday: Temperature = Temperature.Freezing;
    let tempTomorrow: Temperature = Temperature.JustAboveFreezing;

    let tempNextTuesday: Temperature = Temperature.NiceOutside; // compiler error! This value isn't part of the Temperature enum.

Operators
---

You can do `math`. +-\*/%. and assign in the same swoop, `<op>=`.  
You can increment and decrement with `++` and `--`.  
All the Relational (eg. `<=`) and Logical (eg. `&&`) are there as well. Order of operations:  
1. __Unary__ (+, -, !)  
2. __Multiplicative__ (\*, /, %)  
3. __Additive__ (+, -)  
4. __Relational__ (<, >, <=, >=)  
5. __Equality__ (==, !=)  
6. __Conditional logicals__ (&&, ||)  
7. __Assignment__ (=, *=, /=, %=, +=, -=) 

Conditional Branching and Looping
---

if/else! Switch! Can you imagine?

    if (value1 < value2)
    {
        // do 1
    }
    else if (value1 > value2)
    {
        // do 2
    }
    else {
        // do 3
    }

Switch!

    let currentTemp : Temperature = 32;

    switch (currentTemp)
    {
        case Temperature.ReallyCold:
            break;
        case Temperature.Freezing:
        case Temperature.JustAboveFreezing:
            break;
        default:
            break;
    }

For Loops! While Loops! Do-While Loops! Loop manipulation with `break` and `continue`!

    for (let i: number = 0; i < 200; i++)
    {
        let j: number = 0;
        while(j < 28)
        {
            continue;
        }

        // code bb
    }

Functions
---

Basically a method.

    function addOne(num: number): number
    {
        num++;
        return num;
    }

Notice the following:  

- You have to declare the type of value the function returns (in this case, a `number`). The return value type is placed *after* the function name.
- All parameters must have a data type.
- To return a value, you must use a `return` statement that includes what you're returning.

If the function doesn't return a value, you can mark the function `void` and disclude the return statement.

    function doSomething(num: number): void
    {
        // do... something!!!!
    }

To call a function, use the function name followed by parentheses and arguments in those parenthesis. If it returns a value, you should assign that to a variable, unless you for sure don't need it.

    let newValue: number = addOne(2);
    doSomething(newValue);

FizzBuzz Exercise
===
In the classic FizzBuzz test, you write a program that loops over the numbers 1 to 100. For each number:

- If it's divisible by 3, print "Fizz";
- If it's divisible by 5, print "Buzz";
- If it's divisible by both 3 and 5, print "FizzBuzz";
- Otherwise, print the number.

In Typescript:

    //1. define your function
    function FizzBuzz(): void
    {
    const fizz: string = "Fizz";
    const buzz: string = "Buzz";
        for(let i: number = 1; i <= 100; i++)
        {
        if ((0 == (i % 3)) && (0 == (i % 5)))
        {
            console.log(fizz + buzz)
        }
        else if (0 == (i % 3))
        {
            console.log(fizz); 
        }
        else if (0 == (i % 5))
        {
            console.log(buzz);
        }
        else
        {
            console.log(i);
        }
        }
    }
    //2. call your function

    FizzBuzz();