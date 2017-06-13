var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      var msgs = models.messages.get();
      res.json({results: msgs});
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      console.log('b4 post');
      models.messages.post(req.body, () => { res.send('OK'); });
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {}
  }
};

