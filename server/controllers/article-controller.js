var Article = require("../models/Article");

module.exports = {
  // Find articles in the database
  find: function(req, res) {
    console.log("Finding saved articles from the database");
    Article.find().then(function(doc) {
      res.json(doc);
    }).catch(function(err) {
      res.json(err);
    });
  },
  // Add article to the db
  insert: function(req, res) {
    console.log("Adding saved artice to the database");
    console.log("req.body: ", req.body);
    Article.create(req.body).then(function(doc) {
      res.json(doc);
      console.log("doc: ", doc);
    }).catch(function(err) {
      res.json(err);
    });
  },
  // deletes articles from the database
  delete: function(req, res) {
    console.log("Deleting a saved article from the database");
    Article.remove({
      _id: req.params.id
    }).then(function(doc) {
      res.json(doc);
      console.log("doc: ", doc);
    }).catch(function(err) {
      res.json(err);
    });
  }
};