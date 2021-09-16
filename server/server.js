// initializes routes, runs Express app.

const express = require("express");
const session = require('express-session');
const app = express();

const cors = require('cors')
app.use(cors());

require('dotenv').config();
const db = require("./src/models.js");
const fileRoutes = require("./src/file.routes.js");
const userRoutes = require("./src/user.routes.js");
const boardsRoutes = require("./src/boards.routes.js");

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))

global.__basedir = __dirname + "/";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

fileRoutes(app);
userRoutes(app);
boardsRoutes(app);


db.sequelize.sync();
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

let port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Running at localhost:${port}`);
});