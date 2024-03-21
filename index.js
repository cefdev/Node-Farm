// Import required modules
const fs = require("fs");
const http = require("http");

// Read data from JSON file synchronously
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
// Parse JSON data
const parsedData = JSON.parse(data);

// Read templates synchronously
const templateOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, "utf-8");
const templateCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, "utf-8");

// Function to replace placeholders in template with product data
const replaceTemplate = (template, product) => {
  let output = template.replaceAll("{%PRODUCTNAME%}", product.productName);
  output = output.replaceAll("{%FROM%}", product.from);
  output = output.replaceAll("{%NUTRIENTS%}", product.nutrients);
  output = output.replaceAll("{%QUANTITY%}", product.quantity);
  output = output.replaceAll("{%PRICE%}", product.price);
  output = output.replaceAll("{%IMAGE%}", product.image);
  output = output.replaceAll("{%DESCRIPTION%}", product.description);
  output = output.replaceAll("{%ID%}", product.id);
  // If product is not organic, add 'not-organic' class
  output = !product.organic ? output.replaceAll("{%NOT_ORGANIC%}", 'not-organic') : output;
  return output;
}

// Create an HTTP server
const server = http.createServer((req, res) => {
  // Get the requested URL path
  const pathName = req.url;

  // Overview page
  if (pathName === "/" || pathName === "/overview") {
    res.writeHead(200, { 'Content-type': "text/html" });

    // Create HTML for each product card
    const cardsHtml = parsedData.map(item => replaceTemplate(templateCard, item)).join("");

    // Replace placeholder in overview template with product cards HTML
    const output = templateOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);
    res.end(output);

    // Product page
  } else if (pathName === "/product") {
    res.end("Welcome to Product page");

    // API page
  } else if (pathName === "/api") {
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
