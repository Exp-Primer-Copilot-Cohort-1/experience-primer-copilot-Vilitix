// Create web server
// 1. Create a web server
// 2. Handle root path
// 3. Handle comments path
// 4. Handle 404 path
// 5. Start listening

// 1. Create a web server
const http = require('http');
const fs = require('fs');
const url = require('url');
const port = 3000;

// 2. Handle root path
const server = http.createServer((req, res) => {
    const path = url.parse(req.url, true);
    const filename = "." + path.pathname;
    fs.readFile(filename, (err, data) => {
        if (err) {
            res.writeHead(404, {'Content-Type': 'text/html'});
            return res.end("404 Not Found");
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });
});

// 3. Handle comments path
server.on('request', (req, res) => {
    if (req.url === '/comments') {
        const path = url.parse(req.url, true);
        const filename = "." + path.pathname;
        fs.readFile(filename, (err, data) => {
            if (err) {
                res.writeHead(404, {'Content-Type': 'text/html'});
                return res.end("404 Not Found");
            }
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            return res.end();
        });
    }
});

// 4. Handle 404 path
server.on('request', (req, res) => {
    res.writeHead(404, {'Content-Type': 'text/html'});
    return res.end("404 Not Found");
});

// 5. Start listening
server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});