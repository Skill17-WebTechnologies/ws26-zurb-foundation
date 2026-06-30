// Zero-dependency static file server.
// Serves ./public and maps /vendor/<pkg>/... -> ./node_modules/<pkg>/...
const http = require('http')
const fs = require('fs')
const path = require('path')

const ROOT = __dirname
const PORT = process.env.PORT || 8080
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.map': 'application/json',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
}

http
  .createServer((req, res) => {
    let url = decodeURIComponent(req.url.split('?')[0])
    if (url === '/') url = '/index.html'
    const base = url.startsWith('/vendor/')
      ? path.join(ROOT, 'node_modules', url.slice('/vendor/'.length))
      : path.join(ROOT, 'public', url)
    const fp = path.normalize(base)
    // prevent path traversal outside the project
    if (!fp.startsWith(ROOT)) {
      res.writeHead(403)
      return res.end('Forbidden')
    }
    fs.readFile(fp, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' })
        return res.end('Not found')
      }
      res.writeHead(200, { 'Content-Type': TYPES[path.extname(fp)] || 'application/octet-stream' })
      res.end(data)
    })
  })
  .listen(PORT, '0.0.0.0', () => console.log(`static server on http://0.0.0.0:${PORT}`))
