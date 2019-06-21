const readdirp = require('readdirp')
const informer = require('font-informer')

async function main() {
  const files = await readdirp.promise('fonts', {
    fileFilter: ['*.ttf', '*.otf', '*.eot', '*.woff', '*.woff2'],
  })
  files.forEach(async file => {
    const { fullPath, path } = file
    try {
      if (fullPath) {
        const { name, weight, style, type } = await informer(fullPath)
        console.log(`${name}, ${weight}, ${style}, ${type}, ${path}`)
      }
    } catch (e) {
      console.log('Error', path, e)
    }
  })
}

module.exports = main

if (require.main === module) {
  main()
}
