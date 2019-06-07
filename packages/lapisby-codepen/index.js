const { reduce } = require("lodash");
const short = require("short-uuid");

module.exports = function codepenGenerator(config, node) {
  let { id = short.generate(), data, classNames = "", slug, user } = config;
  let attributes = "";
  if (slug && user) {
    data = {
      "slug-hash": slug,
      user,
    };
  }
  if (data) {
    attributes = reduce(
      data,
      (result, value, key) => `${result} data-${key}="${value}"`,
      ""
    );
  }
  if (attributes.length) {
    attributes += " ";
  }

  node.type = "html";
  node.value = `
<div id="${id}" class="codepen ${classNames}" ${attributes}></div>`;
  node.data = undefined;
};
