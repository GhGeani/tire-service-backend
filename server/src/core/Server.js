const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan')

const connection = require('./connection');
const config = require('./config/configs');

const info = require('../route/info');
const announce = require('../route/announce');
const item = require('../route/item');
const user = require('../route/user');

class Server {
   constructor() {
    this.app = express();
    connection(mongoose, config);
    this.middlewares();
    this.routes();
  }

  routes() {
   this.app.use('/', info);
   this.app.use('/', announce);
   this.app.use('/', item);
   this.app.use('/', user);
  }

  middlewares() {
     // serves files from node_modules.
     this.app.use(express.static(path.join(__dirname, '../../../node_modules'), {
      maxAge: 24 * 60 * 60 * 1000
    }));

    // serve static files from client.
    this.app.use(express.static(path.join('/files', __dirname, '../../../public/uploads')));
    this.app.use(cors());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
    this.app.use(morgan('dev'));
  }

  start() {
    this.app.listen(config.server.port, () => {
      console.log(`Server on, port: ${config.server.port}`);
    })
  }
}

module.exports = Server