const express = require("express");
const app = express();
var bodyParser = require('body-parser');
const path = require('path');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.urlencoded({ extended: false }));

var flowRouter = require('./router/flow');
var patternRouter = require('./router/pattern')

app.use(express.static('./'));

app.get("/", function(req, res){
  res.sendFile(path.join(__dirname, "./lib/0index.html"));
});


app.use('/flow', flowRouter);
app.use('/pattern', patternRouter);


app.listen(3000, () => {
  console.log("connection success");
});