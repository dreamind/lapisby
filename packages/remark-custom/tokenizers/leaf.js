const LF = "\n";
const BLOCK_TYPE = "customleaf";
const { parse } = require("../../common/propParser");

module.exports = function tokenizer(eat, value, silent, opts) {
  /* istanbul ignore if - never used (yet) */
  if (silent) return true;

  const last = value.indexOf(LF);
  const eaten = value.substr(0, last + 1);
  const props = parse(eaten);
  const add = eat(eaten);
  const exit = this.enterBlock();

  let className = [];
  const data = {
    hName: "div",
    hProperties: {},
  };

  if (props) {
    const { id, classNames } = props;
    if (id) {
      data.id = id;
    }
    if (classNames) {
      className = classNames;
    }
  }
  data.hProperties.className = className;

  const contents = {
    type: `${BLOCK_TYPE}`,
    data: data,
  };
  exit();

  return add(contents);
};
