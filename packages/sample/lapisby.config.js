const codepenGenerator = require('@lapisby/generator-codepen')
const plotlyGenerator = require('@lapisby/generator-plotly')

module.exports = {
  // Entry point file location for parcel
  // OR: Multiple files with globbing: './src/*.js'
  // OR: Multiple files in an array: ['./src/index.html', './some/other/directory/scripts.js']
  // entryFiles: ['./src/index.html'],

  parcel: {
    outDir: './dist', // The out directory to put the build files in, defaults to dist
    outFile: 'index.html', // The name of the outputFile
    publicUrl: '/', // The url to server on, defaults to dist
    rootDir: './src',
    watch: true, // whether to watch the files and rebuild them on change, defaults to process.env.NODE_ENV !== 'production'
    cache: true, // Enabled or disables caching, defaults to true
    cacheDir: '.cache', // The directory cache gets put in, defaults to .cache
    contentHash: false, // Disable content hash from being included on the filename
    minify: false, // Minify files, enabled if process.env.NODE_ENV === 'production'
    scopeHoist: false, // turn on experimental scope hoisting/tree shaking flag, for smaller production bundles
    target: 'browser', // browser/node/electron, defaults to browser
    // https: { // Define a custom {key, cert} pair, use true to generate one or false to use http
    //   cert: './ssl/c.crt', // path to custom certificate
    //   key: './ssl/k.key' // path to custom key
    // },
    logLevel: 3, // 3 = log everything, 2 = log warnings & errors, 1 = log errors
    hmr: true, //Enable or disable HMR while watching
    hmrPort: 0, // The port the HMR socket runs on, defaults to a random free port (0 in node.js resolves to a random free port)
    sourceMaps: true, // Enable or disable sourcemaps, defaults to enabled (minified builds currently always create sourcemaps)
    hmrHostname: '', // A hostname for hot module reload, default to ''
    detailedReport: true, // Prints a detailed report of the bundles, assets, filesizes and times, defaults to false, reports are only printed if watch is disabled,
  },

  lapisby: {
    extSource: 'cdn',
    templateEnabled: true,
    bibliographyEnabled: true,
    citation: {
      format: 'html',
      template: 'apa',
      lang: 'en-US',
    },
    generators: {
      codepen: codepenGenerator,
      plotly: plotlyGenerator,
    },
    blocks: {
      epigraph: {
        classNames: ['epigraph'],
      },
      warning: {
        classNames: ['warning'],
      },
    },
    ext: {
      codepen: {
        cdn: {
          js: '//static.codepen.io/assets/embed/ei.js',
        }
      },
      katex: {
        cdn: {
          css: '//cdn.jsdelivr.net/npm/katex@0.10.0/dist/katex.min.css',
        },
        local: {
          css: 'lapisby/node_modules/katex/dist/katex.min.css'
        }
      },
      highlight: {
        cdn: {
          // '//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.13.1/styles/default.min.css'
          css:
            '//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.13.1/styles/monokai-sublime.min.css',
        },
        local: {
          css: 'lapisby/node_modules/highlight.js/styles/monokai-sublime.css'
        }
      },
      plotly: {
        cdn: {
          js: '//cdn.plot.ly/plotly-latest.min.js',
        },
        local: {
          js: './../../../lib/resources/js/stub/plotly.js',
        },
      },
    },
  },
}
