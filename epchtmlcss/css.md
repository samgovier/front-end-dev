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

https://training.com/styles/style1.css

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

A CSS file consists of one or more rules and optional comment blocks. Comments appear between `/* and */`, like in C#.

A rule consists of one or more selectors separated by commas, followed by a declaration block containing properties and values. The syntax of a rule is:

    selector1, selector2, ...
    {
        property1: value1;
        property2: value2;
    }

The listed properties are applied to any selected element.

Selectors
===
Used to indicate which elements this style applies to.

Element Selectors
---

| Selector | Meaning |
|-|-|
|`*`                    | All Elements selected (default values of the style) |
|`Element1`             | Name of element, such as `h1` or `p`|
|`#idname`              | The element that has `id="idname"`|
|`.classname`           | All elements with `class="classname"`|
|`Element1.classname`   | The element of type `element1` with a class that includes `classname` |
|`Element1#idname`      | The element of type `element1` with id `idname`. Not generally needed |

Combinators
---

For the following selectors, `Selector#` may be an element, class, or id

| Selector | Meaning |
|-|-|
| `Selector1 Selector2` | Selector2, if it is a descendant of Selector1 |
| `Selector1 > Selector2` | Selector2, if it is a child of Selector1 |
| `Selector1 + Selector2` | Selector2, only if it immediately follows Selector1, and both are children of the same parent |
| `Selector1 ~ Selector2` | Selector2, if it is a later sibling of Selector1 |

Attribute Selectors
---

Attribute selectors select elements with any or a specific value for certain attributes:

| Selector | Meaning |
|-|-|
| `[attribute]` | Selects all elements where the specified attribute has been set to any value. |
| `[attribute=value]` | Selects all elements where the specified attribute has been set to exactly `value`. |
| `[attribute~=value]` | Selects all elements where the specified attribute value is a whitespace-separated list of words, one of which is exactly `value`. |
| `[attribute^=value]` | Selects all elements where the specified attribute value begins with `value`. |
| `[attribute$=value]` | Selects all elements where the specified attribute value ends with `value`. |
| `[attribute*=value]` | Selects all elements where the specified attribute contains `value`. |

This can be used with any element, but it is particularly useful for form input elements, since they are distinguished by the `type` attribute. For example, you can set a uniform width to all `input` elements of type `text`:

    input[type=text]
    {
        width: 500px;
    }

Properties
===
Properties define possible legal values, initial value, what elements it applies to and if the property is inherited.

Types of Values
---
* Keywords - defined on a per-property basis
* Color - 17 predefined names, hexadecimal `#RRGGBB`, or `rgb(#,#,#)`
* URL - `url(address)`
* Numbers - any valid number. Typically property restricted, and sometimes qualified with `px`, `%`, or `em`
    * `px` = number of pixels, eg. `10px`
    * `%` = percentage, computed relative to something else, eg. `120%`
    * `em` = size relative to font size

Colors
---
* Careful of hard-coding colors, because they won't change with customization.
* `#RRGGBB` = The hexadecmial equivalent to amount of red, green, blue from 00-FF (0-255 in decimal)  
0123456789ABCDEF
* Picking a Color:
    * Follow color standards for your application
    * [Follow web standards](https://en.wikipedia.org/wiki/Web_colors)
    * Use color schemes from other sources (eg. [Adobe](http://kuler.adobe.com/))
    * Pick colors from a web page. Eg. Internet Explorer > Dev Tools F12 > Tools > Show Color Picker
    * Use Web or Windows (eg. Paint) tools to find colors in decimal. If you get a number in decimal it can be converted to hexadecimal.

Style Precedence
===

Resolving Conflicting Styles
---
Multiple style sheets and specifications may be linked in to document. Conflicts are resolved using the cascade, via *specificity* and *inheritance*.