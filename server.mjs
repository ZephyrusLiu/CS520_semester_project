"use strict";

import { MongoClient } from "mongodb";
import path from "path";
import { createServer } from "http";
import { parse } from "url";
import { join } from "path";
import { writeFile, readFileSync, existsSync } from "fs";

const serveStaticFile = (res, filename) => {
  const filePath = join("client", filename);

  if (existsSync(filePath)) {
    if (filename.endsWith("html")) {
      res.writeHead(200, { "Content-Type": "text/html" });
    } else if (filename.endsWith("js")) {
      res.writeHead(200, { "Content-Type": "text/javascript" });
    } else if (filename.endsWith("css")) {
      res.writeHead(200, { "Content-Type": "text/css" });
    } else if (filename.endsWith("svg")) {
      res.writeHead(200, { "Content-Type": "image/svg+xml" });
    }
    const fileContent = readFileSync(filePath);
    res.write(fileContent);
    res.end();
  } else {
    res.writeHead(404);
    res.end();
  }
};

//MongoDB
const encodedPassword = encodeURIComponent("@W.N5_n9g7XCEgG");
const mongoDBurl = `mongodb+srv://yding0:${encodedPassword}@cluster0.svrhqzz.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(mongoDBurl);
try {
  await client.connect();
  console.log("Connected correctly to server");
} catch (err) {
  console.log(err.stack);
}

const db = client.db("PatientTracker");
const collection1 = db.collection("doctor");

const doctor = await collection1.find().toArray();

//
let database = {};
database["doctor"] = doctor;

createServer(async (req, res) => {
  const parsed = parse(req.url, true);

  if (parsed.pathname === "/signup") {
    let body = "";
    let result = false;
    req.on("data", (data) => (body += data));
    req.on("end", async () => {
      const data = JSON.parse(body);
      const output = {
        firstname: data.firstname,
        lastname: data.lastname,
        birthday: data.birthday,
        gender: data.gender,
        email: data.email,
        username: data.username,
        password: data.password,
        cpassword: data.cpassword,
        profile: data.profile,
      };
      for (let element of database.doctor) {
        if (output.username === element.username) {
          result = true;
          break;
        }
      }
      if (!result) {
        database.doctor.push(output);
        try {
          await collection1.insertOne(output);
          console.log("Signed up successfully!");
        } catch (error) {
          console.error("Error inserting into MongoDB:", error);
        }
      }
      res.end(JSON.stringify(result));
    });
  } else if (parsed.pathname === "/login") {
    let body = "";
    req.on("data", (data) => (body += data));
    req.on("end", () => {
      const data = JSON.parse(body);
      var found = false;
      for (var i = 0; i < database.user.length; i++) {
        if (
          (database.user[i].username === data.username ||
            database.user[i].email === data.email) &&
          database.user[i].password === data.password
        ) {
          found = true;
          break;
        }
      }
      if (found) {
        res.end(JSON.stringify(true));
      } else {
        res.end(JSON.stringify(false));
      }
    });
  } else {
    const filename =
      parsed.pathname === "/"
        ? "homepage.html"
        : parsed.pathname.replace("/", "");
    console.log("trying to serve " + filename + "...");
    serveStaticFile(res, filename);
  }
}).listen(process.env.PORT || 8080);

//process.env.PORT || 8080

// const express = require("express");
// const fileUpload = require("express-fileupload");

// //MongoDB
// require("dotenv").config();
// const connectDB = require("./database/db");

// const app = express();
// const port = process.env.PORT || 3000;

//app.use(express.static(__dirname));

// //Connect to DB
// connectDB();

// app.use(express.static("public"));
// app.use(fileUpload());

// app.use(
//   fileUpload({
//     createParentPath: true,
//   })
// );

// // Check if the user is authenticated by the system.
// checkAuthenticated = (req, res, next) => {
//   if (req.isAuthenticated()) {
//     return next();
//   } else {
//     res.status(401).redirect("../login.html");
//   }
// };

// app.get("/", function (req, res) {
//   console.log(req.params);
//   res.sendFile(__dirname + "/homepage.html");
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });