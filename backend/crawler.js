const fs = require("fs");
const cheerio = require("cheerio");


let dataCreated = false;

function crawlLocalData(filePath) {
  try {
    const html = fs.readFileSync(filePath, "utf8");
    const $ = cheerio.load(html);
    const links = $("a");
    const crawledData = [];

    links.each((index, element) => {
      const href = $(element).attr("href");
      const clickCount = 0;
      const data = {
        index: index,
        site: href,
        clickCount: clickCount,
        pinned: false,
        category: [],
        tag: [],
      };
      crawledData.push(data);
    });

    return crawledData;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

const filePath = "data/bookmarks.html";
const outputFilePath = "data/crawled_data.json";

function crawlAndWriteData() {
  const crawledData = crawlLocalData(filePath);
  if (crawledData !== null) {
    fs.writeFile(
      outputFilePath,
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
  } else {
    console.log("❌ No data crawled. The file may not exist or is empty.");
  }
}

// Check if the output file already exists
fs.access(outputFilePath, fs.constants.F_OK, (err) => {
  if (err) {
    crawlAndWriteData();
  } else {
    fs.readFile(outputFilePath, "utf8", (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
      } else {
        try {
          const jsonData = JSON.parse(data);
          const hasNullValues = jsonData === null;
          if (hasNullValues) {
            console.log("The JSON file contains null values.");
            console.log("Attempting to crawl the HTML file again.");
            crawlAndWriteData();
          } else {
            console.log("The JSON file does not contain null values.");
            dataCreated = true;
            deleteImportFile(filePath);
          }
        } catch (parseError) {
          console.error("Error parsing JSON:", parseError);
        }
      }
    });
  }
});

function deleteImportFile(filePath) {
  fs.unlink(filePath, (err) => {
    if (err) {

      if (!dataCreated) {
        console.log("❌ Error deleting file, maybe alrea");
      }
      return;
    }
    console.log("✅ File deleted successfully");
  });
}

module.exports = { crawlLocalData };
