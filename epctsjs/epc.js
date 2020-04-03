/**
 * This document is for notes from js.md.
 * 
 * I can write comments in JS this way :)
 */

// or this way!

///
/// or this way, with xml headers... I need this VS Code extension
///
function foo(input)
{

}

//1. Create a new empty object using literal notation
var strings = {};
var count = 0;

//Prompt user for strings until "STOP" is entered
var singleString;
while (
  "STOP" !== 
  (singleString = prompt("Enter a string (or 'STOP' to exit)",""))) 
{
  //2. Use the "in" check for duplicates. If so, display a warning.
  
  if (singleString in strings)
  {
    alert("duplicate entered");
  }
  //3. Otherwise, store the string and the order it was entered into strings
  else
  {
    strings[singleString] = count;
    count++;
  }
}
//4. Display all the entered strings to the console
for(singleString in strings)
{
  console.log(strings[singleString] + ": " + singleString);
  delete strings[singleString];
}
//5. As a string is written, delete it from the object.

// Set several timeouts to display the following:
var wfi = function () { console.log("Wait for it...") }
//   (after 1 second) Wait for it...
var id = setTimeout(wfi, 1000);


wfi = function () { console.log("Keep waiting...") }
id = setTimeout(wfi, 5000);

//   (after 2 seconds) Keep waiting...

var startIn = function () {
  var idd = setInterval(function () {console.log("BOO!")}, 500)
}
//   (after 5 seconds) BOO!
id = setTimeout(startIn, 10000);