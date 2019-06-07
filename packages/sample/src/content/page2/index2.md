---
layout: templates/main.pug
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
# MARKDOWN

Lorem ipsum dolor sit amet, 
<span class="marginnotexxx">See the [github repository](https://github.com/coppeliaMLA/glasseye) for the source code</span> 
consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 

:::{#id .class1 .class2 attr1=val1 attr2=val2}
Excepteur sint occaecat cupidatat non proident+++, sunt in culpa qui officia deserunt mollit anim id est laborum.

+++
abc
:::

:::
See the [github repository](https://github.com/coppeliaMLA/glasseye) for the source code
:::

:::
hello
:dog: 
($C_L$)

~~~css
span {
  color: blue;
}
~~~
:::

<style type="text/sass">
.spanclass
  color: blue
</style>

Hello, [text in the span]{.spanclass .other-class key=val another=example} Lorem ipsum dolor sit amet.

:dog: 


~~~js
const path = require('path');
const fs = require('fs');
~~~

```lapisby
id: 'test'
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

![somehint](images/download.svg){ height=50, width=100 }

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

Content

[page3](../page3/index.html){rel="external"}
[page5](../page5/index.pug)

    
Lift($L$) can be determined by Lift Coeeficient ($C_L$) like the following equation.


$$ \displaystyle \int_{0}^{\infty} \frac{1}{x} $$

$$
L = \frac{1}{2} \rho v^2 S C_L 
$$


```js url="./src/content/page2/sample.js"
```

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