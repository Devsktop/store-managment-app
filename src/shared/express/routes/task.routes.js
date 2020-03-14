const express = require('express');
const router = express.Router();
const mysqlConnection = require('../database');

//Rutas o Endpoints

//CRUD PRODUCTO

//1.-Añadir Producto http://localhost:3000/api/tasks/producto
router.post('/producto', (req, res) => {
  const { desc, precio, stock, cat, precio_c } = req.body;
  const query = ` INSERT INTO producto (Descripcion_P, Precio_P, Stock, Categoria, Precio_Compra) VALUES ( ?, ?, ?, ?, ?);
     `;

  mysqlConnection.query(
    query,
    [desc, precio, stock, cat, precio_c],
    (err, rows, fields) => {
      if (!err) {
        res.json({
          Status: ' Se ha Agregado  el producto:  ' + desc + ' Correctamente.!'
        });
      } else {
        console.log(err);
      }
    }
  );
});

//2.-Ver Producto http://localhost:3000/api/tasks/producto
router.get('/producto', (req, res) => {
  mysqlConnection.query('SELECT * from producto', (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

//3.-Borrar Producto ---> http://localhost:3000/api/tasks/producto
router.delete('/producto', (req, res) => {
  const idprod = req.body;
  const query = `  DELETE FROM producto WHERE producto.Id_Producto =(?);
     `;

  mysqlConnection.query(query, [idprod], (err, rows, fields) => {
    if (!err) {
      res.json({ Status: 'Producto Eliminado correctamente!' });
    } else {
      console.log(err);
    }
  });
});

//4.- Actualizar PRODUCTO---->http://localhost:3000/api/tasks/actproducto
router.post('/actproducto', (req, res) => {
  const { cp, des, pre, cant, cat, pre_com } = req.body;
  const query = ` CALL ActProducto(?, ?, ?, ?, ?,?);
     `;

  mysqlConnection.query(
    query,
    [cp, des, pre, cant, cat, pre_com],
    (err, rows, fields) => {
      if (!err) {
        res.json({
          Status: ' Se ha Actualizado el producto:  ' + des + ' Correctamente.!'
        });
      } else {
        console.log(err);
      }
    }
  );
});

// 5.-Actualizar Dolar----> http://localhost:3000/api/tasks/actdolar
router.post('/actdolar', (req, res) => {
  const { Dolar } = req.body;
  const query = `  CALL ActDolar(?);
     `;

  mysqlConnection.query(query, [Dolar], (err, rows, fields) => {
    if (!err) {
      res.json({ Status: 'Precio del dolar asignado correctamente!' });
    } else {
      console.log(err);
    }
  });
});

//5.-Filtrar Resumen de Venta por Fecha----> http://localhost:3000/api/tasks/ResumenFecha
//Recibe: Fechas Desde Hasta
//Retorna: Resumen de Venta filtrada por las fechas ingresadas
router.post('/ResumenFecha', (req, res) => {
  const { Desde, Hasta } = req.body;
  const query = `  CALL Filtrar_Fecha(?,?);
     `;

  mysqlConnection.query(query, [Desde, Hasta], (err, rows, fields) => {
    if (!err) {
      res.json(rows);
      //res.json({Status: "Resumen de ventas Desde:"+Desde+"-Hasta:"+Hasta});
    } else {
      console.log(err);
    }
  });
});

//5.-Filtrar Resumen de Venta por Fecha----> http://localhost:3000/api/tasks/RegistroFecha
//Recibe: Fechas Desde Hasta
//Retorna: Resumen de Venta filtrada por las fechas ingresadas
router.post('/RegistroFecha', (req, res) => {
  const { Desde, Hasta } = req.body;
  const query = `  CALL Facturas_Fecha(?,?);
     `;

  mysqlConnection.query(query, [Desde, Hasta], (err, rows, fields) => {
    if (!err) {
      res.json(rows);
      //res.json({Status: "Resumen de ventas Desde:"+Desde+"-Hasta:"+Hasta});
    } else {
      console.log(err);
    }
  });
});

//Carrito de http://localhost:3000/api/tasks/carritoventa/////////////////////////////////////////////////////
router.post('/carritoventa', (req, res) => {
  let IDD = 0;
  const lista = ([{ codp, cantp, mt, obv }] = req.body);
  const query = ` CALL Agregar_Venta(?, ?, ?);
    `;
  const dt = ` INSERT INTO resumen_venta ( Total_Venta, Total_Bs, Metodo_Pago, Observacion, Fecha, Total_Neto)  VALUES ( ?, ?, ?, ?, CURDATE(),?);
`;

  //Llamado Base de Datos INSERT Detale_Venta + Procedure Agregar Venta
  mysqlConnection.query(
    dt,
    [0, 0, lista[0].mt, lista[0].obv, 0],
    (err, rows) => {
      if (!err) {
        IDD = rows.insertId;

        for (let i = 0; i < lista.length; i++) {
          //LLAMADO #2 CON CICLO FOR Y MULTIPLES INSERTS
          mysqlConnection.query(
            query,
            [lista[i].codp, lista[i].cantp, IDD],
            () => {}
          );
        }
        res.json({ Status: ' Venta #' + IDD + ' Registrada Correctamente.!' });
      } else {
        // console.log("ERROR");
      }
    }
  );
});

//.- Login----> http://localhost:3500/api/tasks/Login
//Recibe: Username y Password
//Retorna: filas de la basede datos
router.post('/Login', (req, res) => {
  //res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  //res.header('Access-Control-Allow-Headers', 'Content-Type');

  const { user, pass } = req.body;
  const query = `  CALL verificar_usuario(?,?);
     `;

  mysqlConnection.query(query, [user, pass], (err, rows, fields) => {
    if (!err) {
      res.json(rows);
      console.log(rows);
      //   res.json({
      //     Status: 'Resumen de ventas Desde:' + user + '-Hasta:' + pass
      //   });
    } else {
      console.log(err);
    }
  });
});

module.exports = router;
