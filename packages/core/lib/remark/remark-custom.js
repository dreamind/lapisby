const blockTokenizer  = require('./customs/block')

const { parse } = require('../common/metaParser')
const LF = '\n'
const BLOCK = 'BLOCK', SIDENOTE = 'SIDENOTE', MARGINNOTE = 'MARGINNOTE'
const MARKERS = {
  [BLOCK]: { begin: ':::', end: ':::' },
  [SIDENOTE]: { begin:'+<<', end:'+>>', classes: ['note', 'sidenote']}, // counter
  [MARGINNOTE]: { begin:'|<<', end: '|>>', classes: ['note', 'marginnote']}
}

module.exports = function blockPlugin () {

  function detectMarker (value) {
    for (let key in MARKERS) {
      let marker = MARKERS[key]
      if (value.startsWith(marker.begin)) {
        return Object.assign({ key }, marker)
      }
    }
    return null
  }

  function leafTokenizer (eat, value, silent) {

    const last = value.indexOf(LF)
    const eaten = value.substr(0, last + 1)

    let meta = parse(eaten)
    const blockType = 'generic'

    /* istanbul ignore if - never used (yet) */
    if (silent) return true
    // const linesToEat = []
    // const content = []

    // let idx = value.indexOf(LF)
    // const next = value.indexOf(LF, idx + 1)
    // either slice until next NEWLINE or slice until end of string
    // const lineToEat = next !== -1 ? value.slice(idx + 1, next) : value.slice(idx + 1)
    //linesToEat.push(lineToEat)
    //content.push(lineToEat)
    // value = value.slice(idx + 1)
    // const contentString = content.join(LF)
    const stringToEat = eaten
    const add = eat(stringToEat)
    const exit = this.enterBlock()
    let className = []
    let data = {
      hName: 'div',
      hProperties: {
      },
    }
    if (meta) {
      if (meta.id) {
        data.id = meta.id
      }
      if (meta.classes) {
        className = meta.classes
      }
    }
    // if (marker.classes) {
    //   className = className.concat(['testtest'])
    // }
    data.hProperties.className = className
    const contents = {
      type: `${blockType}CustomLeaf`,
      //children: this.tokenizeBlock(contentString, now),
      data: data
    }
    exit()

    return add(contents)
  }

  function blockTokenizer2 (eat, value, silent) {
    const now = eat.now()
    const marker = detectMarker(value)

    if (value.match(/^::[^:]/)) {
      return (leafTokenizer.bind(this, eat, value, silent))()
    }
    if (!marker) return
    const last = value.indexOf(LF)
    const eaten = value.substr(0, last + 1)

    let meta = parse(eaten)
    const blockType = 'generic'

    /* istanbul ignore if - never used (yet) */
    if (silent) return true
    const linesToEat = []
    const content = []

    let idx
    while ((idx = value.indexOf(LF)) !== -1) {
      const next = value.indexOf(LF, idx + 1)
      // either slice until next NEWLINE or slice until end of string
      const lineToEat = next !== -1 ? value.slice(idx + 1, next) : value.slice(idx + 1)
      if (lineToEat.startsWith(marker.end)) {
        linesToEat.push(lineToEat)
        value = value.slice(idx + 1)
        break
      }
      // remove leading `FENCE ` or leading `FENCE`
      linesToEat.push(lineToEat)
      content.push(lineToEat)
      value = value.slice(idx + 1)
    }
    const contentString = content.join(LF)
    const stringToEat = eaten + linesToEat.join(LF)
    const add = eat(stringToEat)
    const exit = this.enterBlock()
    let className = []
    let data = {
      hName: 'div',
      hProperties: {
      },
    }
    if (meta) {
      if (meta.id) {
        data.id = meta.id
      }
      if (meta.classes) {
        className = meta.classes
      }
    }
    if (marker.classes) {
      className = className.concat(marker.classes)
    }
    data.hProperties.className = className
    const contents = {
      type: `${blockType}CustomBlock`,
      children: this.tokenizeBlock(contentString, now),
      data: data
    }
    exit()

    return add(contents)
  }

  const Parser = this.Parser

  // Inject blockTokenizer
  const blockTokenizers = Parser.prototype.blockTokenizers
  const blockMethods = Parser.prototype.blockMethods
  blockTokenizers.customBlocks = blockTokenizer
  blockMethods.splice(blockMethods.indexOf('fencedCode') + 1, 0, 'customBlocks')
  // Inject into interrupt rules
  const interruptParagraph = Parser.prototype.interruptParagraph
  const interruptList = Parser.prototype.interruptList
  const interruptBlockquote = Parser.prototype.interruptBlockquote
  interruptParagraph.splice(interruptParagraph.indexOf('fencedCode') + 1, 0, ['customBlocks'])
  interruptList.splice(interruptList.indexOf('fencedCode') + 1, 0, ['customBlocks'])
  interruptBlockquote.splice(interruptBlockquote.indexOf('fencedCode') + 1, 0, ['customBlocks'])
}