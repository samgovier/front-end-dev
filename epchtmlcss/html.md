hi :)

HTML Overview
===

What is HTML?
---

__HyperText Markup Language (HTML)__ is used to specify the content of a web page. It has become ubiquitous because:
* It's fast to write
* It's descriptive
* It's easy to parse, both visually by a person and programmatically by a computer
* It decouples content from how it is used, making it easy to re-style.

The __HyperText__ portion refers to the fact that HTML documents can include hyperlinks to other related documents. The __Markup Language__ portion states that the language is not for programming- it's for markup.

### What is a Markup Language?

A system for annotating parts of a document to provide additional context. One part could be marked for the title, another a heading, and another a paragraph. The code has to be syntactically distinguishable so it's not presented to the user.

Web Site Organization
---

* Root Directory contains the starting page.
* Subdirectories are for organizing pages.
    * `./dirName` moves down a directory
    * `../` moves up a directory
    * `/` refers to the root of a website
* All images should be placed in a shared directory
* No spaces in file or path names. If necessary, you can encode spaces in a URL using `%20`.

Document Type Declaration
---

* Required. Must be first line in file, even before comments
* Declares the DTD, Document Type Definition, versions used for the document
* Used to check the document for validity
* Affects the rendering of the page

__HTML5__:  

    <!DOCTYPE html>

__XHTML Strict__:  

    <!DOCTYPE  html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

__XHTML Transitional__:  

    <!DOCTYPE  html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd" >

Elements
===

The syntax for elements is as follows:

    <tagname attr1="val1" attr2="val2" ... >
        content
    </tagname>

OR

    <tagname attr1="val1" attr2="val2" ... />

Tags that are capable of containing content should never be terminated using the second shorthand. This can break some browsers.

Rules and Conventions
---
* All tag names are lowercase
* All elements must be terminated with a closing tag
* Use the second shorthand for empty elements that don't have content
* Some tags have required attributes, others are optional
* All attribute values must be in quotes

Minimal HTML Page
---
An empty HTML page must include:
1. A document type
2. Required elements in a hierarchy (one element in another, nesting)

Example:

    <!DOCTYPE html>
    <html>
    <head>
        <title>Web Page Title</title>
    </head>
    <body>
        Content Here
    </body>
    </html>

So you must have a document type, the html element, containing a head and body, and the head must have a title.

`html` tag - Root of all HTML documents. All other elements are contained in it. Placed just after the document type declaration.