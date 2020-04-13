hello again :)

[CSS SPECS](https://www.w3.org/Style/CSS/#specs)

CSS Overview
===

Cascading Style Sheets (CSS) are used to give a page better look and feel. They can be swapped to apply different themes/skins to the page. The process can be summarized by the following steps:

1. Select elements to style
2. Specify properties to style
3. Choose a value for each property being styled

Where styles are specified
---

There are 3 ways to specify CSS:

1. Inline style using `style` attribute on tags to associate style with an element
2. Embedded into the header of the HTML file (ie. `head`)
3. External style sheets in a separate .css file

Inline Styles
---
Use the `style` tag. There are no selectors because the style element is applied directly to the element.

    <element style="property1: value1; property2: value2; ... propertyN; valueN;">...
    </element>
Eg.

    <p style="color:red; background-color:yellow;">
    Watch out!
    </p>

Embedded Styles
---
Embedded styles are CSS snippets embedded directly into the markup page, for HTML this goes in the `head` as a `style` tag.

    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>Styling Document</title>
        <!-- embedded style sheet, only applies to elements in this document -->
        <style type="text/css">
            /*<![CDATA[*/
            h1
            {
                color: purple;
            }
            p
            {
                color: white;
                background-color: blue;
            }
            /*]]>*/
        </style>
    </head>
    <body>
        <h1>Purple heading</h1>
        <p>
            white text with blue background
        </p>
    </body>

External Styles
---

External Styles are saved in a separate file that has a .css extension. The files are included using `link` in `head`. External style sheets are preferred because:
* They allow multiple pages to share styles with one source
* Styles can be changed independent of the markup file
* The separate files are cached by the browser, which reduces consecutive load times
* Styles can still be overridden within the markup if needed
* (Keep in mind this document has mostly embedded styles, for ease of reading)

In `link`, there is a `media` attribute used to describe when this style sheet should be included. Various options are:

| Value         | Desc      |
|-|-|
| `screen`      | Computer screens (this is default)                            |
| `tty`         | Teletypes and similar media using fixed-pitch character grid  |
| `tv`          | Television devices (low res, limited scrolling)               |
| `projection`  | Projectors                                                    |
| `handheld`    | Handheld devices                                              |
| `print`       | Print preview mode/ printed pages                             |
| `braille`     | Braille feedback devices                                      |
| `aural`       | Speech synthesizers                                           |
| `all`         | Suitable for all devices                                      |

With `style1.css` hosted at `https://training.com` :

HTML:

    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>Styling Document</title>
        <link rel="stylesheet" type="text/css" 
            href="https://training.com/styles/style1.css" media="all" />
    </head>
    <body>
        <h1>Purple heading</h1>
        <p>
            white text with blue background
        </p>
    </body>

style1.css

    h1
    {
        color: purple;
    }
    p
    {
        color: white;
        background-color: blue;
    }

Creating Style Sheets
===