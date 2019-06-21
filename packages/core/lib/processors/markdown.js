const fs = require('fs')
const { extend, get, each, isString } = require('lodash')
const unified = require('unified')
const yaml = require('yaml').parse
const pug = require('pug')
const Cite = require('citation-js')
const gitCopy = require('github-download-parts');

const markdown = require('remark-parse')
const remarkMath = require('remark-math')
const remarkKatex = require('remark-html-katex')
const remarkHTML = require('remark-html')
const remarkFront = require('remark-frontmatter')
const remarkFrontExtract = require('remark-extract-frontmatter')
const remarkAttr = require('remark-attr')
const remarkEmoji = require('remark-emoji')
const remarkSpans = require('@lapisby/remark-inline')
const remarkCustom = require('@lapisby/remark-custom')
const remarkPrism = require('@lapisby/remark-prism')
const remarkLapisby = require('../remark/remark-lapisby')
const inspector = require('../remark/remark-inspector')
const localRequire = require('parcel-bundler/src/utils/localRequire')
// const remarkHighlightX = require('../remark/remark-ext-code')

const BIB_MARKER = '<h2>References</h2>'

class MarkdownProcessor {
  constructor() {
    this.confs = {}
  }

  styleHandler({ frontmatter, styles }) {
    const userStyles = frontmatter.styles
    if (!userStyles) {
      return
    }
    userStyles.forEach(s => {
      styles.add(s)
    })
  }

  scriptHandler({ frontmatter, scripts }) {
    const userScripts = frontmatter.scripts
    if (!userScripts) {
      return
    }
    userScripts.forEach(s => {
      scripts.add(s)
    })
  }

  mathHandler({ hasMath, styles }) {
    if (hasMath) {
      // styles.add('../../../node_modules/katex/dist/katex.css')
      
      let style = get(this.confs.lapisby, 'ext.katex.cdn.css')
      if (style) {
        styles.add(style)
      }
    }
  }

  codeHandler({ hasCode, codeTheme, styles }) {
    if (hasCode) {
      console.log(codeTheme)
      //styles.add(codeTheme)
      styles.add('/../node_modules/' + codeTheme)
      // link(href="../../../node_modules/prismjs/themes/prism-dark.css", rel="stylesheet")
      // link(href="../../../node_modules/prism-themes/themes/prism-xonokai.css", rel="stylesheet")
    }
  }

  fontsHandler({ typefaces, styles }) {
    if (typefaces && styles) {

      typefaces.forEach((font) => {
        styles.add( '/resources/fonts/' + font + '/fonts.css')
        // if (!theme.startsWith('.') && !theme.startsWith('/')) {
        //   styles.add('/../node_modules/' + theme + '/index.styl')
        // } else {
        //   styles.add(theme + '/index.styl')
        // }      
      })
      // console.log(theme + '/fonts.css')
      // styles.add(theme + '/fonts.css')
    }
  }

  async themeHandler({ theme, styles, target }) {
    if (theme && styles) {
      // console.log(theme + '/fonts.css')
      // styles.add(theme + '/fonts.css')
      if (!theme.startsWith('.') && !theme.startsWith('/')) {
        styles.add('/../node_modules/' + theme + '/index.styl')
        // let y = await localRequire(theme)
        // console.log(y)
        //console.log('theme', theme)
        let themeModule = await localRequire(theme, 'node_modules')
        let fonts = themeModule && themeModule.fonts
        if (fonts) {
          let resourcePath = get(this.confs.lapisby, 'resourcePath')
          let rootDir = get(this.confs.parcel, 'rootDir')
          each(fonts, async function(font) {
            console.log(font.repo, rootDir + '/' + resourcePath + '/fonts/' + font.name, font.path)
            await gitCopy(font.repo, rootDir + '/' + resourcePath + '/fonts/' + font.name, font.path)
            styles.add( '/' + resourcePath + '/fonts/' + font.name + '/fonts.css')
          })          
        }
      } else {
        styles.add(theme + '/index.styl')
      }     
    }
  }

  templateHandler({ theme, styles }) {
    if (theme && styles) {
      styles.add(theme + '/fonts.css')
      styles.add(theme + '/index.styl')
    }
  }

  bibiliographyHandler({ theme, styles }) {
    if (theme && styles) {
      styles.add(theme + '/fonts.css')
      styles.add(theme + '/index.styl')
    }
  }

  async generate(contents, confs = {}) {
    let pugConf = confs.pug
    let parcelConf = confs.parcel || {}
    let lapisbyConf = confs.lapisby || {}
    let { resourcePath } = lapisbyConf
    let { rootDir } = parcelConf
    this.confs = confs

    let data = {
      scripts: new Set(),
      styles: new Set(),
      components: {},
      template: null,
      theme: null,      
      codeTheme: null,
      bibliography: null,
      frontmatter: null,
      hasMath: false,
      hasCode: false,
    }

    const processor = unified()
      .use(markdown)
      .use(remarkFront, ['yaml', 'toml'])
      .use(remarkFrontExtract, { yaml: yaml })
      .use(remarkLapisby, {
        confs,
        data,
      })
      .use(remarkSpans)
      .use(remarkAttr)
      //.use(remarkHighlightX)
      .use(remarkMath)
      .use(inspector, { data })
      .use(remarkKatex)
      .use(remarkPrism)
      .use(remarkCustom)
      .use(remarkEmoji)
      .use(remarkHTML)

    let body = processor.processSync(contents).toString()
    let html
    let {
      template = __dirname + '../templates/default.pug',
      theme = 'lapisby/lib/themes/default',
      codeTheme = 'prism-themes/themes/prism-xonokai.css',
      title = 'Untitled',
      bibliography,
      frontmatter = {},
      scripts,
      styles,
      hasCode,
      hasMath,
      components
    } = data
    // Note that 'theme' and 'codeTheme' are using parcel path 
    // resolution, while 'template' is resolved internally
    
    let typefaces
    if (frontmatter) {
      typefaces = frontmatter.typefaces
      this.styleHandler({ frontmatter, styles })
      this.scriptHandler({ frontmatter, scripts })
    }
    this.codeHandler({ hasCode, codeTheme, styles })
    this.mathHandler({ hasMath, styles })
    if (typefaces) {
      // this.fontsHandler({ typefaces, styles })  
    }
    await this.themeHandler({ theme, styles })

    each (components, function (config, component) {
      const source = get(lapisbyConf, ['ext', component, 'cdn'])
      const { version } = config
      let script = get(source, 'js')
      if (!isString(script)) {        
        if (!version) {
          version = 'default'
        }
        script = script[version]
      }
      let style = get(source, 'css')
      if (script) {
        scripts.add(script)
      }
      if (style) {
        styles.add(style)
      }
    })
  
    if (lapisbyConf.templateEnabled && template) {      
      const pugOpts = {
        basedir: confs.basedir,
        compileDebug: false,
        filename: confs.name,
        pretty: !parcelConf.minify,
      }
      if (pugConf) {
        merge(pugOpts, {
          filters: pugConf.filters,
          filterOptions: pugConf.filterOptions,
          filterAliases: pugConf.filterAliases    
        })
      }
      const compiled = pug.compile(fs.readFileSync(template).toString(), pugOpts)
      html = compiled({
        title,
        body,
        frontmatter,
        scripts: Array.from(scripts),
        styles: Array.from(styles),
      })
    } else {
      html = body
    }

    if (lapisbyConf.bibliographyEnabled && bibliography) {
      let cite = new Cite()
      let parseAsync = Cite.parse.input.async.chain
      let bibtex = fs.readFileSync(data.bibliography).toString()
      bibtex = bibtex.replace(/\s\s+/g, ' ')
      await parseAsync(bibtex).then(function(citations) {
        cite.set(citations)
        html = html.replace(
          BIB_MARKER,
          BIB_MARKER +
            cite
              .format(
                'bibliography',
                extend(
                  {
                    prepend(entry) {
                      return `<a name="${entry.id}"></a>`
                    },
                  },
                  lapisbyConf.citation
                )
              )
              .replace(
                /(https?:\/\/[^/]+(\/[\.\w-]+)+)/g,
                '<a href="$1">$1</a>'
              )
        )
      })
    }

    return {
      html,
      template,
    }
  }
}

module.exports = MarkdownProcessor
