/* global process */
require("./src/api/bootstrap");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors({
  // Allow browsers access pagination data in headers
  exposedHeaders: ['X-Page', 'X-Per-Page', 'X-Total', 'X-Total-Pages', 'X-Prev-Page', 'X-Next-Page']
}))

// Register routes
require("./src/api/app-routes")(app);

app.use(
  "/earn-app",
  express.static("./dist", {
    setHeaders: function setHeaders(res) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
    },
  })
);
app.get("/", function (req, res) {
  res.send("alive");
});

const PORT = process.env.PORT || 8008;
app.listen(PORT);
console.log(`App is hosted on port ${PORT}.`); // eslint-disable-line no-console
