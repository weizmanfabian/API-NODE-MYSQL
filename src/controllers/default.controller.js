const express = require("express");
const msg = require("./msg.controller");

//----------------create----------------
//parametros
//tabla: para saber cual tabla afectará
//body: todo el objeto que quiere insertar
exports.create = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query(
      "INSERT INTO " + req.params.tabla + " set ?",
      [req.body],
      (err, rows) => {
        console.log(
          err
            ? "Err INSERT INTO " + req.params.tabla + " " + err
            : req.params.tabla + " added!"
        );
        res.json(err ? { err: msg.errCreate } : { msg: msg.create });
      }
    );
  });
};

//----------------delete----------------
//parametros
//tabla: para saber cual tabla afectará
//name: nombre del id o campo en la base de datos
//value: valor del campo a eliminar ej(123)
exports.delete = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query(
      "DELETE FROM " + req.params.tabla + " WHERE " + req.params.name + " = ?",
      [req.params.value],
      (err, rows) => {
        console.log(
          err
            ? "Error DELETE FROM " +
            req.params.tabla +
            " WHERE " +
            req.params.name +
            " = " +
            req.params.value +
            " " +
            err
            : req.params.tabla +
            "." +
            req.params.name +
            " = " +
            req.params.value +
            " remove successfull!"
        );
        res.json(err ? { err: msg.errDelete } : { msg: msg.delete });
      }
    );
  });
};

//----------------searchBy consulta por un valor en especifico----------------
//parametros
//tabla: para saber cual tabla afectará
//name: nombre del campo a consultar en la base de datos
//value: valor del campo a consultar ej(123)
exports.searchBy = (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);
    conn.query(
      "SELECT * FROM " +
      req.params.tabla +
      " WHERE " +
      req.params.name +
      " = ?",
      [req.params.value],
      (err, rows) => {
        console.log(
          err
            ? "Err SELECT * FROM " +
            req.params.tabla +
            " WHERE " +
            req.params.name +
            " = " +
            req.params.value +
            " " +
            err
            : "SELECT * FROM " +
            req.params.tabla +
            " WHERE " +
            req.params.name +
            " = " +
            req.params.value +
            " results: " +
            rows.length
        );
        msg.get.title = err
          ? "Ha ocurrido un error al consultar los datos."
          : rows.length == 0
            ? "Sin resultados"
            : rows.length == 1
              ? rows.length + " resultado"
              : rows.length + " resultados";

        msg.get.icon = err ? "error" : "info";

        res.json(err ? { err: msg.get } : { rows: rows, msg: msg.get });
      }
    );
  });
};

//----------------searchByDate----------------
//parametros
//tabla: para saber cual tabla afectará
//nameFecha: nombre del campo fecha en la base de datos
//fechaIni: Fecha Inicial a consultar
//fechaFin: Fecha Final a consultar
//adicional1: Enviar 1 si va a tener en cuenta, de lo contrario 0.
//nameAdicional1: nombre del campo a consultar en la base de datos. Si no enviar 0. /${0}
//type1: corresponde al operador que quiere  comparar ej (>, <, =, LIKE, etc)
//valueAdicional1: valor del campo a consultar ej(123). Si no enviar 0
//adicional2: Enviar 1 si va a tener en cuenta, de lo contrario 0.
//nameAdicional2: nombre del campo a consultar en la base de datos. Si no enviar 0. /${0}
//type2: corresponde al operador que quiere  comparar ej (>, <, =, LIKE, etc)
//valueAdicional2: valor del campo a consultar ej(123). Si no enviar 0
//adicional3: Enviar 1 si va a tener en cuenta, de lo contrario 0.
//nameAdicional3: nombre del campo a consultar en la base de datos. Si no enviar 0. /${0}
//type3: corresponde al operador que quiere  comparar ej (>, <, =, LIKE, etc)
//valueAdicional3: valor del campo a consultar ej(123). Si no enviar 0
//adicional4: Enviar 1 si va a tener en cuenta, de lo contrario 0.
//nameAdicional4: nombre del campo a consultar en la base de datos. Si no enviar 0. /${0}
//type4: corresponde al operador que quiere  comparar ej (>, <, =, LIKE, etc)
//valueAdicional4: valor del campo a consultar ej(123). Si no enviar 0
exports.searchByDate = (req, res) => {
  let newSql1 =
    req.params.adicional1 != 1
      ? ""
      : " AND " +
      req.params.nameAdicional1 +
      " " +
      req.params.type1 +
      (req.params.type1 === "LIKE" ? " '%" : " '") +
      req.params.valueAdicional1 +
      (req.params.type1 === "LIKE" ? "%'" : "'");
  let newSql2 =
    req.params.adicional2 != 1
      ? ""
      : " AND " +
      req.params.nameAdicional2 +
      " " +
      req.params.type2 +
      (req.params.type2 === "LIKE" ? " '%" : " '") +
      req.params.valueAdicional2 +
      (req.params.type2 === "LIKE" ? "%'" : "'");
  let newSql3 =
    req.params.adicional3 != 1
      ? ""
      : " AND " +
      req.params.nameAdicional3 +
      " " +
      req.params.type3 +
      (req.params.type3 === "LIKE" ? " '%" : " '") +
      req.params.valueAdicional3 +
      (req.params.type3 === "LIKE" ? "%'" : "'");
  let newSql4 =
    req.params.adicional4 != 1
      ? ""
      : " AND " +
      req.params.nameAdicional4 +
      " " +
      req.params.type4 +
      (req.params.type4 === "LIKE" ? " '%" : " '") +
      req.params.valueAdicional4 +
      (req.params.type4 === "LIKE" ? "%'" : "'");
  req.getConnection((err, conn) => {
    conn.query(
      "SELECT * FROM " +
      req.params.tabla +
      " WHERE " +
      req.params.nameFecha +
      " BETWEEN ? AND ?" +
      newSql1 +
      newSql2 +
      newSql3 +
      newSql4,
      [req.params.fechaIni, req.params.fechaFin],
      (err, rows) => {
        console.log(
          err
            ? "Err SELECT * FROM " +
            req.params.tabla +
            " WHERE " +
            req.params.nameFecha +
            " BETWEEN " +
            req.params.fechaIni +
            " AND " +
            req.params.fechaFin +
            newSql1 +
            newSql2 +
            newSql3 +
            newSql4 +
            " " +
            err
            : "SELECT * FROM " +
            req.params.tabla +
            " WHERE " +
            req.params.nameFecha +
            " BETWEEN " +
            req.params.fechaIni +
            " AND " +
            req.params.fechaFin +
            newSql1 +
            newSql2 +
            newSql3 +
            newSql4 +
            " Results: " +
            rows.length
        );

        msg.get.title = err
          ? "Ha ocurrido un error al consultar los datos."
          : rows.length == 0
            ? "Sin resultados"
            : rows.length == 1
              ? rows.length + " resultado"
              : rows.length + " resultados";

        msg.get.icon = err ? "error" : "info";

        res.json(err ? { err: msg.get } : { rows: rows, msg: msg.get });
      }
    );
  });
};

//----------------Update----------------
//parametros
//tabla: para saber cual tabla afectará
//name: nombre del id o campo en la base de datos
//value: valor del campo a eliminar ej(123)
//body: todo el objeto nuevo a actualizar
exports.update = (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);
    conn.query(
      "UPDATE " + req.params.tabla + " set ? WHERE " + req.params.name + " = ?",
      [req.body, req.params.value],
      (err, rows) => {
        console.log(
          err
            ? "Err UPDATE " +
            req.params.tabla +
            " set ? WHERE " +
            req.params.name +
            " = " +
            req.params.value +
            " " +
            err
            : req.params.tabla + " Update!"
        );
        res.json(err ? { err: msg.errUpdate } : { msg: msg.update });
      }
    );
  });
};

//----------------getData----------------
// sql: sql a ejecutar
exports.getData = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query(req.params.sql, (err, result) => {
      console.log(
        err
          ? "Err " + req.params.sql + err
          : req.params.sql + " results: " + result.length
      );
      msg.get.title = err
        ? "Ha ocurrido un error al consultar los datos."
        : result.length == 0
          ? "Sin resultados"
          : result.length == 1
            ? result.length + " resultado"
            : result.length + " resultados";

      msg.get.icon = err ? "error" : "info";

      res.json(err ? { err: msg.get } : { rows: result, msg: msg.get });
    });
  });
};
