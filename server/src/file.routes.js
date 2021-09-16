// efines routes for endpoints that is called from HTTP Client, 
// use controllers (along with middleware) to handle requests.

const express = require("express");
const router = express.Router();
const excelController = require("./excel.controller.js");
const upload = require("./upload.middleware.js");

let fileRoutes = (app) => {
  router.post("/upload", upload.single("file"), excelController.upload);
  router.get("/files", excelController.getFiles);
  router.get("/titels", excelController.getTitels);
  router.get("/:name", excelController.getData);
  
  app.use("/api/excel", router);
};

module.exports = fileRoutes;