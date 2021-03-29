const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const bluebird = require("bluebird");

//Set up a default port
const PORT = process.env.PORT || 3001;
mongoose.Promise = bluebird;
app.use(express.urlencoded({extended:true}));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
else {
  app.use(express.static(__dirname + "/client/public"));
}

// Enable CORS https://enable-cors.org/server_expressjs.html
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next();
});
// Routing
var articlesController = require("./server/controllers/article-controller");
var router = new express.Router();

// Get saved articles
router.get("/api/saved", articlesController.find);
// Save articles
router.post("/api/saved", articlesController.insert);
// delete saved articles
router.delete("/api/saved/:id", articlesController.delete);
// Send every other request to the React app
router.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.use(router);

 
// Connect mongoose to our database
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/nyt-react", { useNewUrlParser: true }, { useUnifiedTopology: true }, function(error) {
  // Log any errors connecting with mongoose
  if (error) {
    console.error(error);
  }
  // Or log a success message
  else {
    console.log("mongoose connection is successful");
  }
});
// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});
 //Start the server
app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
