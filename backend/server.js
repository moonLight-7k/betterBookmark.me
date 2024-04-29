const express = require("express");
const fs = require("fs").promises;
const { crawlLocalData } = require("./crawler");
const app = express();
const port = 5000;
const cors = require("cors");
const multer = require('multer');

app.use(cors());

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'data/');
    },
    filename: (req, file, cb) => {
      const fileName = "bookmarks.html";
      cb(null, fileName);
    },
  }),
});

app.get("/", (req, res) => {
  const data = 'data/crawled_data.json'
  res.send(data);
});

app.post("/api/bookmarks", (req, res) => {
  fs.readFile('data/crawled_data.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading JSON file:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    const jsonData = JSON.parse(data);
    res.status(200).json(jsonData);
  });
});

app.get("/api/data", async (req, res) => {
  try {

    const crawledData = await crawlLocalData();

    res.json(crawledData);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
    res.send(error)
  }
});

app.post("/api/upload", upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }
  console.log('Received file:', req.file);
  // You can now process the uploaded file as needed, e.g., save it to the server
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
