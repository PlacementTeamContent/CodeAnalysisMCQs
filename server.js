import http from 'http';

const server = http.createServer((req, res) => {
      res.writeHead(200, {'Content-Type': 'text/plain' });
      res.end('Hello, World!');
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Server listening on port 8000');
});