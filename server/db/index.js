// var mysql = require('mysql');
var Sequelize = require('sequelize');
// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".

exports.connection = new Sequelize('chat', 'root', 'plantlife', {logging: true});
//   user: 'root',
//   password: 'plantlife',
//   database: 'chat'