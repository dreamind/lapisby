const fs = require('fs')
const { extend, get, each, keys } = require('lodash')
const unified = require('unified')
const yaml = require('yaml').parse
const pug = require('pug')
const Cite = require('citation-js')

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
      styles.add('../../../node_modules/' + codeTheme)
      // link(href="../../../node_modules/prismjs/themes/prism-dark.css", rel="stylesheet")
      // link(href="../../../node_modules/prism-themes/themes/prism-xonokai.css", rel="stylesheet")
    }
  }

  themeHandler({ theme, styles }) {
    if (theme && styles) {
      styles.add(theme + '/fonts.css')
      styles.add(theme + '/index.styl')
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
    let pugConf = confs.pug || {}
    let parcelConf = confs.parcel || {}
    let lapisbyConf = confs.lapisby || {}
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
      template,
      theme,
      codeTheme,
      title = 'Untitled',
      bibliography,
      frontmatter = {},
      scripts,
      styles,
      hasCode,
      hasMath,
      components
    } = data
    
    if (frontmatter) {
      this.styleHandler({ frontmatter, styles })
      this.scriptHandler({ frontmatter, scripts })
    }
    this.codeHandler({ hasCode, codeTheme, styles })
    this.mathHandler({ hasMath, styles })
    this.themeHandler({ theme, styles })

    each (keys(components), function (component) {
      const source = get(lapisbyConf, ['ext', component, 'cdn'])
      const script = get(source, 'js')
      const style = get(source, 'css')
      if (script) {
        scripts.add(script)
      }
      if (style) {
        styles.add(style)
      }    
    })
  
    if (lapisbyConf.templateEnabled && template) {
      const compiled = pug.compile(fs.readFileSync(template).toString(), {
        basedir: confs.basedir,
        compileDebug: false,
        filename: confs.name,
        pretty: !parcelConf.minify,
        filters: pugConf.filters,
        filterOptions: pugConf.filterOptions,
        filterAliases: pugConf.filterAliases,
      })
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
