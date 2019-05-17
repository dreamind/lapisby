const fs = require("fs");
const unified = require("unified");
const path = require("path");
const test = require("tape");
const remark = require("remark");
const toHTML = require("remark-html");
const toMarkdown = require("remark-stringify");
const rehype = require("rehype");
const rehype2remark = require("rehype-remark");
const HtmlDiffer = require('@markedjs/html-differ').HtmlDiffer
const inline = require("../index");

function isEqual(html1, html2) {
  let htmlDiffer = new HtmlDiffer({ ignoreWhitespaces: true });
  return htmlDiffer.isEqual(html1, html2)
}

test("simple span", function(t) {
  const md = fs.readFileSync(path.join(__dirname, "simple.md"), "utf8");
  const html = remark()
    .use(inline)
    .use(toHTML)
    .processSync(md)
    .toString();
  const expectedHTML = fs.readFileSync(
    path.join(__dirname, "simple.html"),
    "utf8"
  );
  const outputMD = rehype()
    .use(inline.html2md)
    .use(rehype2remark)
    .use(toMarkdown)
    .use(inline.mdVisitors)
    .processSync(html)
    .toString();
  t.ok(isEqual(html, expectedHTML));
  t.equal(outputMD, md);
  t.end();
});

test("nested span", function(t) {
  const md = fs.readFileSync(path.join(__dirname, "nested.md"), "utf8");
  const html = remark()
    .use(inline)
    .use(toHTML)
    .processSync(md)
    .toString();
  const expectedHTML = fs.readFileSync(path.join(__dirname, "nested.html"), "utf8");
  const outputMD = rehype()
    .use(inline.html2md)
    .use(rehype2remark)
    .use(toMarkdown)
    .use(inline.mdVisitors)
    .processSync(html)
    .toString();
  t.ok(isEqual(html, expectedHTML));    
  t.equal(outputMD, md);
  t.end();
});
