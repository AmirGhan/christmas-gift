const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;
const game = new (require('./models/game'))();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
  res.render("index");
});

app.post("/register", function(req, res) {
  let member = game.addMember(req.body.name, req.body.spouse)
  res.send(member)
})

app.post("/draw", function(req, res) {
  let result = game.draw()
  res.send(result)
});

app.post("/find", function(req, res) {
  let result = game.find(req.body.name)
  res.send(result)
});

app.post("/finalResults", function(req, res) {
  let result = game.finalResults()
  res.send(result)
});

app.post("/restart", function(req, res) {
  game.restart();
  res.redirect("/")
});

app.listen(PORT, () => {
  console.log("Gift Exchange app listening on port " + PORT);
});
