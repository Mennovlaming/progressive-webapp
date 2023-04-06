const express = require('express');
const app = express();
const port = 3000;

const compression = require("compression");
app.use(compression());

const { engine } = require("express-handlebars");

// use the static folder
// app.use("/static", express.static("static"));
app.use(express.static('static'));

const router = require('./routes/post');
app.use('/', router);
app.use('/detail', router);

app.use('/search', router);


app.get('/search', (req, res) => {
  const query = req.query.query; 
  // Read the search term from the query parameter
  // Perform the search operation using the query term
  // ...
});

//Voeg een offline route toe

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

