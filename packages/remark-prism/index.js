const Prism = require("prismjs");
const escapeHtml = require("escape-html");
const visit = require("unist-util-visit");
const fs = require("fs");

// Load all prismjs languages
require("prismjs/components/index")();

// Highlight page-query and static-query in html
Prism.languages.html.graphql = {
  pattern: /(<(page|static)-query[\s\S]*?>)[\s\S]*?(?=<\/(page|static)-query>)/i,
  inside: Prism.languages.graphql,
  lookbehind: true,
  greedy: true,
};

function highlight({ value, lang, meta }, tag = "pre") {
  let url;
  let code;
  if (meta) {
    try {
      url = meta.match(/url=\"(.+)\"/)[1];
    } catch (e) {
      // pass
    }
  }
  if (url) {
    code = fs.readFileSync(url).toString();
  } else {
    code = value;
  }
  if (Prism.languages.hasOwnProperty(lang)) {
    code = Prism.highlight(code, Prism.languages[lang], lang);
  }
  if (!lang) {
    lang = "text";
    code = escapeHtml(code);
  }
  return `<${tag} class="language-${lang}">${code}</${tag}>`;
}

module.exports = () => tree => {
  visit(tree, "code", node => {
    node.type = "html";
    node.value = highlight(node, "pre");
  });

  visit(tree, "inlineCode", node => {
    node.type = "html";
    node.value = highlight(node, "code");
  });
};
