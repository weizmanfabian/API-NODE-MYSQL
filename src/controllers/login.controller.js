const express = require('express');

const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const saltRounds = process.env.BCRYPT_SALTROUNDS;

//----------------get permisos ----------------
exports.getPermisos = (req, res) => {
	req.getConnection((err, conn) => {
		if (err) return res.send(err);
		console.log(req.params.idUser)
		conn.query(
			'SELECT perm.prm_id, perm.prm_parent, perm.prm_nom, perm.prm_url, perm.prm_comp, perm.prm_perm_father FROM perm INNER JOIN rol_perm ON rol_perm.rol_prm_prm_fk = perm.prm_id INNER JOIN rol ON rol_perm.rol_prm_rol_fk = rol.rol_id INNER JOIN usu ON usu.usu_rol_fk = rol.rol_id WHERE usu.usu_id = ? ORDER BY perm.prm_nom ASC',
			[req.params.idUser],
			(err, rows) => {
				if (err) {
					console.log('error SELECT * FROM tbl_permisos' + err);
					return res.send(err);
				} else {
					console.log('get tbl_permisos succesfull. Results: ' + rows.length);
					res.json(rows);
				}
			}
		);
	});
};

//----------------get Ciudades ----------------
exports.getCitys = (req, res) => {
	req.getConnection((err, conn) => {
		if (err) return res.send(err);
		conn.query(
			'SELECT city.city_nom FROM city	INNER JOIN rol_city	ON rol_city.rol_city_city_fk = city.city_id	INNER JOIN rol	ON rol_city.rol_city_rol_fk = rol.rol_id	WHERE rol.rol_id = ?	ORDER BY city.city_nom ASC',
			[req.params.idRol],
			(err, rows) => {
				if (err) {
					console.log('error SELECT * FROM city' + err);
					return res.send(err);
				} else {
					console.log('get citys succesfull. Results: ' + rows.length);
					res.json(rows);
				}
			}
		);
	});
};

exports.postLogin = (req, res) => {
	const user = req.params.user;
	const password = req.params.pass;
	req.getConnection((err, conn) => {
		req.loggedIn = false;
		if (err) return res.send(err);
		conn.query('SELECT * FROM usu WHERE usu_id = ?', [user], (err, result) => {
			if (err) {
				res.send({ err: err });
			}
			if (result.length > 0) {
				bcrypt.compare(password, result[0].usu_key, (error, response) => {
					if (response) {
						console.log('bcrypt ok');
						req.session.user = result;

						// res.redirect('/');
						res.send(result);
					} else if (password != result[0].usu_key) {
						console.log(password + ' != ' + result.usu_key);
						res.send({ msg: 'Usuario y/o contraseña incorrectos!' });
					} else {
						req.session.user = result;
						req.loggedIn = true;
						res.send(result);
						// res.redirect('/');
					}
					console.log("Start req.session.user = ")
					console.log(req.session.user);
					console.log("End req.session.user")
				});
			} else {
				res.send({ msg: 'Usuario no existe' });
			}
		});
	});
};

//login
exports.getLogin = (req, res) => {
	if (req.session.user) {
		console.log("hay usuario en sesion")
		res.send({ loggedIn: true, user: req.session.user });
	} else {
		console.log("NO hay usuario en sesion")
		res.send({ loggedIn: false });
	}
};

//
exports.cerrarSesion = (req, res) => {
	req.session.user = '';
	res.send({ loggedIn: false })
};


exports.register = (req, res) => {
	const user = req.params.user;
	const password = req.params.pass;
	req.getConnection((err, conn) => {
		const username = req.body.user;
		const password = req.body.pass;
		bcrypt.hash(password, saltRounds, (err, hash) => {
			if (err) {
				console.log(err);
			}

			db.query(
				'INSERT INTO userPrueba(cc, fullName, user, pass) VALUES (?,?,?,?)',
				[req.body.cc, req.body.fullName, username, hash],
				(err, result) => {
					if (err) console.log(err);
					res.send({ msg: 'user add!' });
				}
			);
		});
	});
};
