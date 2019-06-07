const { extend } = require('lodash')

const ATTRS_RE = /(.*)\{(.+)\}/
const ID_RE = /(\w*)#(\w+)/
const CLASS_RE = /\.\w+(-)?\w+/g
const KV_RE = /(?:\w*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^}\s]+))/g

/**
 * Extract HTML id, class and attribute in markdown
 *
 * @param str String "#id .class1 .class2 attr1=val1 attr2=val2"
 */
function extract(str) {
  let idMatch = str.match(ID_RE)
  let classMatch = str.match(CLASS_RE)
  let kvMatch = str.match(KV_RE)
  let data = {
    attrs: {},
    classNames: []
  }

  if (idMatch) {
    data.elementName = idMatch[1]
    data.id = idMatch[2]
  }

  if (classMatch) {
    data.classNames = classMatch.map((cls) => cls.replace('.', ''))
  }

  if (kvMatch) {    
    kvMatch.map(function (item) {
      let split = item.split('=')
      let key = split[0].trim()
      let val = split[1].trim().replace(/["']/g, '')
      data.attrs[key] = val
    })
  }
  return data
}

/**
 * Parse HTML id, class and attribute in markdown
 *
 * @param str String "name {#id .class1 .class2 attr1=val1 attr2=val2}"
 */
function parse(str) {
  let attrsMatch = str.match(ATTRS_RE)
  if (attrsMatch) {
    return extend({ leading: attrsMatch[1] }, extract(attrsMatch[2]))
  }
  return null
}

module.exports = {
  parse
}