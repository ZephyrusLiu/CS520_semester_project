import { MongoClient } from "mongodb";

const encodedPassword = encodeURIComponent("@W.N5_n9g7XCEgG");
const mongoDBurl = `mongodb+srv://yding0:${encodedPassword}@cluster0.svrhqzz.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(mongoDBurl);

const connectToMongoDB = async () => {
  try {
    await client.connect();
    console.log("Connected correctly to server");
  } catch (err) {
    console.log(err.stack);
  }
};

const getDoctorCollection = () => {
  const db = client.db("PatientTracker");
  return db.collection("doctor");
};

export { connectToMongoDB, getDoctorCollection };
