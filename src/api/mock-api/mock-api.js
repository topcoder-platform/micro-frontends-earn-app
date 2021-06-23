/**
 * The mock APIs.
 */

const config = require("config");
const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const logger = require("../common/logger");
const _ = require("lodash");

const app = express();
app.set("port", config.MOCK_API_PORT || 4000);
app.use(express.json());
app.use(cors());
app.use(fileUpload());
app.use((req, res, next) => {
  logger.info({ component: "Mock Api", message: `${req.method} ${req.url}` });
  next();
});

app.get("/api/recruit/profile", (req, res) => {
  const result = {
    phone: "555-555-55-55",
    resume: "https://resume.topcoder.com/1234567",
    availibility: true,
  };
  res.status(200).json(result);
});

app.post("/api/recruit/profile", (req, res) => {
  res.status(204).end();
});

app.use((req, res) => {
  res.status(404).json({ error: "route not found" });
});

app.use((err, req, res, next) => {
  logger.logFullError(err, {
    component: "Mock Api",
    signature: `${req.method}_${req.url}`,
  });
  res.status(500).json({
    error: err.message,
  });
});

app.listen(app.get("port"), "0.0.0.0", () => {
  logger.info({
    component: "Mock Api",
    message: `Mock Api listening on port ${app.get("port")}`,
  });
});
