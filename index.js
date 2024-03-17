const fs = require("fs");
const http = require("http");

/* //////////// */
/* Blocking, Synchronous way */
/* //////////// */
/* 
// to read a file from the filesystem
const textInput = fs.readFileSync("./txt/input.txt", { encoding: "utf8" });

const textOut = `This is what we know about the avocado: ${textInput}.\nCreated on ${new Date().toLocaleDateString("en-GB")}`;

// to generate a file
fs.writeFileSync("./txt/output.txt", textOut, { encoding: "utf8" });
console.log("File was successfully written"); */

/* //////////// */
/* Non-blocking, Asynchronous way */
/* //////////// */

/* fs.readFile("./txt/start.txt", (err, data1) => {
  if (err) return console.log("Error 💥");

  fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
    fs.readFile(`./txt/append.txt`, "utf-8", (err, data3) => {
      fs.writeFile(
        `./txt/output-async.txt`,
        `${data2} \n${data3}`,
        "utf-8",
        (err) => {
          console.log("Your file has been successfully written 🎉");
        }
      );
    });
  });
});
 */

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
