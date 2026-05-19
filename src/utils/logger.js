// Logger sencillo con niveles y marca de tiempo.
// Centraliza la salida para no dispersar llamadas a console por el código.

const formatear = (nivel, mensaje) => {
  const marcaTiempo = new Date().toISOString();
  return `[${marcaTiempo}] [${nivel}] ${mensaje}`;
};

const info = (mensaje) => {
  console.log(formatear('INFO', mensaje));
};

const warn = (mensaje) => {
  console.warn(formatear('WARN', mensaje));
};

const error = (mensaje, err) => {
  console.error(formatear('ERROR', mensaje));
  if (err && err.stack) {
    console.error(err.stack);
  }
};

module.exports = {
  info,
  warn,
  error,
};
