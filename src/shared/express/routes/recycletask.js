

//!Verificar por que la primera  vez que se ejecuta no registra ventas
//enviar registro id por res

   /*   for (let i = 0; i < lista.length; i++) {
//LLAMADO #2 CON CICLO FOR Y MULTIPLES INSERTS
       mysqlConnection.query(query,[lista[i].codp, lista[i].cantp, global.id], () =>{
           
                 
       });
      }
      
      
      
      
      
      router.get('/productox', (req, res)=> {
    mysqlConnection.query('SELECT MAX(Id_ResumenVenta)  FROM resumen_venta', (err, rows, fields) =>{
      if (!err) {
          res.json(rows[0]);
      } else {
          console.log(err);
      }


    })

});











//CARRITO 0.5
mysqlConnection.query(dt,[0, 0, lista[0].mt, lista[0].obv, 0], (err,rows) =>{

    if (!err) {
      
        //res.json(rows.insertId);
        //DESPUES DE VARIOS INTENTOS EL PROBLEMA ERA EL SCOPE---HABIA QUE ACTUALIZAR LA VARIABLE CON GLOBAL SCOPE
       IDD=rows.insertId;

       for (let i = 0; i < lista.length; i++) {
        //LLAMADO #2 CON CICLO FOR Y MULTIPLES INSERTS
                mysqlConnection.query(query,[lista[i].codp, lista[i].cantp, global.id], () =>{
            
                    
                });
               }
        res.json({Status: "Factura#"+global.id});
       // global.id=global.id+1;
       
       
    } else {
        console.log(err);
    }   
} );









//GET para Select Visualizar Ventas----> Ruta:http://localhost:3000/api/tasks
router.get('/', (req, res)=> {
     mysqlConnection.query('CALL `Visualizar Ventas-Clientes`();', (err, rows, fields) =>{
       if (!err) {
           res.json(rows);
       } else {
           console.log(err);
       }


     })

});




//GET para ver productos   ---->Ruta: http://localhost:3000/api/tasks/producto
router.get('/producto', (req, res)=> {
    mysqlConnection.query('SELECT * from producto', (err, rows, fields) =>{
      if (!err) {
          res.json(rows);
      } else {
          console.log(err);
      }


    })

});
      
      
      
      
      
      
      
      



//Post para procedimientos almacenados e inserts------> Se le envia desde el front un array  
//Ruta:http://localhost:3000/api/tasks 
router.post('/', (req, res)=> {
    const { prod, cliente, cantidad, mt, obv}= req.body;
    const query= `  CALL AgregarVenta(?, ?, ?, ?, ?);
     `;
    
     mysqlConnection.query(query,[prod, cliente, cantidad, mt, obv], (err, rows, fields) =>{
      if (!err) {
          res.json({Status: "Venta Exitosa Sr #"+ cliente });
      } else {
          console.log(err);
      }
    });

});



// Ruta Para Ver Devoluciones-->  http://localhost:3000/api/tasks/verdevoluciones
router.get('/verdevoluciones', (req, res)=> {
    res.header("Access-Control-Allow-Origin", "http://localhost:3001"  );
    res.header("Access-Control-Allow-Headers " );
    
    
    const query= 'CALL `VerDevoluciones`();';
    
     mysqlConnection.query(query, (err, rows, fields) =>{
      if (!err) {
       
          res.json(rows);
      } else {
          console.log(err);
      }
    });

});





//Actualizar Dolar----> http://localhost:3000/api/tasks/actdolar
router.post('/actdolar', (req, res)=> {
    const { Dolar}= req.body;
    const query= `  CALL ActDolar(?);
     `;
    
     mysqlConnection.query(query,[Dolar], (err, rows, fields) =>{
      if (!err) {
          res.json({Status: "Precio del dolar asignado correctamente!"});
      } else {
          console.log(err);
      }
    });

});



//Borrar usuario---> http://localhost:3000/api/tasks/delete
router.delete('/', (req, res)=> {
    const { userid}= req.body;
    const query= `  DELETE FROM CLIENTE WHERE cliente.id_Cliente =(?);
     `;
    
     mysqlConnection.query(query,[userid], (err, rows, fields) =>{
      if (!err) {
          res.json({Status: "Usuario Eliminado correctamente!"});
      } else {
          console.log(err);
      }
    });

});


// Ruta Para Ver Devoluciones-->  http://localhost:3000/api/tasks/verdevoluciones
router.get('/verdevoluciones', (req, res)=> {
    res.header("Access-Control-Allow-Origin", "http://localhost:3001"  );
    res.header("Access-Control-Allow-Headers " );
    
    
    const query= 'CALL `VerDevoluciones`();';
    
     mysqlConnection.query(query, (err, rows, fields) =>{
      if (!err) {
       
          res.json(rows);
      } else {
          console.log(err);
      }
    });

});






      
      */
//RESPONSE