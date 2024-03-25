// Import required modules
const fs = require("fs");
const http = require("http");
const replaceTemplate = require("./modules/replaceTemplate")

// Read data from JSON file synchronously
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
// Parse JSON data
const parsedData = JSON.parse(data);

// Read templates synchronously
const templateOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, "utf-8");
const templateCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, "utf-8");
const templateProduct = fs.readFileSync(`${__dirname}/templates/product.html`, "utf-8");


// Create an HTTP server
const server = http.createServer((req, res) => {
  // Get the requested URL path and query params
  const { pathname, searchParams } = new URL(req.url, `http://${req.headers.host}`);

  // Overview page
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { 'Content-type': "text/html" });

    // Create HTML for each product card
    const cardsHtml = parsedData.map(item => replaceTemplate(templateCard, item)).join("");

    // Replace placeholder in overview template with product cards HTML
    const output = templateOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);
    res.end(output);

    // Product page
  } else if (pathname === "/product") {
    res.writeHead(200, { 'Content-type': "text/html" });

    // Get the query param 'id' from the URL
    const productId = searchParams.get('id')

    // Replace the Product HTML file with the selected product's data
    const output = replaceTemplate(templateProduct, parsedData[productId])

    res.end(output)

    // API page
  } else if (pathname === "/api") {
    // Respond with JSON data
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
