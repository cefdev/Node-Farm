const fs = require("fs");
const http = require("http");

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");

const templateOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, "utf-8");

// Create an HTTP server
const server = http.createServer((req, res) => {
  // Get the requested URL path
  const pathName = req.url;

  // Overview page
  if (pathName === "/" || pathName === "/overview") {
    res.writeHead(200, { 'Content-type': "text/html" })
    res.end(templateOverview);

    // Product page
  } else if (pathName === "/product") {
    res.end("Welcome to Product page");

    // API page
  } else if (pathName === "/api") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(data);

    // If the path doesn't match any of the above, return a 404 error

  } else {
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
