const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

//firebase init
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBwVHqYOfyTxEPBcyjL5q26SaFjJQQGcF8",
  authDomain: "zetech-33c35.firebaseapp.com",
  projectId: "zetech-33c35",
  storageBucket: "zetech-33c35.appspot.com",
  messagingSenderId: "608392251415",
  appId: "1:608392251415:web:0127e8798f4490aa4a3452",
  measurementId: "${config.measurementId}",
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const app = initializeApp(firebaseConfig);
//DB config
require("./config/db.js");

//app
const app = express();

//routing
const poll = require("./routes/poll");
// const president = require("./routes/poll/president");

//set public directory
app.use(express.static(path.join(__dirname, "public")));

//body parser midlewere
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//enable cors
app.use(cors());

app.use("/poll", poll);
// app.use("/president", president);

//port number
const port = 3002;

//start server
app.listen(port, () => console.log(`server started on ${port}`));
