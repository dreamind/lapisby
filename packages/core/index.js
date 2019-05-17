const Bundler = require('parcel-bundler')
const { defaults } = require('lodash')
const path = require('path')
const arg = require('arg')
const cosmiconfig = require('cosmiconfig')

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

const DEFAULT_ENTRY = './src/index.html'
const CUSTOM_ASSETS_PATH = './lib/parcel/assets/'

async function main() {
  let options = {}
  let entryFiles = path.join(__dirname, DEFAULT_ENTRY)
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

  // Initializes a bundler using the entry files options provided
  const bundler = new Bundler(entryFiles, options)
  bundler.addAssetType(
    'md',
    require.resolve(CUSTOM_ASSETS_PATH + 'MarkdownAsset')
  )
  bundler.addAssetType(
    'html',
    require.resolve(CUSTOM_ASSETS_PATH + 'HTMLAsset')
  )

  if (args[BUILD]) {
    console.log('Building parcel')
    await bundler.bundle()
  } else {
    console.log('Serving parcel')
    bundler.serve()
  }
}

main()
