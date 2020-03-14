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
          Status: ' Se ha Agregado  el Usuario:  ' + user + ' Correctamente.!'
        });
      } else {
        console.log(err);
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
  const { Id_Usuario } = req.body;
  const query = `  DELETE FROM usuario WHERE Id_Usuario =(?);
     `;

  mysqlConnection.query(query, [Id_Usuario], (err, rows, fields) => {
    if (!err) {
      res.json({ Status: 'Usuario Eliminado correctamente!' });
    } else {
      console.log(err);
    }
  });
});

//4.- Actualizar USUARIO---->http://localhost:3000/api/tasks/actusuario
//FUNCIONA
router.post('/actusuario', (req, res) => {
  let { C_user, user, pass, adm, preg, resp } = req.body;
  const query = ` CALL ActUsuario(?, ?, ?, ?, ?,?);
     `;

  mysqlConnection.query(
    query,
    [C_user, user, pass, adm, preg, resp],
    (err, rows, fields) => {
      if (!err) {
        res.json({
          Status: ' Se ha Actualizado el usuario:  ' + user + ' Correctamente.!'
        });
      } else {
        console.log(err);
      }
    }
  );
});

module.exports = router;
