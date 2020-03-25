const mysql = require('mysql');

const mysqlConnection =  mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: '',
   database: 'vapersve'
});
const mysqlConnection2 =  mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  //database: 'vapersve'
});



mysqlConnection2.query("CREATE DATABASE  IF NOT EXISTS  vapersve;", function (err, result) {
  //console.log(result.affectedRows);
  if (result.affectedRows== 1) {
    console.log("A Database has been Created!");
  }

 if (err) throw err;
 console.log("Database Lodaded Succesfully!");
});

/*
mysqlConnection.connect(function(err) {
    if (err) {  
      return console.error('ERROR: ' + err.message);      
    } 
    console.log('Connected to the MySQL server.');
  });
*/
module.exports= mysqlConnection;
