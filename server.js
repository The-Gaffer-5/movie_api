const http = require('http'),
      fs = require('fs'),
      url = require('url');


      http.createServer((request, response) => {
        var addr = request.url,
          q = url.parse(addr, true),
          filePath = '';

  if (q.pathname.includes('documentation')) {
    filePath = (__dirname + '/documentation.html');
  } else {
    filePath = 'index.html';
  }

  fs.appendFile('log.txt', 'URL: ' + addr + '\nTimestamp: ' + new Date() + '\n\n', function(err){
    if (err) {
      console.log(err);
    }
      else{
        console.log('Added to log.');
      }
  });

  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end('Hello Node!\n');
}).listen(8080);

console.log('My first Node test server is running on Port 8080.');
