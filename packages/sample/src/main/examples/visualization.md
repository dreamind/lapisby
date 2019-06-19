---
title: Window Title
authors:
  - Ivo Widjaja
  - Amadeus Huang
template: ./src/templates/user.pug
theme: /themes/user
codeTheme: prism-themes/themes/prism-xonokai.css
bibliography: ./src/resources/bibs/bibliography.bib
tags: [one, two]
scripts:
  - ../../lib/user.js
  - //d3js.org/d3.v3.min.js
  - ./../../resources/components/d3-collisions.js
obj:
  - prop1: val1
  - test2
---

Custom component
=============

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

``` lapisby {#x .shaded .fullwidth key=val}
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
```

Using external yaml

~~~
```yaml urlx="./srcx/content/page2/resources/plotly.yaml"
```
~~~

``` yaml url="./src/resources/codes/plotly.yaml"
```

``` lapisby src="./src/resources/codes/plotly.yaml"
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


<div id="d3"></div>