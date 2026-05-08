const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

const DB_FILE = "./db.json";

// Get all memories
app.get("/memories", (req, res) => {
  const data = JSON.parse(fs.readFileSync(DB_FILE));
  res.json(data);
});

// Add memory
app.post("/memories", (req, res) => {
  const data = JSON.parse(fs.readFileSync(DB_FILE));

  const newMemory = {
    id: Date.now(),
    title: req.body.title,
    description: req.body.description,
    image: req.body.image
  };

  data.push(newMemory);
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));

  res.json({ message: "Memory saved" });
});

app.listen(5000, () => {
  console.log("LifeFrame server running on port 5000");
});