const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const myconn = require("express-myconnection");

const { corsSetting, connectionDataBase, portServer } = require("./config");

const app = express();

// Enables CORS
app.use(cors(corsSetting));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Conexion a base de datos
app.use(myconn(mysql, connectionDataBase, "single"));

app.use(express.static(path.join(__dirname, './public'))); // ruote public server

//Puerto
app.set("port", portServer);
app.listen(app.get("port"), () => {
  console.log("server running on port", app.get("port"));
});

app.use("/server", require("./src/routes/default.route"));
