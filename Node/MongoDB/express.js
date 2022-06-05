const http = require("http");

http
  .createServer((req, res) => {
    console.log(req);
    console.log("Run on browser request");
    // nodejs
    // res.write("<h1>Home Page</h1>");
    
  })
  .listen(8080);
