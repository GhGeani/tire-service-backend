const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const connection = require('./connection');
const config = require('./config/configs');

class Server {
   constructor() {
    this.app = express();
    connection(mongoose, config);
    this.middlewares();
    this.routes();
  }

  routes() {
    // serves files from node_modules.
    this.app.use(express.static(path.join(__dirname, '../../../../node_modules'), {
      maxAge: 24 * 60 * 60 * 1000
    }));

    // serve static files from client.
    this.app.use(express.static(path.join(__dirname, '../../../client/'), {
      maxAge: 24 * 60 * 60 * 1000
    }));
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
  }

  start() {
    this.app.listen(config.server.port, () => {
      console.log(`Server on, port: ${config.server.port}`);
    })
  }
}

module.exports = Server