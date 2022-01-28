const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const myconn = require("express-myconnection");

// const bodyParser = require('body-parser')
const cookieParser = require("cookie-parser");
const session = require("express-session");

const bcrypt = require("bcrypt");
const { response } = require("express");
const saltRounds = 10;
const configuration = require("./config");

const app = express();

// --------------------------------------

// Enables CORS
app.use(cors(configuration.cors));

//
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

//Sesión
app.use(session(configuration.session));

//Conexion a base de datos
app.use(myconn(mysql, configuration.connectionDataBase, "single"));

//Puerto
app.set("port", process.env.PORT || configuration.portServer);
app.listen(app.get("port"), () => {
  console.log("server running on port", app.get("port"));
});

//routes
app.use("/", require("./src/routes/login.route"));
app.use("/server", require("./src/routes/default.route"));
