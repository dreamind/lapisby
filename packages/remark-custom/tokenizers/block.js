const { extend } = require('lodash')
const { parse } = require("../../common/propParser");
const LF = "\n";
const LEAF_REGEX = /^::[^:]/;
const BLOCK = "block",
  SIDENOTE = "sidenote",
  MARGINNOTE = "marginnote";
const MARKERS = {
  [BLOCK]: { begin: ":::", end: ":::" },
  [SIDENOTE]: { begin: "+::", end: "+::", classNames: ["note", "sidenote"] }, // with counter support
  [MARGINNOTE]: {
    begin: "|::",
    end: "|::",
    classNames: ["note", "marginnote"],
  },
};

const leafTokenizer = require("./leaf");

function detectMarker(value) {
  for (let key in MARKERS) {
    const marker = MARKERS[key];
    if (value.startsWith(marker.begin)) {
      return Object.assign({ type: key }, marker);
    }
  }
  return null;
}

module.exports = function tokenizer(eat, value, silent) {
  const now = eat.now();
  const marker = detectMarker(value);

  if (value.match(LEAF_REGEX)) {
    return leafTokenizer.bind(this, eat, value, silent)();
  }
  if (!marker) return;
  const last = value.indexOf(LF);
  const eaten = value.substr(0, last + 1);

  const props = parse(eaten);
  const blockType = marker.type;

  /* istanbul ignore if - never used (yet) */
  if (silent) return true;
  const linesToEat = [];
  const content = [];
  let attributes = {};

  let idx;
  while ((idx = value.indexOf(LF)) !== -1) {
    const next = value.indexOf(LF, idx + 1);
    // either slice until next NEWLINE or slice until end of string
    const lineToEat =
      next !== -1 ? value.slice(idx + 1, next) : value.slice(idx + 1);
    if (lineToEat.startsWith(marker.end)) {
      linesToEat.push(lineToEat);
      value = value.slice(idx + 1);
      break;
    }
    // remove leading `FENCE ` or leading `FENCE`
    linesToEat.push(lineToEat);
    content.push(lineToEat);
    value = value.slice(idx + 1);
  }
  const contentString = content.join(LF);
  const stringToEat = eaten + linesToEat.join(LF);
  const add = eat(stringToEat);
  const exit = this.enterBlock();
  let className = [];
  let data = {
    hName: "div",
    hProperties: {},
  };
  if (props) {
    const { id, classNames, attrs } = props;
    if (id) {
      data.id = id;
      data.hProperties.id = id;
    }
    if (classNames) {
      className = classNames;
    }
    if (attrs) {
      attributes = Object.keys(attrs)
        .reduce(function(o, key) {
          o[`data-${key}`] = attrs[key];
          return o;
        }, {})
    }
  }
  if (marker.classNames) {
    className = className.concat(marker.classNames);
  }
  if (className.length) {
    data.hProperties.className = className;
  }  

  data.hProperties = extend(data.hProperties, attributes)

  const contents = {
    type: `${blockType}`,
    children: this.tokenizeBlock(contentString, now),
    data: data,
  };
  exit();

  return add(contents);
};
