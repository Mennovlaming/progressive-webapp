const express = require('express')
const app = express()
const port = 3000

const { engine } = require("express-handlebars");
const router = require('./routes/posts');

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

// use the static folder
app.use("/static", express.static("static"));
app.use('/', router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});