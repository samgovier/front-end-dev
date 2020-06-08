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

`head` tag - Defines the header portion of the document. Contains information about the document that's not part of the actual content. Must include the `title` element.

`meta` tag - Provides additional information about the document: this would come first in the header, and identifies content type and character set.
* `http-equiv="text"` indicates what will be described in the content attribute
* `content="text"` required, specifies the value of the meta element.

Eg:

    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />

`title` tag - required element of the header. Should be clear and descriptive. This is typically displayed in the browser tab.

`body` tag - Contains the document's content, which will be displayed visually.

`p` tag - Denotes a paragraph. May contain text and inline elements- not other block elements.

Comments
---

    <!-- Comment -->

__Element Types__
---

*Block Elements* - items that are followed by a line break.  
May contain text, other block elements, inline elements. Most are containers for other elements. This includes: `p, h1, h2, ol, ul, blockquote, table, div`

*Inline Elements* - exist inline with text, must be contained in a block element.  
May only contain text or other inline elements. No implied line breaks before or after. Includes: `br, em, strong, a, img, span`

Block Element Examples
---

`h#` tag - in the body, specifies a heading that briefly describes the section that follows. 1 is the biggest, 6 is the smallest. They should appear in order.


`blockquote` tag - Enclosed text is a quote block with 1+ paragraphs. Requires at least one block element. The block may be rendered indented.
* you can add `cite="URL"` that sources the quote, not visible

Inline Element Examples
---

`br` tag - inserts a line break. Always an empty element: `<br />`

`em` tag - emphasized text. Usually renders in italics.

`strong` tag - strongly emphasized text. Usually renders in bold.

Generic Elements
---

These elements don't have any intrinsic styling or meaning associated with them, they're just used to mark sections of content to either style them with CSS or manipulate them with JavaScript.

`div` tag - generic __block__ element

`span` tag - generic __inline__ element

Attributes - these attributes are common to all elements.  
* `id` - Assigns a unique identifying name to the element. Must be unique among all IDs in a document. Can be used to select specific elements to style.
* `class` - Assigns one or more classification names to the element separated by spaces, elements in *. Can be used to apply the same style to multiple elements.

Special Characters
===

Certain characters cannot be directly written because they have special meaning in HTML syntax. These characters need to be properly escaped to be safely included in content. Other characters have special behavior or a special glyph.

Escape Characters
---

To display the following characters, use the following HTML code.

| Character  | Code     |
|-|-|
| <          | `&lt;`   |
| >          | `&gt;`   |
| &          | `&amp;`  |
| "          | `&quot;` |
| ©          | `&copy;` |
| space (no break) | `&nbsp;` |

Numeric Character Reference (NCR)
---
Characters can also be inserted using the hexadecimal number from the character-set table.
* `&#xhhhh;` where hhhh is the hexadecimal equivalent of the character
    * `&#x20;` is a space
    * `&#x27;` is an apostrophe

Hyperlinks
===
`a` is for anchor. This is used for creating hyperlinks.

Attributes:
* `href="URL"` - specifies the destination URL
* `title="text"` - textual description of destination: displayed as a tooltip and can be read by screen readers.
* `id="name"` - create a named anchor that is used in a URL, docname#idName or just #idName in same document
* `target="text"` - specifies the name of the window where the target document should be displayed. "_blank" opens a new browser window (not valid on strict XHTML)

Link labels should be kept concise and meaningful. Titles should provide more information.

Images
===

`img` tag places an image on the page. Images are retrieved after the page is retrieved, and is always an empty element.

Attributes:
* `src="text"` - required, location of the graphic file to be displayed
* `title="text"` - for image tool-tip
* `alt="text"` - required, string of alternate text that appears when image is not displayed
* `height="#"` - specifies the height of the image in pixels, strongly recommended to speed up web page rendering
* `width="#"` - specifies the width of the image in pixels, strongly recommended to speed up web page rendering

Alternate text:
* Alternate text is read by screen readers.
* Communicate purpose of the graphic accurately and succinctly, *not* its appearance
* Use empty text for graphics that do not convey meaning
* Do not repeat adjacent text in alternate text
* Text can match text in graphic if this gives meaning
* Do not use "image of..." or "graphic of..."
* If image is a link, describe function of link, without "link to..." or "click to..."

Terms
---
__Lossless data compression__ = reduce the file size without degrading visual quality  
__Lossy data compression__ = reduce file size while degrading visual quality  
__Alpha Blending__ = process of combining an image with a background to create the appearance of partial transparency  
__Dithering__ = technique to create illusion of color depth with a limited color palette, colors not available are created by combining colors
* If limited color palette used image might appear grainy or speckled. several algorithms exist to perform dithering

Formats
---
__JPEG (Joint Photographic Experts Group)__ = Good for digital photos and complex graphics. Lots of colors, lossy format, no transparency, levels of compression determine quality  
__GIF (Graphics Interchange Format)__ = 8-bit-per-pixel bitmap image format, uses only 256 colors. Good for simple straight-edged logos and shapes with solid colors, lossless data compression, allows transparency on a per pixel basis - either on or off, uses dithering to improve image  
__PNG  (Portable Network Graphic)__ = Created to improve on and replace GIF. Lossless data compression, supports 24-bit color palettes, (or 8-bit which is same as GIF), allows alpha blending transparency, good for smooth lines

Lists
===

Two types used to group items into lists, made of one or more "list items".

* `ol` tag - an ordered (numbered) list
* `ul` tag - an unordered (bulleted) list
* `li` tag - what you put in the list. Contains text, inline elements, block elements

Tables
===
Tables are good for relationships in 2 or more dimensions, or a *data table*.  
Tables may also be used to algin form elements, or a *layout table*.

Tags are `table`, `tr` for table row, and `td` for table data.

* `table` tag, includes attribute: `summary="text"`, which provides an overview of table contents and can be screen read
* `caption` tab provides a summary of contents or purpose.
    * Must immediately follow the table start tag
    * Acts as a heading for the table
    * Useful on data tables to provide a table name
* `tr` tag - table row, contains no content other than table cells
* `td` tag - table data, which may contain any content
    * `colspan="#"` - specifies the number of columns to span
    * `rowspan="#'` - specifies the number of rows to span
    * `id="uniqueID"` - unique identifying name
    * `header="id references"` - lists header cells by id that provide header information for current cell
* `th` tag - header cell, provides important information on data tables
    * same attributes as data cells, plus
    * `scope="row/col/rowgroup/colgroup"` - specifies that a `th` element is a header for one or more rows or columns. Used by screen readers.

Use `id` with `headers` only when more than one column and one row header is needed to identify a cell header. Use `scope` when only one column and/or row header is needed to identify a cell header.

Forms
===
Form tags are used for data entry and input controls:
* `label` for a text label
* `input` for an area for text/option input
* `textarea` for a text box area
* `fieldset`/`legend`for focus boxes
* `select` / `option` for dropdown

Attributes make elements behave or render differently, eg. `input` can be a textbox, button, checkbox, or more.  
See below for example (rendered in actual HTML!)

    <h1>Example Form</h1>
    <form action="">
        <label for="txt1">Input text:</label>
        <input id="txt1" type="text" />
        <br />
        <label for="secret">Password input:</label>
        <input id="secret" type="password" />
        <br />
        <label for="txtarea">Text area:</label>
        <textarea id="txtarea" cols="20" rows="2"></textarea>
        <br />
        <br />
        <input id="chk1" type="checkbox" />
        <label for="chk1">Input check box 1</label>
        <br />
        <input id="chk2" type="checkbox" />
        <label for="chk2">Input check box 2</label>
        <br />
        <input id="chk3" type="checkbox" />
        <label for="chk3">Input check box 3</label>
        <br />
        <br />
        <fieldset>
            <legend>Radio buttons</legend>
            <input id="opt1" type="radio" name="opt" value="1" />
            <label for="opt1">Option 1</label>
            <br />
            <input id="opt2" type="radio" name="opt" value="2" />
            <label for="opt2">Option 2</label>
            <br />
            <input id="opt3" type="radio" name="opt" value="3" />
            <label for="opt3">Option 3</label>
        </fieldset>
        <br />
        <label for="choice">Select:</label>
        <select id="choice">
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
        </select>
        <br />
        <br />
        <input id="btn1" type="button" value="My Button" />
        <input id="btn3" type="reset" value="Reset" />
    </form>
