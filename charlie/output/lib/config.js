'use strict';

var Confidence = require('confidence');

var criteria = {
  env: process.env.NODE_ENV
};

var config = {
  ENV:{
    type: process.env.NODE_ENV || 'stage'
  },
  KNEX: {
    client: process.env.DB_TYPE || 'postgres',
    connection: {
      host     : process.env.DB_HOST || '127.0.0.1',
      user     : process.env.DB_USER || 'username',
      password : process.env.DB_PASS || 'password',
      database : process.env.DB_NAME || 'my_db',
      charset  : process.env.DB_CHARSET || 'utf8'
    }
  },
  SERVER: {
    port: process.env.PORT || 3000,
    routes: {
      cors: true
    }
  }
};

var store = new Confidence.Store();
store.load(config);

module.exports.get = function(key) {
  var value = store.get(key, criteria);

  if (!value) {
    console.warn('No value is defined for you specified key: ' + key);
  }

  return value;
};
