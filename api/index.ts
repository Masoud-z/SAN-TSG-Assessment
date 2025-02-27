import express from "express";
import path from "path";
import fs from "fs";
import cors from "cors";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

const app = express();
const port = 5500;

app.use(
  cors({
    origin: false, // disables CORS
  })
);

// disables CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/translations/:lang/:ns", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const lang = req.params.lang.split("-")[0];
  const ns = req.params.ns;

  // language-location
  const filePath = path.join(
    __dirname,
    "translations",
    `${lang}`,
    `${ns}.json`
  );

  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      return res.status(404).json({ error: "Translation file not found." });
    }

    try {
      const jsonData = JSON.parse(data);
      res.set("Cache-control", "public, max-age=3600");
      res.json(jsonData);
    } catch (parseError) {
      res.status(500).json({ error: "Error parsing translation file." });
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port} `);
});
