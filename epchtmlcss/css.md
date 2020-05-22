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

Calculating Specificity
---
Describes the weight of a selector and associated styles. Takes four numbers in the following order:
1. Is it a style attribute? One point, no other points assigned.
2. Does the selector have ids? One point each.
3. Does the selector have any classes, pseudo-classes or attribute selectors? One point each.
4. Does the selector have any element names? One point each.

Each piece of the score is evaluated in order with the style selector having the highest precedence and the element names the lowest.

Here's a list of scores from least to most specific:
| Selector | Specificity |
|-|-|
|`Element1` | 0,0,0,1 |
|`Element1 Element2` | 0,0,0,2 |
| `.classname` | 0,0,1,0 |
| `Element:hover` | 0,0,1,1 |
| `Element1.classname` | 0,0,1,1 |
| `Element:hover[title=example]` | 0,0,2,1 |
| `element1#idname` | 0,1,0,1 |
| `style="..."` | 1,0,0,0 |

Inheritance
---
Elements in a document form a tree: `html` is the root. Style applied to an element is inherited by descendants unless the property is not inherited.

Cascade
---
Cascade is used to resolve conflicts in styles. Ignores author vs. reader vs. browser rules.

### The Cascade Algorithm
1. Gather all style sheets together, combine styles from all linked style sheets, embedded styles, and inline styles
2. For each property, find all declarations that match
    * Do any selectors select element? If yes, stop looking for declarations
    * If no selectors, use inheritance to find declarations
    * If not inherited, use browser default
3. Sort the declarations by how specific they are using specificity numbers
    * Rules marked with !important are more specific
4. Sort any conflicting rules in the order they appear in their individual style sheets. Rules listed later are more important.

Examples:  
[style2.css](eg\style\style2.css)  
[cascade.html](eg\cascade.html)

Tools
---

The following IE and Chrome Developer Toolbars are particularly useful debugging CSS problems resulting from conflicting styles.
1. Open developer tools using the __F12__ key.
2. Select the DOM Elements (IE) or Elements (Chrome) tab
3. Navigate to the element you're interested in, or right-click on the page and choose "Inspect"
4. Inspect or modify the styles from the __Styles__ sub-tab.
5. Determine which styles were overridden using the __Computed__ sub-tab.

Font Properties
===

font-family
---

* Either a specific font or family of fonts may be specified.
* There are 5 families: sans-serif, serif, monospace, cursive, fantasy.
* The font must exist on the machine to be used.
* May specify multiple fonts in the order to be tried
* Use quotes around font names that contain spaces

Eg.

    body
    {
        font-family: Verdana, Arial, sans-serif;
    }
    .code
    {
        font-family: "Courier New", monospace;
    }

font-size
---

* Value is keyword, percentage or absolute pixels
* Keywords: xx-small, x-small, xmall, medium, large, x-large, xx-large
* Recommended: choose a keyword for the body and use percentages to make other texts relative to that size
    * Allows users to resize text

Eg.

    body
    {
        font-size: small;
    }
    h1
    {
        font-size: 150%;
    }
    h2
    {
        font-size: 120%;
    }

color
---
Sets the foreground color of an element: also applies to border or element

    h2
    {
        color: navy;
    }

font-weight
---
Determines the boldness of the text: keywords are normal, bold, bolder, lighter

    .enterdata
    {
        font-weight: bold;
    }

font-style
---
Determines the style of the text: keywords are italic, oblique, normal. Users may not be able to tell the difference between italic and oblique

    .prompt
    {
        font-style: italic;
    }

text-decoration
---
Determines the decoration of the text. Keywords are underline, overline, line-through

    .under
    {
        text-decoration: underline;
    }

text-align
---
Sets horizontal alignment of text within a block-level element. Keywords are left, center, right

    .right
    {
        text-align: right;
    }

text-indent
---
Sets indentation of the first line of content in a block-level element. Value is percentage or absolute pixels

    .indent
    {
        text-indent: 20px;
    }

white-space
---
Declares how white space within an element is handled during layout:
* normal reduces any sequence of whitespace to a single space
* nowrap prevents an element from line-breaking

Eg.

    .normal
    {
        white-space: normal;
    }

Examples:  
[style3.css](eg\style\style3.css)  
[fonts.html](eg\fonts.html)

Box Model
===

Block-level elements
---
* Generate an element box that fills parent element's content area
* No elements to sides
* Line breaks before and after the element box

Inline-level element
---
* Generate an element box within a line of text
* Doesn't break the flow of the line

Block-level Layout
---
![Illustration of Block-level Layout](eg\img\BlockLayout.png)

* Background extends to outer edge of border, filling content, padding, border areas
* Margins are transparent
* Only margins, height, width properties can be auto
* Only margins can be negative
* Padding defaults to zero
* Border defaults to none
* Total width: left margin + left border width + left padding + width + right padding + right border width + right margin
* Total height: top margin + top border width + top padding + height + bottom padding + bottom border width + bottom margin

Inline-level Layout
---
![Illustration of Inline-level Layout](eg\img\InlineLayout.png)

* line height: leading + content
* Leading is the difference between line-height and font-size
* Line box extends from highest inline box to lowest inline box for a line

Margins
---
![Illustration of Margin Layout](eg\img\Margins.png)

* With adjacent inline elements, the margins are added.
* With stacked block elements, margin is collapsed to larger margin.

line-height
---
* Used in determining the layout of inline boxes
* Value is number or percentage of font-size

Examples:  
[style4.css](eg\style\style4.css)  
[lineheight.html](eg\lineheight.html)

Background
===

For Background, no properties are inherited.

background-color
---
Value is a color or keyword transparent: color fills the content, padding, and border area of an element.

    p
    {
        background-color: white;
    }

background-image
---
Place an image in the background of element. Value is a URL or keyword `none`. Don't put images that provide meaning in the background because there is no alt text.

    body
    {
        background-image: url(./images/cathole.jpg);
    }

background-repeat
---
Define the tiling pattern for the background image: repeat, repeat-x, repeat-y, no-repeat

    body
    {
        background-repeat: repeat;
    }

background-position
---

* How the background image is positioned within the element.
* Value is keyword or exact horizontal and vertical position.
* Keywords: `bottom`, `center`, `left`, `right`, `top`

Eg.

    body
    {
        background-position: 10px 10px;
    }

Example:  
[style5.css](eg\style\style5.css)  
[background.html](eg\background.html)  

Layout Properties
===
None of these properties are inherited.

width
--
Defines the width of element's content area. Value is a number of pixels, percentage of containing block, or keyword auto. Auto by default

    #id
    {
        width: 100px;
    }

height
---
Defines the height of the element's content area. Value is a number of pixels, percentage of containing block, or keyword auto. Auto by default

    #id
    {
        height: 100px;
    }

Padding
---
May specify different size padding on each side of content
* padding-top
* padding-right
* padding-bottom
* padding-left

Value is a number in pixels or a percentage of containing block

    #id
    {
        padding-top: 20px;
        padding-right: 20px;
        padding-bottom: 20px;
        padding-left: 20px;
    }

Border Width
---
May specify different width on each side of content. Sets the width for border of an element
* border-top-width
* border-right-width
* border-bottom-width
* border-left-width

Takes effect if the border style is not none. Value is number of pixels or keywords: thin, medium, thick

    #id
    {
        border-top-width: thick;
        border-right-width: thick;
        border-bottom-width: thick;
        border-left-width: thick;
    }

Border Style
--
May specify different style on each side of content. Defines the style for border of element
* border-top-style
* border-right-style
* border-bottom-style
* border-left-style

May render slightly different with different browsers. Keywords are `none`, `hidden`, `dotted`, `dashed`, `solid`, `double`

    #id
    {
        border-top-style: solid;
        border-right-style: solid;
        border-bottom-style: solid;
        border-left-style: solid;
    }

Border Color
---
May specify different color on each side of content. Sets color for visible border
* border-top-color
* border-right-color
* border-bottom-color
* border-left-color

May be a color or keyword transparent. Color property of element by default

    #id
    {
        border-top-color: yellow;
        border-right-color: yellow;
        border-bottom-color: yellow;
        border-left-color: yellow;
    }

Margin
---
May specify different size margin on each side of content
* margin-top
* margin-right
* margin-bottom
* margin-left

Value is a number of pixels, percentage of containing block, or keyword `auto`

    #id
    {
        margin-top: 10px;
        margin-right: 10px;
        margin-bottom: 50px;
        margin-left: 10px;
    }

Example:  
[style6.css](eg\style\style6.css)  
[layout.html](eg\layout.html)  

Shortcuts
===
* Use when specifying more than one related property
* If specifying only one property, spell it out plz
* Properties not specified take on default values or become none

Background Shortcuts
---
Single rule for background properties: give value to `color`, `image`, `repeat`, `position`. Sets value to default if not explicitly declared.

    /* before */
    body
    {
        background-image: url(cathole.JPG);
        background-repeat: repeat;
    }

    /* after */
    body
    {
        background: url(cathole.JPG) repeat;
    }

Padding Shortcuts
---
Single rule for size of padding overall or on each side. Specify:
* single value for all sides
* List in order of top, right, bottom, left (clockwise)
* First value for top and bottom, second value for right and left

Examples (all the same):

    #id
    {
        padding: 20px 20px 20px 20px;
    }

    #id
    {
        padding: 20px 20px;
    }

    #id
    {
        padding: 20px;
    }

Border Shortcuts
---
### Property Based
* `border-color`: Single rule for color of border overall or on each side
* `border-style`: Single rule for style of border overall or on each side
* `border-width`: Single rule for width of border overall or on each side
* Single value for all sides, list order of top, right, bottom, left (clockwise), or first value is top/bottom, second is left/right

Eg.

    #id
    {
        border-color: yellow;
        border-style: solid;
        border-width: thick;
    }

### Location Based
* `border-top`: Sets the width, style, color of top border
* `border-right`: Sets the width, style, color of right border
* `border-bottom`: Sets the width, style, color of bottom border
* `border-left`: Sets the width, style, color of left border

Eg.

    #id
    {
        border-top: yellow solid thick;
    }

### All Borders
`border` alone sets the style, width, and color of overall border. Sets value to default if not explicitly declared.

    #id
    {
        border: yellow solid thick;
    }

Margin Shortcuts
---
Single rule for size of margin overall or on each side. Same clockwise rules: all the below are the same.

    #id
    {
        margin: 20px 20px 20px 20px;
    }

    #id
    {
        margin: 20px 20px;
    }

    #id
    {
        margin: 20px;
    }

Example:  
[style8.css](eg\style\style8.css)  
[Shortcuts.html](eg\Shortcuts.html)  

Pseudo-classes & Hyperlinks
===

A CSS pseudo-class is a keyword added to selectors that specifies a special state of the element to be selected. For example :hover will apply when the user hovers over the element specified by the selector
* Acts like a class but isn't really
* Browser adds & removes pseudo classes automatically
* May be styled like other classes

__DON'T USE HOVER PSEUDO-SELECTORS WITH SIBLING SELECTORS.__ This causes performance issues with for the entire web page.

Syntax
---

    selector:pseudo-class {...}

Hyperlinks
---

* States: unvisited, visited, hover
* Corresponding pseudo-classes: link, visited, hover
* Pseudo-classes for keyboard access to a hyperlink
    * active (when clicking)
    * focus (when it has focus)
* Note: hover may be applied to elements other than anchor tags
* Hyperlinks can match multiple states (hover & visited) so order of rules matters

Example:  
[style9.css](style9.css)  
[pseudo.html](eg\pseudo.html)  

List Styles
===

* May specify the below elements, or use `list-style` as a shortcut to combine type/image and position
* Applies to elements: ol, ul, li
* All properties are inherited

list-style-type
---

* Used to declare the type of marker system to be used in presentation of list
* Keywords: disc, circle, square, decimal, upper-alpha, lower-alpha, upper-roman, lower-roman, none, ...

Eg.

    ul
    {
        list-style-type: square;
    }

list-style-image
---

Specifies tye image used as marker: value is URL or keyword none

    #special
    {
        list-style-image: url(./images/face.png)
    }

list-style-position
---
Used to declare position of the list marker with respect to the list item. Inside or outside

    ol
    {
        list-style-position: inside;
    }

Examples:  
[style10.css](eg\style\style10.css)  
[list.html](eg\list.html)  

Table Styles
===

* Tables hav emargins and border spacing (corresponds to cellspacing attribute in HTML).
* Cells have padding: set padding in CSS
* Borders set at cell, row, column, or table level
* Borders collapse into each other where they adjoin: Only 1 border drawn. The "most interesting" border wins
![table layout](eg\img\TableLayout.png)

Collapsing Border Rules
---
* Hidden borders take precedence over other styles
* Border with a style of none have lowest priority
* Narrow borders lose out to wider ones
* For same width use preferred border style order: double, solid, dashed, dotted
* For same width and style but different color, preferred element to take color from order: cell, row, column, table
* border-collapse property
    * Determines if borders in a table are collapsed or not
    * Keywords: collapse, separate
    * Defaults to separate
    * Use the table attribute cellspacing only if border-colllapse is separate

Eg.

    table
    {
        border-collapse: collapse;
    }

Example:  
[style11.css](eg\style\style11.css)  
[table.html](eg\table.html)  

Types of Layouts
===

Liquid
---
* Content of page expands to fit the window
* What we have been doing so far

Frozen
---
* Width of content is fixed
* Avoids problems caused by window expanding
* Put div around all content, give it an id like "allcontent" and style it to set the width

eg.

    #allcontent
    {
        width: 800px;
    }

Layout Example:  
[style12.css](eg\style\style12.css)  
[frozen.html](eg\frozen.html)  

Centered
---
* Content width is fixed but margins expand as needed using auto
* Set up like frozen, but add left and right margins of auto
* The content is centered as window expands

Eg.

    #allcontent
    {
        width: 800px;
        margin-left: auto;
        margin-right: auto;
    }

Centered Example:  
[style13.css](eg\style\style13.css)  
[centered.html](eg\centered.html)  

Floating
===

* Floating allows element to be positioned to left or right of containing block
* Position floating content before content to flow beside it in document
* Content following flows beside the element
* Give floating content a width
* Give content beside it a margin equal to the width of floating content to make columns
* To position something below the float, use clear property
* Floating elements don't collapse margins because they float on top
* Potential downside is reordering of document

float
---
* Moves an element to left or right of parent element
* Floated elements are removed from the normal flow and treated as block-level elements
* Keywords: left, right, none

clear
---
* Lists the sides on which floating elements are not allowed
* Keywords: none, left, right, both

Example:  
[style14.css](eg\style\style14.css)  
[float.html](eg\float.html)  

Positioning
===

Controlling Positioning
---

### position

Specifies the method by which position of the element's box is determined: static, relative, absolute, fixed. Static by default

    .steps
    {
        position: absolute;
    }

### top, right, bottom, left

Specifies the position of fixed, absolutely, and relatively positioned elements. Value is number, percentage, or `auto`.

    .steps
    {
        /* Elements stick to right side of browser */
        right: 0px;
    }

### z-index
* Specifies the order in which overlapping sibling elements are stacked on top of each other
* Normally elements that come later in the source document are on top of earlier elements
* Higher numbers are on top, negative number on bottom
* Value is `auto` or integer: a negative value places the element behind its containing block

eg.

    .steps
    {
        z-index: -1;
    }

Types of Positioning
---

### Static Positioning
* Element is placed inside its parent's content box according to the normal flow. Default.

### Relative Positioning
* Element's normal position is calculated then it is offset from this position
* Following elements positioned as if the element had not been offset
* The flow stays the same, just the relative div is moved over in its location

Eg.  
[style17.css](eg\style\style17.css)  
[relative.html](eg\relative.html)  

### Absolute Positioning
* Absolutely positioned elements do not exist in the normal document flow
* They may be layered on top of each other
* Eg. to position a sidebar on the right:
    * Sidebar: position is absolute, some distance down from top, 0 pixels from right, assign a width
    * Main body: right margin the size of the side bar
    * Footer: also need to set the right margin

Eg.  
[style15.css](eg\style\style15.css)  
[absolute.html](eg\absolute.html)  

### Fixed Positioning
* Behaves like absolute
* Its position is an offset from the browser window, not the page
* Just like absolute except that area moved will not scroll
* May use negative margins to move things off the screen: these will still be read by screen readers

Eg.  
[style16.css](eg\style\style16.css)  
[fixed.html](eg\fixed.html)  

Display Options
===

visibility
---
* Makes an element completely transparent without removing it from the document flow
* Hidden elements are not read by screen readers
* Keywords: visible, hidden, collapse
    * Collapse is used in tables to remove columns or rows

display
---
* Used to define the kind of display box an element generates during layout
* Elements that are display:none are not read by screen readers
* Keywords: none, inline, block

Position off screen
---
* Things positioned off the screen are read by screen readers when reached in document flow
* To position off screen use: negative margin; negative top, right, bottom, left

Eg.

    #offscreen
    {
        position: absolute;
        left: -10000px;
        top: auto;
        width: 1px;
        height: 1px;
        overflow: hidden;
    }

Example:  
[style18.css](eg\style\style18.css)  
[visible.html](eg\visible.html)

Flexible Layouts
===

Overview
---

It's difficult to write applications that look good on a myriad of screen sizes and resolutions. CSS has features that make this easier: flexbox and media queries.  
__Flexbox__ allows you to create containers that will resize and rearrange according to the width of the page.  
__Media Queries__ allow you to apply specific styles to your page depending on what size your screen currently is.

Flexbox
---
One of the most powerful features of CSS is the flexbox. Flexbox allows divs to automatically fill in a section of the page given constraints. Flexboxes are appropriate to the following situations:
* You want elements to display alongside each other without caring about exact sizes.
* You want an element to take up the remaining space of its parent.
* You find yourself calculating the pixels required to make elements not overflow.

A flex box consists of two types of elements, the flex container and flex items. Flex items will resize and move within the parent container.

    #parent
    {
        display: flex;
    }

    #red
    {
        flex: 1 0 0px;
    }

### Flex Containers
There are a variety of different CSS properties that can be used to modify a flex container. Properties on the flex container will modify how flex items are positioned within the container.

#### Display: Flex
This defines an element as a flex container. All of this element's direct children then will be interpreted as flex items.

    .flexContainer
    {
        display: flex;
    }

#### flex-direction
Flex direction defines what direction flex items will be placed within the flex container. Default is row.

| CSS Property | Result |
| - | - |
| `flex-direction: row` | flex items will be arranged left to right |
| `flex-direction: row-reverse` | flex items will be arranged right to left |
| `flex-direction: column` | flex items will be arranged top to bottom |
| `flex-direction: column-reverse` | flex items will be arranged bottom to top |

#### flex-wrap
Flex wrap defines whether flex items should wrap to the next line when you run out of space. This is important when you're attempting to handle different screen sizes. Default is nowrap.

| CSS Property | Result |
| - | - |
| `flex-wrap:no-wrap` | all flex items will be on one line |
| `flex-wrap:wrap` | flex items will wrap onto multiple lines if there isn't enough space |
| `flex-wrap:wrap-reverse` | flex items will wrap onto multiple lines from bottom to top |


### Flex Items
While flex containers have properties that determine how their child items are arranged, flex items have properties that determine how an item will display.

#### flex
The main property for flex items is the flex property. The flex property is actually a shorthand for three other properties: flex-grow, flex-shrink, and flex-basis. Shorthand looks like this:

    .flexItem
    {
        flex: <flex-grow> <flex-shrink> <flex-basis>
    }

__flex-grow__ takes in a number that defines how this flex item should grow to fill space proportional to other flex items. If all flex items have a flex-grow of 1, the space in the flex container will be distributed evenly. If one has a flex-grow of 2, it will take up twice as much space as an item with a value of 1.

__flex-shrink__ works the same way as flex-grow, but defines how a flex item should shrink to fulfill space. Just like with flex-grow, if all items have a value of 1 they will shrink equivalently. If one item has a flex-shrink value of 2, it will shrink twice as much as an element with a flex-shrink value of 1.

__flex-basis__ defines the default width of an element before flex-grow and flex-shrink allow it to resize. Internet Explorer requires that value has a unit of measurement (px, %, vw, vh) specified with it.

Media Queries
---
Media queries allow CSS to optionally apply to a page depending on whether the current browser window matches a set of conditions. The following are common scenarios for media queries:
* Hiding printing elements
* Hiding certain elements on mobile
* Different styles if JavaScript is disabled
* Changing colors or design elements depending on the browser width

Media queries should not be used to change the layout depending on the screen size. Flexbox and other responsive techniques should be used for that task.

Apply style.css only if this page has a width less than 800px:


    <head>
        ...
        <link rel="stylesheet" media="screen AND (max-width: 800px) " type="text/css" href="style\style.css"/>
    </head>

Make the body background green only if this page has a width between 350px and 800px:

    @media screen AND (max-width: 800px) AND (min-width: 350px) {
        body {
            background: green;
        }
    }

### Media Features
Conditions can be tested on various parts of the browser. These testable variables are called media features. Below are the most common. Full list [here](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries#Media_features).


Media Feature|Summary
|-|-|
min-width|The minimum width this query will apply to
max-width|The maximum width this query will apply to.
min-height|The minimum height this query will apply to.
max-height|The maximum height this query will apply to.
orientation|Equal to "portrait" or "landscape" depending on the orientation of the device
screen|Boolean representing this page is being displayed on a screen
print|Boolean representing this page is being printed