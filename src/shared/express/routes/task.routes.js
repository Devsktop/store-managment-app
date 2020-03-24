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
          status: 'ok',
          id: rows.insertId
        });
      } else {
        res.json({
          status: 'error'
        });
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
  const { id } = req.body;
  const query = `  DELETE FROM producto WHERE producto.Id_Producto =(?);
     `;

  mysqlConnection.query(query, [id], (err, rows, fields) => {
    if (!err) {
      res.json({ status: 'ok' });
    } else {
      res.json({ status: 'error' });
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
          status: 'ok'
        });
      } else {
        res.json({
          status: 'error'
        });
      }
    }
  );
});

// 5.-Actualizar Dolar----> http://localhost:3000/api/tasks/actdolar
router.post('/actdolar', (req, res) => {
  const { Dolar } = req.body;
  const query = `  CALL ActDolar(?);
     `;

  mysqlConnection.query(query, [Dolar], err => {
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

//6.-Filtrar Resumen de Venta por Fecha----> http://localhost:3000/api/tasks/ResumenFecha
//Recibe: Fechas Desde Hasta
//Retorna: Resumen de Venta filtrada por las fechas ingresadas
router.post('/ResumenFecha', (req, res) => {
  const { Desde, Hasta } = req.body;
  const query = `  CALL Filtrar_Fecha(?,?);
     `;

  mysqlConnection.query(query, [Desde, Hasta], (err, rows, fields) => {
    if (!err) {
      res.json(rows);
      //res.json({Status: "RESUMEN DE VENTAS Desde:"+Desde+"-Hasta:"+Hasta});
    } else {
      console.log(err);
    }
  });
});

//7.-Filtrar Resumen de Venta por Fecha----> http://localhost:3000/api/tasks/RegistroFecha
//Recibe: Fechas Desde Hasta
//Retorna: Resumen de Venta filtrada por las fechas ingresadas
router.post('/RegistroFecha', (req, res) => {
  const { Desde, Hasta } = req.body;
  const query = `  CALL Facturas_Fecha(?,?);
     `;

  mysqlConnection.query(query, [Desde, Hasta], (err, rows, fields) => {
    if (!err) {
      res.json(rows);
      //res.json({Status: "REGISTRO DEL DIA Desde:"+Desde+"-Hasta:"+Hasta});
    } else {
      console.log(err);
    }
  });
});

//8.-Carrito de venta http://localhost:3000/api/tasks/carritoventa/////////////////////////////////////////////////////
router.post('/carritoventa', (req, res) => {
  let IDD = 0;
  // producst [ {id,cant}, ....]
  const { products, mt, obv } = req.body;
  const query = ` CALL Agregar_Venta(?, ?, ?);`;

  const query2 = ` CALL Ver_Registro(?);`;
  const dt = ` INSERT INTO resumen_venta ( Total_Venta, Total_Bs, Metodo_Pago, Observacion, Fecha, Total_Neto)  VALUES ( ?, ?, ?, ?, CURDATE(),?);
`;

  // Llamado#1 Base de Datos INSERT Detale_Venta + Procedure Agregar Venta
  mysqlConnection.query(dt, [0, 0, mt, obv, 0], (err, rows) => {
    if (!err) {
      IDD = rows.insertId;

      // LLAMADO #2 CON CICLO FOR Y MULTIPLES INSERTS
      products.forEach(({ id, cant }) => {
        mysqlConnection.query(query, [id, cant, IDD], () => {});
      });

      // LLAMADO#3  PARA RETORNAR ID Y TOTAL_NETO  de Resumen de ventas
      mysqlConnection.query(query2, IDD, (err2, rows, fields) => {
        if (!err2) {
          const netTotal = rows[0][0].Total_Neto;
          res.json({
            status: 'ok',
            id: IDD,
            netTotal
          });
        } else {
          console.log(err2);
        }
      });
    } else {
      res.json({
        status: 'error'
      });
    }
  });
}); //carritoventa

//9.-Ver Ventas ----> http://localhost:3000/api/tasks/Ver_Venta
//Recibe: Id de registro de ventas
// Retorna:  Id_Venta,  Id_ResumenVenta,	Descripcion_P,	Precio_P,	Cantidad,	Total---> DE LAS VENTAS ASOCIADAS AL REGISTRO DE VENTAS

router.post('/Ver_Venta', (req, res) => {
  let { id } = req.body;
  const query = `  CALL Ver_Venta(?);
   `;

  mysqlConnection.query(query, [id], (err, rows, fields) => {
    if (!err) {
      const userdata = rows[0];
      res.json({
        status: 'ok',
        userdata
      });
    } else {
      res.json({
        status: 'error'
      });
    }
  });
});

//10.-Crear Backup ----> http://localhost:3000/api/tasks/Backup
//REQUIERE DEPENDENCIA:  npm install mysql-backup
//RECIBE: Ruta Destino donde se guardara el respaldo
router.post('/Backup', (req, res) => {
  let { ruta } = req.body;
  // let direc = "C:/Desktop/"
  const mysqlBackup = require('mysql-backup');
  var fs = require('fs');
  mysqlBackup({
    host: 'localhost',
    user: 'root',
    password: '',
    schema: true,
    data: true,
    database: 'vapersve',
    ifNotExist: true
  }).then(dump => {
    fs.writeFileSync(ruta + '/VapersBackup.sql', dump); //RUTA + NOMBRE DEL ARCHIVO SQL

    //console.log(dump);
  });
  res.json({ status: 'ok' });
});

// 11.-RESTORE ----> http://localhost:3000/api/tasks/Restore
// RECIBE RUTA DESTINO de donde esta ubicado el respaldo
router.post('/Restore', (req, res) => {
  let { ruta } = req.body;
  const database = 'vapersve'; // vapersve

  const mysql_import = require('mysql-import');
  const importer = new mysql_import({
    host: 'localhost',
    user: 'root',
    password: '',
    database
  });

  importer
    .import(ruta)
    .then(() => {
      res.json({ status: 'ok' });
    })
    .catch(err => {
      res.json({ status: 'error' });
      console.log(err);
    });
});

module.exports = router;
