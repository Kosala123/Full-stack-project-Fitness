const functions = require("firebase-functions");
const admin = require("firebase-admin");
require("dotenv").config();

const serviceAccountKey = require("./serviceAccountKey.json");

const express = require("express");
const app = express();

//Body parser for our JSON data
app.use(express.json());

//cross argin
const cors = require("cors");
app.use(cors({ origin: true }));
app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  next();
});

//firebase credentials
admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
});

//api endpoints
app.get("/", (req, res) => {
  return res.send("Hello world");
});

const useRouter = require("./routes/user");
app.use("/api/users", useRouter);

exports.app = functions.https.onRequest(app);
