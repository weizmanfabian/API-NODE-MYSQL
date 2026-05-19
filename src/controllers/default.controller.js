const msg = require("./msgController");
const jwt = require('jsonwebtoken');
const config = require('../../config');
const genericRepository = require('../repositories/generic.repository');

// Construye el título descriptivo según la cantidad de resultados.
const describeResultCount = (count) => {
  if (count === 0) {
    return 'Sin resultados';
  }
  return count === 1 ? '1 resultado' : `${count} resultados`;
};

//----------------create----------------
//parametros
//tabla: para saber cual tabla afectará
//body: todo el objeto que quiere insertar
exports.create = (req, res) => {
  jwt.verify(req.token, config.jwt.secret, async (err) => {
    if (err) {
      return res.sendStatus(403);
    }
    try {
      await genericRepository.insert(req.params.tabla, req.body);
      console.log(`${req.params.tabla} added!`);
      res.json({ msg: msg.create });
    } catch (error) {
      console.log(`Err INSERT INTO ${req.params.tabla}: ${error}`);
      res.json({ err: msg.errCreate });
    }
  });
};

//----------------delete----------------
//parametros
//tabla: para saber cual tabla afectará
//name: nombre del id o campo en la base de datos
//value: valor del campo a eliminar ej(123)
exports.delete = (req, res) => {
  jwt.verify(req.token, config.jwt.secret, async (err) => {
    if (err) {
      return res.sendStatus(403);
    }
    const { tabla, name, value } = req.params;
    try {
      await genericRepository.remove(tabla, name, value);
      console.log(`${tabla}.${name} = ${value} remove successfull!`);
      res.json({ msg: msg.delete });
    } catch (error) {
      console.log(`Error DELETE FROM ${tabla} WHERE ${name} = ${value}: ${error}`);
      res.json({ err: msg.errDelete });
    }
  });
};

//----------------findAll----------------
//parametros
//tabla: para saber cual tabla afectará
exports.findAll = (req, res) => {
  jwt.verify(req.token, config.jwt.secret, async (err) => {
    if (err) {
      return res.sendStatus(403);
    }
    try {
      const rows = await genericRepository.findAll(req.params.tabla);
      console.log(`${rows.length} results. SELECT * FROM ${req.params.tabla}`);
      res.json(rows);
    } catch (error) {
      console.log(`Err SELECT * FROM ${req.params.tabla}: ${error}`);
      res.json({ err: msg.errCreate });
    }
  });
};

//----------------searchBy consulta por un valor en especifico----------------
//parametros
//tabla: para saber cual tabla afectará
//name: nombre del campo a consultar en la base de datos
//value: valor del campo a consultar ej(123)
exports.searchBy = (req, res) => {
  jwt.verify(req.token, config.jwt.secret, async (err) => {
    if (err) {
      return res.sendStatus(403);
    }
    const { tabla, name, value } = req.params;
    try {
      const rows = await genericRepository.findBy(tabla, name, value);
      console.log(`SELECT * FROM ${tabla} WHERE ${name} = ${value} results: ${rows.length}`);
      msg.get.title = describeResultCount(rows.length);
      msg.get.icon = 'info';
      res.json({ rows, msg: msg.get });
    } catch (error) {
      console.log(`Err SELECT * FROM ${tabla} WHERE ${name} = ${value}: ${error}`);
      msg.get.title = 'Ha ocurrido un error al consultar los datos.';
      msg.get.icon = 'error';
      res.json({ err: msg.get });
    }
  });
};

//----------------update----------------
//parametros
//tabla: para saber cual tabla afectará
//name: nombre del id o campo en la base de datos
//value: valor del campo a actualizar ej(123)
//body: todo el objeto nuevo a actualizar
exports.update = (req, res) => {
  jwt.verify(req.token, config.jwt.secret, async (err) => {
    if (err) {
      return res.sendStatus(403);
    }
    const { tabla, name, value } = req.params;
    try {
      await genericRepository.update(tabla, name, value, req.body);
      console.log(`${tabla} Update!`);
      res.json({ msg: msg.update });
    } catch (error) {
      console.log(`Err UPDATE ${tabla} WHERE ${name} = ${value}: ${error}`);
      res.json({ err: msg.errUpdate });
    }
  });
};
