const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const port = 8004;
const bodyParser = require("body-parser"); //body parser include
const router = require("./router/index"); // router file included
const session = require("express-session");
const flash = require("connect-flash");
const customMware = require("./config/middleware");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

// define static path
app.use(express.static("assets"));

//make uploads path available to browser
app.use("/uploads", express.static(__dirname + "/uploads"));
app.set("view engine", "ejs");

app.use(
  session({
    secret: "flashblog",
    saveUninitialized: true,
    resave: true,
  })
);

app.use(flash());
app.use(customMware.setFlash);
app.use("/", router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
