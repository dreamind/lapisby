const blockTokenizer = require("./tokenizers/block");
const CUSTOM_BLOCKS = "customBlocks";
const FENCED_CODE = "fencedCode";

module.exports = function customPlugin() {
  const Parser = this.Parser;

  // Inject blockTokenizer
  const blockTokenizers = Parser.prototype.blockTokenizers;
  const blockMethods = Parser.prototype.blockMethods;
  blockTokenizers.customBlocks = blockTokenizer;
  blockMethods.splice(blockMethods.indexOf(FENCED_CODE) + 1, 0, CUSTOM_BLOCKS);
  // Inject into interrupt rules
  const interruptParagraph = Parser.prototype.interruptParagraph;
  const interruptList = Parser.prototype.interruptList;
  const interruptBlockquote = Parser.prototype.interruptBlockquote;
  interruptParagraph.splice(interruptParagraph.indexOf(FENCED_CODE) + 1, 0, [
    CUSTOM_BLOCKS,
  ]);
  interruptList.splice(interruptList.indexOf(FENCED_CODE) + 1, 0, [
    CUSTOM_BLOCKS,
  ]);
  interruptBlockquote.splice(interruptBlockquote.indexOf(FENCED_CODE) + 1, 0, [
    CUSTOM_BLOCKS,
  ]);
};
