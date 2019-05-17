const visit = require("unist-util-visit");
const remove = require("unist-util-remove");
const { parse } = require("../common/propParser");

function md2html() {
  return function transformer(tree) {
    visit(tree, function visitor(node, index, parent) {
      if (!node.children || !parent) return;
      const data = parseMarkdown(node, index, parent, tree);

      if (data) {
        const { html, trailingText } = data;
        const children = parent.children;

        children[index] = {
          type: "html",
          value: html,
        };

        if (trailingText) {
          children[index + 1] = {
            type: "text",
            value: trailingText,
          };
        } else {
          remove(parent, children[index + 1]);
        }
      }
    });
  };
}

const BRACKETED = 1;
const TRAILING = 2;

function parseBracketed(node) {
  if (!node) {
    return null;
  }
  const value = node.value;
  if (!value) {
    return null;
  }
  return value.match(/\{(.+)\}(.*)/);
}

/*
 * if a bracket span statement is found: returns an object
 * with id, classList, attr, and children properties
 * else returns false
 */
function parseMarkdown(node, index, parent, tree) {
  const { type, children } = node;

  if (!children) return false;
  const siblings = parent.children;
  const sibling = siblings && siblings[index + 1];

  const matcher = sibling && parseBracketed(sibling);
  if (type && type === "linkReference" && matcher) {
    const text = children && children[0] && children[0].value;
    const data = parse(matcher[0]);

    data.text = text;
    data.trailingText = matcher[TRAILING];
    data.html = createSpan(data);
    return data;
  } else {
    return false;
  }
}

function createSpan(data) {
  const { classNames, text, id, attrs } = data;
  const classes = classNames ? classNames.join(" ") : "";

  const attributes = Object.keys(attrs)
    .map(function(key) {
      return `data-${key}="${attrs[key]}"`;
    })
    .join(" ");

  return `<span${id ? ` id="${id}"` : ""} ${
    classNames ? `class="${classes}"` : ""
  } ${attributes || ""}>${text}</span>`;
}

function html2md() {
  return function transformer(tree) {
    visit(tree, visitor);
  };

  function visitor(node, index, parent) {
    const { tagName, properties, children } = node;

    if (
      tagName &&
      tagName === "span" &&
      properties &&
      (properties.className || properties.id || hasDataAttr(properties))
    ) {
      const props = properties;
      let text = "[" + children[0].value + "]{";
      const attrs = [];
      if (props.id) {
        attrs.push("#" + props.id);
        delete props.id;
      }

      if (props.className) {
        attrs.push(
          props.className
            .map(function(name) {
              return "." + name;
            })
            .join(" ")
        );
        delete props.className;
      }

      const dataKeys = Object.keys(props);

      dataKeys.forEach(function(key) {
        const attrkey = key.replace("data", "").toLowerCase();
        attrs.push(attrkey + "=" + props[key]);
      });

      text += attrs.join(" ") + "}";

      parent.children[index] = {
        type: "text",
        value: text.trim(),
      };
    }
  }
}

function hasDataAttr(props) {
  if (!props) return false;
  const keys = Object.keys(props);
  const l = keys.length;

  if (!l) return false;
  for (let i = 0; i < l; i++) {
    const key = keys[i];
    if (key.indexOf("data") === 0) {
      return true;
    }
  }
  return false;
}

/* clean up md output */
function mdVisitors() {
  const processor = this;
  const Compiler = processor.Compiler;
  const visitors = Compiler.prototype.visitors;
  const text = visitors.text;

  /* Add a visitor for `heading`s. */
  visitors.text = function(node, parent) {
    const { value } = node;
    const textMatch = value.match(/\[(.*?)\]/);
    const bracketMatch = value.match(/\{(.+)\}/);
    if (textMatch && bracketMatch) {
      node.value = value.replace(/\//g, "");
      return node.value.replace(/\/+?(?=\[)/g, "");
    } else {
      return text.apply(this, arguments);
    }
  };
}

module.exports = md2html;
md2html.html2md = html2md;
md2html.mdVisitors = mdVisitors;
md2html.parseMarkdown = parseMarkdown;
