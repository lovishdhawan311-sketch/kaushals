const http = require('http');
const fs = require('fs');
const path = require('path');

const root = __dirname;
const types = { '.css': 'text/css; charset=utf-8', '.html': 'text/html; charset=utf-8', '.js': 'application/javascript; charset=utf-8', '.webm': 'video/webm' };

http.createServer((request, response) => {
  const relativePath = request.url === '/' ? 'index.html' : decodeURIComponent(request.url.split('?')[0]).replace(/^\//, '');
  const filePath = path.resolve(root, relativePath);
  if (!filePath.startsWith(root)) return response.writeHead(403).end('Forbidden');
  fs.readFile(filePath, (error, content) => {
    if (error) return response.writeHead(404).end('Not found');
    response.writeHead(200, { 'Content-Type': types[path.extname(filePath)] || 'application/octet-stream' });
    response.end(content);
  });
}).listen(4173, '127.0.0.1', () => console.log('Local site: http://127.0.0.1:4173'));
