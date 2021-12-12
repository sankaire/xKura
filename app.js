const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const expresslayouts = require("express-ejs-layouts");
const passport = require("passport");
const flash = require("connect-flash");
const session = require("express-session");

require("./config/passport")(passport);

// const firebase = require("firebase");
const firebase = require("firebase/app");
require("firebase/analytics");

//firebase init
// const initializeApp = require("firebase/app");
// const getAnalytics = require("firebase/analytics");

const app = express();

const firebaseConfig = {
  apiKey: "AIzaSyBwVHqYOfyTxEPBcyjL5q26SaFjJQQGcF8",
  authDomain: "zetech-33c35.firebaseapp.com",
  projectId: "zetech-33c35",
  storageBucket: "zetech-33c35.appspot.com",
  messagingSenderId: "608392251415",
  appId: "1:608392251415:web:0127e8798f4490aa4a3452",
  measurementId: "${config.measurementId}",
};
firebase.initializeApp(firebaseConfig);
// firebase.getAnalytics(app);

//DB config
require("./config/db.js");

//routing
const user = require("./routes/users");
const poll = require("./routes/poll");
//
// const president = require("./routes/poll/president");

//set public directory
app.use(express.static(path.join(__dirname, "public")));

//body parser midlewere
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

//enable cors
app.use(cors());

app.use(expresslayouts);
app.set("view engine", "ejs");

app.use("/poll", poll);
app.use("/users", user);
// app.use("/president", presidJent)
//start server

const dotenv = require("dotenv");
dotenv.config();
console.log(`Your port is ${process.env.PORT}`);
