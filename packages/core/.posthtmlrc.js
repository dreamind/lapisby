
module.exports = {
  plugins: [
    require("posthtml-include")({
      root: 'src'
    }),
    require('./lib/posthtml/posthtml-markdown/index.js')({
      root: 'src'
    })
  ]
};