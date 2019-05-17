const LF = '\n'
const BLOCK_TYPE = 'customleaf'
const { parse } = require('../../common/metaParser')

module.exports = function tokenizer (eat, value, silent, opts) {

  /* istanbul ignore if - never used (yet) */
  if (silent) return true

  const last = value.indexOf(LF)
  const eaten = value.substr(0, last + 1)
  const meta = parse(eaten)
  const add = eat(eaten)
  const exit = this.enterBlock()

  let className = []
  let data = {
    hName: 'div',
    hProperties: {},
  }

  if (meta) {
    if (meta.id) {
      data.id = meta.id
    }
    if (meta.classes) {
      className = meta.classes
    }
  }
  data.hProperties.className = className

  const contents = {
    type: `${BLOCK_TYPE}`,
    data: data
  }
  exit()

  return add(contents)
}