const express = require("express");
const cors = require("cors");
const path = require("path");

const { corsSetting, port } = require("./config");
const logger = require("./src/utils/logger");
const notFound = require("./src/middlewares/not-found.middleware");
const errorHandler = require("./src/middlewares/error-handler.middleware");

const app = express();

// Habilita CORS
app.use(cors(corsSetting));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "./public")));

// Rutas
app.use("/auth", require("./src/routes/auth.route"));
app.use("/server", require("./src/routes/default.route"));

// Manejo de rutas no encontradas y de errores (siempre al final)
app.use(notFound);
app.use(errorHandler);

app.set("port", port);
app.listen(port, () => {
  logger.info(`Servidor escuchando en el puerto ${port}`);
});

// Handlers globales para fallos no capturados
process.on("unhandledRejection", (reason) => {
  const error = reason instanceof Error ? reason : new Error(String(reason));
  logger.error("Promesa rechazada sin manejar", error);
});

process.on("uncaughtException", (error) => {
  logger.error("Excepción no capturada", error);
  process.exit(1);
});
