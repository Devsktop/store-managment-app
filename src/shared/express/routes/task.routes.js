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
  const query = ` CALL Agregar_Venta(?, ?, ?);
    `;

    const query2 = ` CALL Ver_Registro(?);
    `;

    
  const dt = ` INSERT INTO resumen_venta ( Total_Venta, Total_Bs, Metodo_Pago, Observacion, Fecha, Total_Neto)  VALUES ( ?, ?, ?, ?, CURDATE(),?);
`;

  // Llamado#1 Base de Datos INSERT Detale_Venta + Procedure Agregar Venta
  mysqlConnection.query(dt, [0, 0, mt, obv, 0], (err, rows) => {
    if (!err) {
      IDD = rows.insertId;

      products.forEach(({ id, cant }) => {
        // LLAMADO #2 CON CICLO FOR Y MULTIPLES INSERTS
        mysqlConnection.query(query, [id, cant, IDD], () => {});
      });
     /* res.json({
        status: 'ok',
        id: IDD
      });*/
        //LLAMADO#3  PARA RETORNAR ID Y TOTAL_NETO  de Resumen de ventas
      mysqlConnection.query(query2,IDD, (err, rows, fields) =>{
          let userdata;
       if (!err) {
           userdata=rows[0][0];
           console.log(userdata);
           res.json({userdata});
       
       } else {
           console.log(err);
       }
     });
  

    } else {
      res.json({
        status: 'error'
      });
    }
  });



});//carritoventa


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

      userdata = rows[0][0];
      res.json({ userdata });
    } else {
      console.log(err);
    }
  });
});

//10.-Crear Backup ----> http://localhost:3000/api/tasks/Backup
//REQUIERE DEPENDENCIA:  npm install mysql-backup
//RECIBE: Ruta Destino donde se guardara el respaldo
router.get('/Backup', (req, res) => {
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
    fs.writeFileSync(ruta + 'VapersBackup.sql', dump); //RUTA + NOMBRE DEL ARCHIVO SQL

    //console.log(dump);
  });
  res.json({ Status: ' Respaldo guardado con exito' });
});

//11.-RESTORE ----> http://localhost:3000/api/tasks/Restore
//RECIBE RUTA DESTINO de donde esta ubicado el respaldo
router.get('/Restore', (req, res) => {
  let { ruta } = req.body;
  let database = 'DB_PRUEBA'; //vapersve
  // let direc = "C:/Desktop/"

  var exec = require('child_process').exec;
  var cmd = ' mysql -u root ' + database + ' < ' + ruta + 'VapersBackup.sql';
  console.log(cmd);

  exec(cmd, function(error, stdout, stderr) {
    // command output is in stdout
  });

  res.json({ Status: ' Datos Cargados con exito' });
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
      res.json({
        status: 'error',
        err
      });
    }
  });
});

module.exports = router;
