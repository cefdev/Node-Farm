const fs = require("fs");
const http = require("http");

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");

// Create an HTTP server
const server = http.createServer((req, res) => {
  // Get the requested URL path
  const pathName = req.url;

  // Check the path and respond accordingly
  if (pathName === "/" || pathName === "/overview") {
    // If the path is "/" or "/overview", send a response for the Overview page
    res.end("Welcome to Overview page");
  } else if (pathName === "/product") {
    // If the path is "/product", send a response for the Product page
    res.end("Welcome to Product page");
  } else if (pathName === "/api") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(data);
  } else {
    // If the path doesn't match any of the above, return a 404 error
    res.writeHead(404, {
      "Content-Type": "text/html",
      "my-own-header": "papi header",
    });
    res.end("<h1 style='color: red'>Page not found !</h1>");
  }
});

// Start the server and listen on port 3000
server.listen(3000, "127.0.0.1", () => {
  console.log("Listening to requests on port 3000");
});
