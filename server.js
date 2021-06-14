/* global process */

const express = require("express");

const app = express();

app.use("/earn-app/api",function (req, res) {
  res.send("hello earn-app API");
});

app.use("/earn/api", function (req, res) {
  res.send("hello earn API");
});

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
require("./src/api/bootstrap");
// Register routes
require("./src/api/app-routes")(app);
app.get("/", function (req, res) {
  res.send("alive");
});

const PORT = process.env.PORT || 8008;
app.listen(PORT);
console.log(`App is hosted on port ${PORT}.`); // eslint-disable-line no-console
