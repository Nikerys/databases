var connection = require('../db').connection;
var Sequelize = require('sequelize');
var Message = connection.define('messages', {
  mid: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  text: Sequelize.STRING
}, { timestamps: false });

var User = connection.define('usernames', {
  uid: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: Sequelize.STRING
}, { timestamps: false });

var Room = connection.define('rooms', {
  rid: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  roomname: Sequelize.STRING,
}, { timestamps: false });

var MessageUser = Message.belongsTo(User);
var MessageRoom = Message.belongsTo(Room);

module.exports = {
  messages: {
    get: function (cb) { 
      Room.sync()
      .then(()=>User.sync())
      .then(()=>Message.sync())
      .then(()=>Message.findAll({
        include: [
          User,
          Room
        ]  
      }))
      .then( (messages) => { console.log(messages.map(m=>m.get())); cb(messages.map(m=>m.get())); });
    }, // a function which produces all the messages
    post: function (message, cb) {
      var userID;
      var roomID;
      Room.sync()
      .then(()=>User.sync())
      .then(()=>Message.sync())
      .then( () => { 
        console.log('msg: ', message);
        return Message.create({
          text: message.text,
          rooms: {
            roomname: message.roomname
          },
          usernames: {
            username: message.username
          }
        }, {
          include: [{
            association: MessageRoom,
            association: MessageUser
          }] 
        });
      }).then(()=>{ cb(); });
    } 
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function (callback) {
      callback();
    }
  }
};

