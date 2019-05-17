const path = require('path')
const cosmiconfig = require('cosmiconfig')
const { extend } = require('lodash')
const { Asset } = require('parcel-bundler')
let MarkdownProcessor = require('../../processors/markdown')

class MarkdownAsset extends Asset {
  constructor(name, options) {
    super(name, options)

    this.type = 'html'
    this.processor = new MarkdownProcessor()
    this.hmrPageReload = true
    this.confs = {}
  }

  getExtConf(moduleName) {
    let conf = this.confs[moduleName]
    if (conf) {
      return conf
    } else {
      conf = {}
    }
    
    const explorer = cosmiconfig(moduleName)
    const config = explorer.searchSync().config

    if (config) {
      this.confs[moduleName] = config
      conf = config
    } 
    return conf
  }

  getAllConfs() {
    let pug = this.getExtConf('pug')
    let lapisby = this.getExtConf('lapisby').lapisby
    let parcel = this.options

    return {
      pug, lapisby, parcel
    }
  }

  async generate() {
    let name = this.name
    let basedir = path.dirname(this.name)
    let confs = extend(this.getAllConfs(), { basedir, name })

    let r = await this.processor.generate(this.contents, confs)

    return [
      {
        type: 'html',
        value: r.html,
      },
    ]
  }
}

module.exports = MarkdownAsset
