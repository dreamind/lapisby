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
    // console.log('Processing', this.name)
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

  async getConfig(filenames, opts = {}) {
    console.log('<<<', this.name, filenames)
    if (opts.packageKey) {
      let pkg = await this.getPackage();
      if (pkg && pkg[opts.packageKey]) {
        return clone(pkg[opts.packageKey]);
      }
    }
    
    // Resolve the config file
    let conf = await config.resolve(opts.path || this.name, filenames);
    if (conf) {
      // Add as a dependency so it is added to the watcher and invalidates
      // this asset when the config changes.
      this.addDependency(conf, {includedInParent: true});
      if (opts.load === false) {
        return conf;
      }

      return config.load(opts.path || this.name, filenames);
    }

    return null;
  }

  getAllConfs() {
    // let pug = this.getExtConf('pug')
    let lapisby = this.getExtConf('lapisby').lapisby
    let parcel = this.options

    return {
      //pug,
      lapisby,
      parcel,
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
