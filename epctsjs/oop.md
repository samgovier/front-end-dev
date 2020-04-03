Object-Oriented Programming in Typescript
===

All code written in `Typescript`

Typescript Class
---
    class Car
    {
        //fields (state)
        public make: string;
        public model: string;
        public color: string;
        public year: number;
        public IsAutomaticTransmission: boolean;

        //methods (behavior)
        //"void" represents no value returned
        public burnGas(): void
        {
            // code to burn gas
        }

        // method parameters also have data types
        public drive(howManyMiles: number): void
        {
            // code to drive the passed miles
        }

        public calculateCurrentSpeed(): number
        {
            // code to calculate speed bruh
        }
    }

    //define Dog class
    class Dog
    {
        public name: string;
        public age: number;
        public breed: string;
        public isCurrentOnVaccinations: boolean;

        public bark(): string
        {
            return "Woof";
        }
    }

    const myDog: Dog = new Dog();
    myDog.name = "Abby";
    myDog.age = 13;
    myDog.breed = "Dachshund";
    myDog.isCurrentOnVaccinations = true;

    //output code (don't change)
    console.log(`${myDog.name} is a ${myDog.age}-year old ${myDog.breed}.`);
    console.log(`Is ${myDog.name} current on vaccinations? ${myDog.isCurrentOnVaccinations}!`); 
    console.log(`${myDog.bark()}!`);

Typescript Access Modifiers
---
    class Car
    {
        public make: string;
        public year: number;
        private _rpm: number;

        private burnGas(): void {}
        
        // property
        public get _rpm(): number
        {
            return this._rpm;
        }

        // in reality we would not have a setter here, but yeah
        public set _rpm(newRpm: number)
        {
            this._rpm = newRpm;
        }
    }

Inheritance
---
    class Hybrid extends Car
    {}

    class Car extends Vehicle
    {}

    abstract class vehicle
    {}

    const v1: Vehicle = new Hybrid();
    const v2: Vehicle = new Car();

Interfaces
---
    interface IMakesNoise
    {
        makeNoise(): void;
    }

    class Person implements IMakesNoise
    {
        public listenTo(noisemaker: IMakesNoise)
        {
            noisemaker.makeNoise();
        }
    }

    interface IMakesAdjustableNoise extends IMakesNoise
    {
        changeVolume(): void;
    }

.

    interface ILikesTreats
    {
        chew(): string;
    }

    class Dog implements ILikesTreats
    {
        public name: string;
        public age: number;
        public breed: string;
        public isCurrentOnVaccinations: boolean;

        public bark(): string
        {
            return "Woof";
        }
    
        public chew(): string
        {
            return "Hell yeah om nom nom";
        }
    }

    class Owner
    {
        public giveTreat(animal: ILikesTreats): void 
        {
            console.log("Who's a good boy?");
            console.log(animal.chew());
        }
    }


    //output code (don't change)
    const myDog: Dog = new Dog();
    const me: Owner = new Owner();

    me.giveTreat(myDog);

Overriding & Overloading
---

Override can just be done by defining again: no special keyword.

The override will be used based on the type of the actual __object in memory__, not the variable/reference to that object.

Overload is just different list of parameters.