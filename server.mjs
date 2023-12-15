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
const collection2 = db.collection("patient");
const collection3 = db.collection("treatment");

const doctor = await collection1.find().toArray();
const patient = await collection2.find().toArray();
const treatment = await collection3.find().toArray();

let database = {};
database["doctor"] = doctor;
database["patient"] = patient;
database["treatment"] = treatment;

createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
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
  } 
  
  else if (parsed.pathname === "/login") {
    let body = "";
    req.on("data", (data) => (body += data));
    req.on("end", () => {
      const data = JSON.parse(body);
      var found = false;
      for (var i = 0; i < database.doctor.length; i++) {
        if (
          (database.doctor[i].username === data.username ||
            database.doctor[i].email === data.email) &&
          database.doctor[i].password === data.password
        ) {
          found = true;
  
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(database.doctor[i]));
  
          break;
        }
      }
      if (!found) {
        res.end(JSON.stringify(false));
      }
    });
  }
  
  else if (parsed.pathname === "/add_personal_info") {
    let body = "";
    let result = false;
    req.on("data", (data) => (body += data));
    req.on("end", async () => {
      const data = JSON.parse(body);
      const output = {
        patient_id: data.patient_id,
        firstname: data.firstname,
        lastname: data.lastname,
        birthday: data.birthday,
        gender: data.gender,
        phone: data.phone,
        email: data.email,
        e_phone: data.e_phone,
        e_email: data.e_email,
        has_insurance: data.has_insurance,
        blood_type: data.blood_type,
        height: data.height,
        weight: data.weight,
        medical_history: data.medical_history,
        family_mh: data.family_mh,
        allergic: data.allergic,
        addition_info: data.addition_info,
      };
      for (let element of database.patient) {
        if (output.patient_id === element.patient_id) {
          result = true;
          break;
        }
      }
      if (!result) {
        database.patient.push(output);
        try {
          await collection2.insertOne(output);
          console.log("Patient information added successfully!");
        } catch (error) {
          console.error("Error inserting into MongoDB:", error);
        }
      }
      res.end(JSON.stringify(result));
    });
  } 
  
  else if (parsed.pathname === "/add_medical_his") {
    let body = "";
    let result = false;
    req.on("data", (data) => (body += data));
    req.on("end", async () => {
      const data = JSON.parse(body);
      const output = {
        patient_id: data.patient_id,
        heart_rate: data.heart_rate,
        oximetry: data.oximetry,
        h_blood: data.h_blood,
        l_blood: data.l_blood,
        record: data.record,
      };
      for (let element of database.treatment) {
        if (output.heart_rate === element.heart_rate) {
          result = true;
          break;
        }
      }
      if (!result) {
        database.doctor.push(output);
        try {
          await collection3.insertOne(output);
          console.log("Treatment record successfully!");
        } catch (error) {
          console.error("Error inserting into MongoDB:", error);
        }
      }
      res.end(JSON.stringify(result));
    });
  } 
  
  else if (parsed.pathname === "/view_all_patients") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(database.patient));
  } 
  
  else if (parsed.pathname === "/get_patient_info") {
    const patientId = parsed.query.patient_id;
    const patientInfo = await collection2.findOne({ patient_id: patientId });
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(patientInfo));
  } 
  
  else if (parsed.pathname === "/get_treatment_records") {
    const patientId = parsed.query.patient_id;
    const treatmentRecords = await collection3
      .find({ patient_id: patientId })
      .toArray();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(treatmentRecords));
  } 

  else if (parsed.pathname === "/update_doctor_info" && req.method === "POST") {
    let body = "";
    req.on("data", (data) => (body += data));
    req.on("end", async () => {
      try {
        const data = JSON.parse(body);
        const updatedInfo = data.updatedInfo;
  
        // Update the doctor information in the database
        const filter = { username: updatedInfo.username };
        const update = {
          $set: {
            firstname: updatedInfo.firstname,
            lastname: updatedInfo.lastname,
            birthday: updatedInfo.birthday,
            gender: updatedInfo.gender,
            email: updatedInfo.email,
            username: updatedInfo.username,
            password: updatedInfo.password,
            profile: updatedInfo.profile
          },
        };
  
        const result = await collection1.updateOne(filter, update);
  
        if (result.modifiedCount > 0) {
          // Update successful
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ success: true }));
        } else {
          // No matching doctor found or no changes made
          res.writeHead(404, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ success: false, error: "Doctor not found or no changes made." }));
        }
      } catch (error) {
        console.error("Error updating doctor information:", error);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: false, error: "Internal server error." }));
      }
    });
  }
  
  // else if (parsed.pathname === "/userinfo") {
  //   const doctorId = parsed.query.username;
  //   const doctorInfo = await collection1.findOne({ username: doctorId });
  //   res.writeHead(200, { "Content-Type": "application/json" });
  //   res.end(JSON.stringify(doctorInfo));
  // } 
  
  else {
    const filename =
      parsed.pathname === "/"
        ? "homepage.html"
        : parsed.pathname.replace("/", "");
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
