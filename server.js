const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const multer = require('multer');
const path = require('path');

const app = express();
app.use(express.json());

// ===== MongoDB =====
const mongoUrl = "mongodb://admin:mongo@mongodb:27017";
const client = new MongoClient(mongoUrl);
const dbName = "martino-db";

let db;

// ===== Multer =====
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'pictures/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// ===== Static =====
app.use('/images', express.static('pictures'));

// ===== ROUTES =====

// HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});


// ===== CREATE USER =====
app.post('/users', async (req, res) => {
  try {
    const user = {
      name: req.body.name,
      age: req.body.age,
      createdAt: new Date()
    };

    const result = await db.collection("users").insertOne(user);
    res.send(result);

  } catch (err) {
    res.status(500).send(err);
  }
});


// ===== GET ALL USERS =====
app.get('/users', async (req, res) => {
  const users = await db.collection("users").find().toArray();
  res.send(users);
});


// ===== UPDATE USER =====
app.put('/users/:id', async (req, res) => {
  try {
    const id = req.params.id;

    await db.collection("users").updateOne(
      { _id: new ObjectId(id) },
      { $set: { name: req.body.name, age: req.body.age } }
    );

    res.send({ message: "Updated" });

  } catch (err) {
    res.status(500).send(err);
  }
});


// ===== DELETE USER =====
app.delete('/users/:id', async (req, res) => {
  try {
    const id = req.params.id;

    await db.collection("users").deleteOne({ _id: new ObjectId(id) });

    res.send({ message: "Deleted" });

  } catch (err) {
    res.status(500).send(err);
  }
});


// ===== UPLOAD IMAGE =====
app.post('/upload/:id', upload.single('image'), async (req, res) => {
  try {
    const id = req.params.id;

    if (!req.file) {
      return res.status(400).send("No file");
    }

    const imagePath = `/images/${req.file.filename}`;

    await db.collection("users").updateOne(
      { _id: new ObjectId(id) },
      { $set: { profileImage: imagePath } }
    );

    res.send({ path: imagePath });

  } catch (err) {
    res.status(500).send(err);
  }
});


// ===== START SERVER až po DB =====
async function start() {
  try {
    await client.connect();
    db = client.db(dbName);
    console.log("✅ Connected to MongoDB");

    app.listen(3900, () => {
      console.log("🚀 Server běží na portu 3900");
    });

  } catch (err) {
    console.error(err);
  }
}

start();
