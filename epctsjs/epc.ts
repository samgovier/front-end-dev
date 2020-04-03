/**
 * This document is for notes from ts.md.
 *
 * */

 // Class constructor exercise

 class Employee 
{
   // An employee should have a name and a numeric ID.  
   // Implement each piece of state as a property with a private backing field.  
   // Provide three overloads for the constructor:  
   // (1) A default constructor, 
   // (2) A constructor that initializes the name and ID, and 
   // (3) A copy constructor that copies name and ID from another employee.
  
  private _name : string;
  private _id : number;
  
  public get name(): string
  {
      return this._name;
  }

  public set name(value: string)
  {
      this._name = value;
  }

  public get id(): number
  {
      return this._id;
  }

  public set id(value: number)
  {
      this._id = value;
  }

  public constructor();
  public constructor(arg0: string, arg1: number);
  public constructor(arg0: Employee);
  
  public constructor(arg0?: Employee | string, arg1?: number)
  {
    if(arg0 && arg1)
    {
      if (typeof arg0 === "string" && typeof arg1 === "number")
      {
          this._name = arg0;
          this._id = arg1;
      }
    }
    else if (arg0)
    {
      if (arg0 instanceof Employee)
      {
        this._name = arg0.name;
        this._id = arg0.id;
      }
      
    }
    else
    {
      this._name = "None Defined"
      this._id = 0;
    }
  }
}

let emp1 = new Employee();
let emp2 = new Employee("Bob Loblaw", 123);
let emp3 = new Employee(emp2);
console.log("Employee 1: " + emp1.name + "[" + emp1.id + "]");
console.log("Employee 2: " + emp2.name + "[" + emp2.id + "]");
console.log("Employee 3: " + emp3.name + "[" + emp3.id + "]");