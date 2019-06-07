
module.exports = {
  plugins: [
    require("posthtml-include")({
      root: 'src'
    }),
    require('lapisby/lib/posthtml/posthtml-markdown/index.js')({
      root: 'src'
    })
  ]
};