const Prism = require('prismjs')
const ClipboardJS = require('clipboard')
require('prismjs/plugins/toolbar/prism-toolbar')
require('prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard')

// let self = window
//
// if (typeof self === 'undefined' || !self.Prism || !self.document) {
//   return
// }
//
// if (!Prism.plugins.toolbar) {
//   console.warn('Copy to Clipboard plugin loaded before Toolbar plugin.')
//
//   return
// }
//
// var callbacks = []
//
// Prism.plugins.toolbar.registerButton('copy-to-clipboard', function(env) {
//   var linkCopy = document.createElement('a')
//   linkCopy.textContent = 'Copy'
//
//   if (!ClipboardJS) {
//     callbacks.push(registerClipboard)
//   } else {
//     registerClipboard()
//   }
//
//   return linkCopy
//
//   function registerClipboard() {
//     var clip = new ClipboardJS(linkCopy, {
//       text: function() {
//         return env.code
//       },
//     })
//
//     clip.on('success', function() {
//       linkCopy.textContent = 'Copied!'
//
//       resetText()
//     })
//     clip.on('error', function() {
//       linkCopy.textContent = 'Press Ctrl+C to copy'
//
//       resetText()
//     })
//   }
//
//   function resetText() {
//     setTimeout(function() {
//       linkCopy.textContent = 'Copy'
//     }, 5000)
//   }
// })
