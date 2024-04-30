const express = require("express");
const fs = require("fs").promises;
const { crawlLocalData } = require("./crawler");
const app = express();
const port = 5000;
const cors = require("cors");
const multer = require("multer");

app.use(cors());


const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "data/");
    },
    filename: (req, file, cb) => {
      const fileName = "bookmarks.html";
      cb(null, fileName);
    },
  }),
});

app.get("/", (req, res) => {
  const data = "data/crawled_data.json";
  res.send(data);
});

app.get("/api/bookmarks", (req, res) => {
  // let jsonData = null
  // fs.readFile("data/crawled_data.json", "utf8", (err, data) => {
  //   if (err) {
  //     console.error("Error reading JSON file:", err);
  //     res.status(500).send("Internal Server Error");
  //     return;
  //   }
  //   jsonData = JSON.parse(data);
  //   res.status(200).json(jsonData);
  //   console.log("Data sent successfully");

  // });
  // res.send("Done");

  fs.readFile("data/crawled_data.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      res.status(500).json({ error: "Error reading file", message: err.message });
    } else {
      try {
        const jsonData = JSON.parse(data);
        res.status(200).json(jsonData);
      } catch (parseError) {
        console.error("Error parsing JSON:", parseError);
        res.status(500).json({ error: "Error parsing JSON", message: parseError.message });
      }
    }
  });
});

app.get('/api/data', (req, res) => {
  // Read the content of the JSON file asynchronously
  fs.readFile('data/crawled_data.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    try {
      // Parse the JSON data
      const jsonData = JSON.parse(data);
      // Send the JSON data as a response to the frontend
      res.json(jsonData);
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      res.status(500).send('Internal Server Error');
    }
  });
});



app.post("/api/upload", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded");
  }

  console.log("Received file from user:", req.file);

  try {
    await runCrawler("data/bookmarks.html");
    res.sendStatus(200); // Send success response after crawler completes
  } catch (error) {
    console.error("Error running crawler:", error);
    res.status(500).send("Internal Server Error");
  }
});




async function runCrawler(filePath) {
  try {
    const crawledData = await crawlLocalData(filePath);
    fs.writeFile(
      "data/crawled_data.json",
      JSON.stringify(crawledData, null, 4),
      (err) => {
        if (err) {
          console.error("Error writing file:", err);
        } else {
          console.log("Data crawled and saved to 'crawled_data.json'");
          deleteImportFile(filePath);
        }
      },
    );
    console.log("Crawler completed successfully");
  } catch (error) {
    console.error("Error running crawler:", error);
    throw error;
  }
}


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
