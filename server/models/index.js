var db = require('../db');

module.exports = {
  messages: {
    get: function () {}, // a function which produces all the messages
    post: function (message, done) {
      const saveMessage = (uid, roomid, text, callback) => {
        console.log('checking msgs');

        db.connection.query(`insert into messages (usernameID, roomID, text) values ('${uid}','${roomid}','${text}');`, (err, results) => {
          if (err) {
            console.log(err);
            throw new Error(err);
          } else {
            callback();
          }
        });
      };

      const checkRoom = (uid, roomname, callback) => {
        console.log('checking room');

        db.connection.query(`select id from rooms where name ='${roomname}';`, (err, results) =>{
          if (err) {
            console.log(err);
            throw new Error(err);
          } else {
            if (results.length === 0) {
              db.connection.query( `insert into rooms (name) values ('${roomname}');`, (err, results) => {
                callback(uid, results.insertId, message.text, done);
              });
            } else {
              callback(uid, results[0].id, message.text, done);
            }
          }
        });
      };

      const checkUser = (username, callback) => {
        console.log('checking user');
        db.connection.query(`select id from usernames where name = '${username}';`, (err, results) =>{
          if (err) {
            console.log(err);    
          }
          if (results.length === 0) {
            db.connection.query( `insert into usernames (name) values ('${username}');`, (err, results) => {
              callback(results.insertId, message.roomname, saveMessage);
            });
          } else {
            callback(results[0].id, message.roomname, saveMessage);
          }
        });      
      };
      console.log('something');
      checkUser(message.username, checkRoom);
      
      // db.connection.query(`insert into usernames (name) values (${message.username})`,  (err, results) => {

      // });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};

