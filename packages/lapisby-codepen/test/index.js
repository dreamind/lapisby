const test = require("tape");
const yaml = require("yaml");
const fs = require("fs");
const codepenGenerator = require("../index");

test("typical", function(t) {
  const config = yaml.parse(fs.readFileSync(__dirname + '/sample.yaml').toString());
  const html = fs.readFileSync(__dirname + '/sample.html').toString();
  const node = {};
  codepenGenerator(config, node);
  t.equal(node.value.trim(), html.trim());
  t.equal(node.type, "html");
  t.equal(node.data, undefined);
  t.end();
});
