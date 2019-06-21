const Bundler = require('parcel-bundler')
const { defaults, map } = require('lodash')
const path = require('path')
const arg = require('arg')
const cosmiconfig = require('cosmiconfig')
const readdirp = require('readdirp');
// const downloader = require('./lib/fonts/downloader')

const BUILD = '--build'
const args = defaults(
  arg({
    [BUILD]: Boolean,
    '-b': BUILD,
  }),
  {
    [BUILD]: false,
  }
)

const DEFAULT_SOURCE = './src/'
const DEFAULT_ENTRY = DEFAULT_SOURCE + 'index.html'
const CUSTOM_ASSETS_PATH = './lib/parcel/assets/'

async function main() {
  
  // downloader()

  // let entryFiles = [ DEFAULT_ENTRY ];
  // Print out all md files along with their size within the current folder & subfolders.
  // await readdirp('./src', {fileFilter: '*.md', alwaysStat: true})
  //   .on('data', (entry) => {
  //     const {path, stats} = entry;
  //     console.log(path);
  //     entryFiles.push('.src/' + path)
  //   })
  //   // Optionally call stream.destroy() in `warn()` in order to abort and cause 'close' to be emitted
  //   .on('warn', error => console.error('non-fatal error', error))
  //   .on('error', error => console.error('fatal error', error))
  //   .on('end', () => console.log('done'));

  const files = await readdirp.promise(DEFAULT_SOURCE, {fileFilter: '*.md', alwaysStat: true});  
  let entryFiles = files.map(file => DEFAULT_SOURCE + file.path);
  entryFiles.push(DEFAULT_ENTRY)

  let options = {}
  // entryFiles = map(entryFiles, (entry) => path.join(__dirname, entry))
  const explorer = cosmiconfig('lapisby')
  const config = explorer.searchSync().config

  if (config) {
    if (config.entryFiles) {
      entryFiles = config.entryFiles
      console.log(`Found entryFiles: ${entryFiles}`)
    }
    if (config.parcel) {
      options = config.parcel
      console.log(`Found options`)
    }
  }

  console.log(entryFiles)

  // Initializes a bundler using the entry files options provided
  const bundler = new Bundler(entryFiles, options)
  bundler.addAssetType(
    'md',
    require.resolve(CUSTOM_ASSETS_PATH + 'MarkdownAsset')
  )
  bundler.addAssetType(
    'json', 
    require.resolve(CUSTOM_ASSETS_PATH + 'JSONAsset')
  )
  if (args[BUILD]) {
    console.log('Building parcel')
    await bundler.bundle()
  } else {
    console.log('Serving parcel')
    bundler.serve()
  }
}

module.exports = main

if (require.main === module) {
  main()
}
