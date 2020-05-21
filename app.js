const express = require("express");
const indexRouter = require('./routes/indexRoute');

const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use('/', indexRouter);


app.listen(3000, function () {
  console.log("Server started on port 3000");
});

module.exports = app;