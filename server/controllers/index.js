var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get((messages)=>{
        res.json({results: (messages || [])});
      });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      models.messages.post(req.body, () => { res.send('OK'); });
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {
      models.users.post(()=>{ res.send('OK'); });
    }
  }
};

