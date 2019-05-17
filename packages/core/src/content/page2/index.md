---
title: Window Title
authors:
- Ivo Widjaja
template: ./src/templates/main.pug
theme: /themes/default
codeTheme: prism-themes/themes/prism-xonokai.css
bibliography: ./src/content/page2/resources/bibliography.bib
people:
- Jon Schlinkert
- Brian Woodward
tags: [one, two]
scripts:
- ../../lib/sample.js 
obj:
- prop1: val1
- test2
---
Page Title: Life was like a box of chocolates; you never know what you’re gonna get.
==========

:::{.epigraph}
  The English language .. becomes ugly and inaccurate because our thoughts are foolish, but the slovenliness of our language makes it easier for us to have foolish thoughts.

  The English language .. becomes ugly and inaccurate because our thoughts are foolish, but the slovenliness of our language makes it easier for us to have foolish thoughts.

  [George Orwell, Politics and the English Language]{.footer}
:::

Heading 1: A rather lengthy heading should have consistent line-spacing with the body
------

[![npm][npm-image]][npm-url]

[npm-image]: https://img.shields.io/npm/v/remark-bracketed-spans.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/remark-bracketed-spans

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

> The English language .. becomes ugly and inaccurate because our thoughts are foolish, but the slovenliness of our language makes it easier for us to have foolish thoughts.
>
> The English language .. becomes ugly and inaccurate because our thoughts are foolish, but the slovenliness of our language makes it easier for us to have foolish thoughts.
>
> [George Orwell, Politics and the English Language]{.footer}

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

### Heading 1.1: Life was like a box of chocolates; you never know what you’re gonna get.

Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis `aute irure dolor` in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

#### Heading 1.1.1: Life was like a box of chocolates; you never know what you’re gonna get.

Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

Text Style
------

*This is italicized*, and so is _this_.
**This is bold**, and so is __this__.
Use ***italics and bold together*** if you ___have to___.

Table
------

From https://tree.taiga.io/support/misc/taiga-markdown-syntax/#inline

 Header 1  | Header 2
---------- | ----------
Cell 1.1   | Cell 1.2
Cell 2.1   | Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

:::{.table-class}
  | Header 1  | Header 2  |
  |---------- | ----------|
  | Cell 1.1  | Cell 1.2  |
  | Cell 2.1  | Cell 2.2  |
  | Cell 3.1  | Cell 3.2  |
:::

An example with inline Markdown.

| Header 1  | Header 2  |
|---------- | ----------|
| *Cell 1.1*  | http://cell12.com  |
| Cell 2.1  | ~~Cell 2.2~~  |


| First Header  | Second Header |
| ------------- | ------------- |
| Content Cell  | Content Cell  |
| Content Cell  | Content Cell  |


| Command | Description |
| --- | --- |
| $$ \displaystyle \int_{0}^{\infty} \frac{1}{x} $$ | List all new or modified files |
| ![Armenian Mountain](./images/mountain.jpg "Monastery"){#mountain .mountain-image prop=val} | Show file differences that haven't been staged |


| Command | Description |
| --- | --- |
| `git status` | List all *new or modified* files |
| `git diff` | Show file differences that **haven't been** staged |


| Left-aligned | Center-aligned | Right-aligned |
| :---         |     :---:      |          ---: |
| git status   | git status     | git status    |
| git diff     | git diff       | git diff      |


| Name     | Character |
| ---      | ---       |
| Backtick | `         |
| Pipe     | \|        |

List
------

Various forms of list:

- Unordered list using hyphen (-)
- Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
- Lorem ipsum dolor sit amet
- Lorem ipsum dolor sit amet

* Unordered list using asterisk (*)
* Lorem ipsum dolor sit amet
* Lorem ipsum dolor sit amet
* Lorem ipsum dolor sit amet

1. Lorem ipsum dolor sit amet
2. Lorem ipsum dolor sit amet
3. Lorem ipsum dolor sit amet, must have two blank lines to the next ordered list (must have two newlines before the next ordered list)


1. Lorem ipsum dolor sit amet $$ \displaystyle \int_{0}^{\infty} \frac{1}{x} $$
2. ![Armenian Mountain](./images/mountain.jpg "Monastery"){#mountain .mountain-image prop=val} Lorem ipsum dolor sit amet 

:::{.checklist}
  * Lorem ipsum dolor sit amet
  * Lorem ipsum dolor sit amet
  * Lorem ipsum dolor sit amet
:::

Nested list:

1.  Lists in a list item:

    - Indented four spaces.
      * indented eight spaces.
      * indented eight spaces.
    - Indented four spaces.
      * indented eight spaces.
    - Four spaces again.

    Lists in a list item:

    - Indented four spaces.
      * indented eight spaces.
      * indented eight spaces. (must have two new lines next)

2.  Single paragraphs in a list items:
    It's best to indent the paragraphs four spaces
    You can get away with three, but it can get
    confusing when you nest other things.
    Stick to four.

3.  Multiple paragraphs in a list items: It's best to indent the paragraphs four spaces
    You can get away with three, but it can get
    confusing when you nest other things.
    Stick to four.
 
    We indented the first line an extra space to align
    it with these paragraphs. In real use, we might do
    that to the entire list so that all items line up.
 
    This paragraph is still part of the list item, but it looks messy to humans. So it's a good idea to wrap your nested paragraphs manually, as we did with the first two.
 
4.  Blockquotes in a list item:
 
      > Skip a line and
      > indent the >'s four spaces.
 
5. Preformatted text in a list item:
 
        Skip a line and indent eight spaces.
        That's four spaces for the list
        and four to trigger the code block.

6.  Single paragraphs in a list items:
    1. x
    2. y
    3. z

Links and References
------

[page3](../page3/index.html){rel="external"}
[page5](../page5/index.pug)


Here's an inline link to [Google](http://www.google.com/).  
Here's a reference-style link to [Google][1].  
Here's a very readable link to [Yahoo!][yahoo].
Here's a [poorly-named link](http://www.google.com/ "Google"){.special}
Never write "[click here][^2]".
Visit [us][web].

  [1]: http://www.google.com/
  [yahoo]: http://www.yahoo.com/
  [^2]: http://www.w3.org/QA/Tips/noClickHere
        (Advice against the phrase "click here")
  [web]: https://stackoverflow.com/ "Stack Overflow"
    
Take me to [](#XieGXNJ18). Reference below [richard90]() or [richard90]{.test}. Reference below [@richard90]

Side note and margin note
------

|<<
sadsdsdasd `Some inline code`
TO DO: References on the side
|>>

+<<
Numbered $$ \displaystyle \int_{0}^{\infty} \frac{1}{x} $$
+>>

|<<
  See the [github repository](https://github.com/coppeliaMLA/glasseye){.spanclass1} for the source code</span>

  | First Header  | Second Header |
  | ------------- | ------------- |
  | Content Cell  | Content Cell  |
  | Content Cell  | $$ \displaystyle \int_{0}^{\infty} \frac{1}{x} $$  |
|>>

Oh, and here's a great quote[](){.sidenote-number} from this Wikipedia on
[salted duck eggs](http://en.wikipedia.org/wiki/Salted_duck_egg).

> A salted duck egg is a `Chinese preserved` food product made by soaking duck
> eggs in brine, or packing each egg in damp, salted charcoal. In Asian
> supermarkets, these eggs are sometimes sold covered in a thick layer of salted
> charcoal paste. The eggs may also be sold with the salted paste removed,
> wrapped in plastic, and vacuum packed. From the salt curing process, the
> salted duck eggs have a briny aroma, a gelatin-like egg white and a
> firm-textured, round yolk that is bright orange-red in color.

|<<
  See the [github repository](https://github.com/coppeliaMLA/glasseye) for the source code

  ~~~css
  body {
    color: red;
  }
  ~~~
|>>


+<<
  Counter to
+>>

Lorem[](){.sidenote-number} ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Images and Figures
------------------

Bitmap Image

![Armenian Mountain](./images/mountain.jpg "Monastery"){#mountain .mountain-image prop=val}

:::{.fullwidth}
![Armenian Mountain](./images/mountain.jpg "Monastery"){#mountain-full}
:::

SVG

![somehint](images/download.svg){ height=50, width=100 }

::image(./images/mountain.jpg "Monastery"){#mountain-figure .image height="20px"}

:::figure
::image(./images/mountain.jpg "Monastery"){#mountain-figure .image height="20px"}
Caption of the image
:::

Videos
------------------

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

<iframe width="560" height="315" src="https://www.youtube.com/embed/iG9CE55wbtY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

::youtube(iG9CE55wbtY "Monastery"){#mountain-full}
<iframe width="560" height="315" src="https://www.youtube.com/embed/iG9CE55wbtY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Block component
------------------

:::{#id .class1 .class2 attr1=val1 attr2=val2}
Excepteur sint occaecat cupidatat non proident+++, sunt in culpa qui officia deserunt mollit anim id est laborum.

* This however showed weasel
* Well uncritical so misled
  * this is very interesting
* Goodness much until that fluid owl

:::

Another logical block:

:::{.boxed}
  Excepteur sint occaecat cupidatat non proident+++, sunt in culpa qui officia deserunt mollit anim id est laborum.
  
  Emoji :dog:

  Katex ($C_L$)

  ~~~javascript
  const lineToEat = next !== -1 ? value.slice(idx + 1, next) : value.slice(idx + 1)
  ~~~
:::


Inline component
------------------

<style type="text/sass">
.spanclass
  color: blue
</style>

Hello, [text in the span]{#span_no_hyphen .spanclass .other-class key=val another=example} Lorem ipsum dolor sit amet.

Emoji
------------------

:dog: 



Custom component
------------------

Using code block

~~~yaml
id: 'test'
component: plotly
data: >
    [{
      x: [1, 2, 3, 4],
      y: [10, 15, 13, 17],
      mode: 'markers',
      type: 'scatter'
    },
    {
      x: [2, 3, 4, 5],
      y: [16, 5, 11, 9],
      mode: 'lines',
      type: 'scatter'
    },{
      x: [1, 2, 3, 4],
      y: [12, 9, 15, 12],
      mode: 'lines+markers',
      type: 'scatter'
    }]
~~~

```lapisby
id: 'test'
component: plotly
classNames: 'fullwidth'
data: >
    [{
      x: [1, 2, 3, 4],
      y: [10, 15, 13, 17],
      mode: 'markers',
      type: 'scatter'
    },
    {
      x: [2, 3, 4, 5],
      y: [16, 5, 11, 9],
      mode: 'lines',
      type: 'scatter'
    },{
      x: [1, 2, 3, 4],
      y: [12, 9, 15, 12],
      mode: 'lines+markers',
      type: 'scatter'
    }]
```

Using external yaml

```yaml url="./src/content/page2/resources/plotly.yaml"
```

```lapisby src="./src/content/page2/resources/plotly.yaml"
```

Using yaml

---
component: plotly
id: 'test2'
data: >
    [{
      x: [1, 2, 3, 4],
      y: [10, 15, 13, 17],
      mode: 'markers',
      type: 'scatter'
    },
    {
      x: [2, 3, 4, 5],
      y: [16, 5, 11, 9],
      mode: 'lines',
      type: 'scatter'
    },{
      x: [1, 2, 3, 4],
      y: [12, 9, 15, 12],
      mode: 'lines+markers',
      type: 'scatter'
    }]
---


Formula
------------------
    
Lift($L$) can be determined $L = \frac{1}{2}$ by Lift Coeeficient ($C_L$) like the following equation. Excepteur $\int_{0}^{\infty} \frac{1}{x}$ sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

$$ 
\int_{0}^{\infty} \frac{1}{x} 
$$

$$
L = \frac{1}{2} \rho v^2 S C_L 
$$


Code Block
------------------

Inline code block: `lorem` ipsum dolor sit amet, `consectetur adipiscing` elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

~~~js url="./src/content/page2/sample.js"
~~~

~~~css
h1 {
  color: red;
}
~~~

~~~javascript
const path = require('path');
const fs = require('fs');
const { Asset } = require('parcel-bundler');
const remark = require('remark')
const math = require('remark-math')
const katex = require('remark-html-katex')
const html = require('remark-html')
~~~


References
------------------