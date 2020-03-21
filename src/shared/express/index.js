(function() {
  const express = require('express');
  const morgan = require('morgan');
  const cors = require('cors');
  const path = require('path');
  const app = express();

  // Settings
  app.set('port', 3500);

  app.use(morgan('dev'));
  app.use(express.json());

  // cors
  app.use(cors());
  // app.use(function(req, res, next) {
  //   res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  //   res.header(
  //     'Access-Control-Allow-Headers',
  //     'Origin, X-Requested-With, Content-Type, Accept'
  //   );
  //   next();
  // });

  // Routes
  app.use('/api/tasks', require('./routes/task.routes'));
  app.use('/api/tasks', require('./routes/task.usuario'));

  app.listen(app.get('port'), () => {
    console.log('server on port 3500');
  });

  module.exports = app;
})();
