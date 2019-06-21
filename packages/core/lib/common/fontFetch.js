const download = require('github-download-parts');

// async
function fetch (fonts, target) {
  fonts.forEach(async (font) => {
    // await
    download(font.repo, target + '/' + font.name, font.path)
  })  
}

module.exports = fetch