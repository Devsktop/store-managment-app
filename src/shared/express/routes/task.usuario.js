const express = require('express');
const router = express.Router();
const mysqlConnection = require('../database');

//1.-Añadir Usuario http://localhost:3000/api/tasks/usuario
//Funciona
router.post('/usuario', (req, res) => {
  let { user, pass, adm, preg, resp } = req.body;
  const query = ` INSERT INTO usuario (Username, Password, Admin, Pregunta_Seg, Respuesta_Seg) VALUES ( ?, ?, ?, ?, ?);
     `;

  mysqlConnection.query(
    query,
    [user, pass, adm, preg, resp],
    (err, rows, fields) => {
      if (!err) {
        res.json({
          status: 'ok',
          id: rows.insertId
        });
      } else {
        res.json({
          status: 'error',
          err
        });
      }
    }
  );
});

//2.-Ver Usuario http://localhost:3000/api/tasks/usuario
//Funciona
router.get('/usuario', (req, res) => {
  mysqlConnection.query('SELECT * from usuario', (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

//3.-Borrar Producto ---> http://localhost:3000/api/tasks/usuario
//FUINCIONA
router.delete('/usuario', (req, res) => {
  const { id } = req.body;
  const query = `  DELETE FROM usuario WHERE Id_Usuario =(?);
     `;

  mysqlConnection.query(query, [id], (err, rows, fields) => {
    if (!err) {
      res.json({ status: 'ok' });
    } else {
      res.json({ status: 'error' });
    }
  });
});

//4.- Actualizar USUARIO---->http://localhost:3000/api/tasks/actusuario
//FUNCIONA
router.post('/actusuario', (req, res) => {
  let { id, user, adm } = req.body;
  const query = ` CALL ActUsuario(?, ?, ?);
     `;

  mysqlConnection.query(query, [id, user, adm], (err, rows, fields) => {
    if (!err) {
      res.json({ status: 'ok' });
    } else {
      res.json({ status: 'error', err });
    }
  });
});

//5.-Login  Paso#0----> http://localhost:3000/api/tasks/Login
//RECIBE: usuario y contraseña
//Si Coincide Retorna:--->Tipo de admin "Admin": "admin"
//Si NO Coincide Retorna: --->"resp": "Datos Invalidos"
router.post('/Login', (req, res) => {
  const { userN, pass } = req.body;

  const query = `CALL Login(?,?);`;

  mysqlConnection.query(query, [userN, pass], (err, rows, fields) => {
    let userdata;
    if (!err) {
      userdata = rows[0][0];

      console.log(userdata);

      res.json({ userdata });
      // Esta Repuesta Retorna: ---> "Admin":"admin"  En caso de haber coincidencia
      // No hay coincidencia:->"resp": "Datos Invalidos"

      // res.json(rows);  ASI ESTABA EXACTAMENTE ANTES Por si acaso, PERO en caso de no haber coincidencia RETORNA:--->"resp": "Datos Invalidos"
    } else {
      console.log(err);
    }
  });
});

// 6.-Verificar Usuario  PASO#1----> http://localhost:3500/api/tasks/verificarUser
router.post('/verificarUser', (req, res) => {
  const { userN } = req.body;

  const query = `  CALL Verificar_Usuario(?);
   `;
  //RECIBE:Username
  //Retorna: ID, Pregunta y Respuesta---
  //Si el Username no existe  RETORNA: NULL

  mysqlConnection.query(query, [userN], (err, rows, fields) => {
    let userdata;
    if (!err) {
      userdata = rows[0][0];
      //console.log(userdata);

      res.json({ userdata });
    } else {
      console.log(err);
    }
  });
});

//7.-Verificar Usuario PASO#2----> http://localhost:3500/api/tasks/verificarUser2
router.post('/verificarUser2', (req, res) => {
  const { userid, resp } = req.body;

  const query = `  CALL Verificar_Usuario2(?,?);
   `;
  //RECIBE: id y Respuesta
  //Retorna: "Respuesta Valida", Si  hay coincidencia
  //Si NO hay coincienciaRetorna: "Respuesta Invalida"

  mysqlConnection.query(query, [userid, resp], (err, rows, fields) => {
    let userdata;
    if (!err) {
      userdata = rows[0][0];
      // console.log(userdata);

      res.json({ userdata });
    } else {
      console.log(err);
    }
  });
});

//8.- Actualizar Contraseña---->http://localhost:3500/api/tasks/actPass
//FUNCIONA
router.post('/actPass', (req, res) => {
  let { C_user, pass } = req.body;
  const query = ` CALL ActPassword(?, ?);
     `;

  mysqlConnection.query(query, [C_user, pass], (err, rows, fields) => {
    if (!err) {
      res.json({
        status: 'ok'
      });
    } else {
      res.json({
        status: 'error'
      });
    }
  });
});

module.exports = router;
