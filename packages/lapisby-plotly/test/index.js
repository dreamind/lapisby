const test = require("tape");
const yaml = require("yaml");
const fs = require("fs");
const plotlyGenerator = require("../index");

test("typical", function(t) {
  const config = yaml.parse(fs.readFileSync(__dirname + '/sample.yaml').toString());
  const html = fs.readFileSync(__dirname + '/sample.html').toString();
  const node = {};
  plotlyGenerator(config, node);
  t.equal(node.value.trim(), html.trim());
  t.equal(node.type, "html");
  t.equal(node.data, undefined);
  t.end();
});
