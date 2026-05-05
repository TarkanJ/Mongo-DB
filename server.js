const express = require('express');
const path = require('path');
const fs = require('fs');
const { MongoClient } = require('mongodb');

const app = express();
app.use(express.json());

// Docker connection
const mongoUrl = "mongodb://admin:mongo@mongodb:27017";
const client = new MongoClient(mongoUrl);

const dbName = "martino-db";

let db;

async function start() {
  try {
    await client.connect();
    db = client.db(dbName);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error(err);
  }
}

start();

// routes
app.get('/', (req, res) => {
  res.send("API běží 🚀");
});

app.post('/update-profile', async (req, res) => {
  const user = { ...req.body, userid: 1 };

  await db.collection("users").updateOne(
    { userid: 1 },
    { $set: user },
    { upsert: true }
  );

  res.send(user);
});

app.get('/get-profile', async (req, res) => {
  const user = await db.collection("users").findOne({ userid: 1 });
  res.send(user || {});
});

app.listen(3900, () => {
  console.log("Server běží na portu 3900");
});
