var express = require("express");
const dotenv = require("dotenv");
const dbconnection = require("./db/dbconnection");
var books = require("./routes/books");
var cors = require("cors");

dbconnection();

var app = express();

//external middlewares
app.use(cors());

dotenv.config();

//Internal middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/books", books);

app.get("/", function (req, res) {
  console.log("app starting on port: " + process.env.PORT);
  res.send("REST API is working!");
});

app.listen(process.env.PORT, function () {
  console.log("app listening on port: " + process.env.PORT);
});
