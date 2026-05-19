const jwt = require('jsonwebtoken')
const config = require('../../config')

//----------------login----------------
//parametros
//user: usuario (email/customUser)
//pass: contraseña
exports.login = (req, res) => {
  const { user, pass } = req.body
  if (!user || !pass) {
    return res.json({
      msg: !user && !pass
        ? 'El usuario y la contraseña son requeridos'
        : !user
          ? 'Usuario requerido'
          : 'Contraseña requerida'
    })
  }
  req.getConnection((err, conn) => {
    conn.query(
      "SELECT * FROM users WHERE email = ?",
      [user],
      (err, result) => {
        console.log(err ? `Error login ${err}` : `SELECT * FROM users WHERE email = ${user}. Results: ${result.length}`);
        if (err) {
          //res.sendStatus(500)
          res.json({ err: 'Ocurrió un error' })
        } else if (result.length == 0) {
          res.json({ msg: 'Usuario no existe' })
        } else if (result[0].pass != pass) {
          res.json({ msg: 'Contraseña Incorrecta' })
        }
        //generate token
        jwt.sign({
          user: result[0]
        }, config.jwt.secret, { expiresIn: config.jwt.expiresIn }, (err, token) => {
          res.json({
            token
          })
        })
      }
    );
  });
};

//Authorization: Bearer <token>
exports.verifyToken = (req, res, next) => {
  let bearerHeader = req.headers['authorization']
  //verificar si el token existe
  if (typeof bearerHeader !== 'undefined') {
    bearerToken = bearerHeader.split(" ")[1]
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(404)
  }
}
