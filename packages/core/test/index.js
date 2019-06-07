const path = require('path')
const fs = require('fs')
const unified = require('unified')
const markdown = require('remark-parse')
var remark2rehype = require('remark-rehype')
const math = require('remark-math')
const katex = require('remark-html-katex')
const html = require('remark-html')
const rehype = require('remark-rehype')
const stringify = require('rehype-stringify')

const highlight = require('remark-highlight.js')
var frontmatter = require('remark-frontmatter')
const remarkCustomBlocks = require('remark-custom-blocks')
const extract = require('remark-extract-frontmatter')
const remarkAttr = require('remark-attr')
const remarkEmoji = require('remark-emoji')
let remarkSpans = require('./lib/remark/remark-divs')
remarkSpans = require('remark-bracketed-spans')
const yaml = require('yaml').parse
const pug = require('pug')


const processor = unified()
  .use(markdown)
  .use(remarkSpans)
  //.use(html)
  //.use(remark2rehype)
  .use(html)

let content = fs.readFileSync('src/content/page2/index.md').toString()
content = '[text in the span]{.classx .other-class key=val another=example}'
let result = processor.processSync(content).toString()
console.log(result)
