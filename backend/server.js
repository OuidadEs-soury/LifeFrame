const express = require("express");

const cors = require("cors");

const multer = require("multer");

const fs = require("fs");

const path = require("path");

const app = express();

app.use(cors());

app.use(express.json());

/* -------------------- */
/* UPLOADS FOLDER */
/* -------------------- */

app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "../uploads")
  )
);

/* -------------------- */
/* STORAGE */
/* -------------------- */

const storage = multer.diskStorage({

  destination: (req, file, cb) => {

    cb(null, "../uploads");
  },

  filename: (req, file, cb) => {

    cb(
      null,
      Date.now() + "-" + file.originalname
    );
  }
});

const upload = multer({
  storage
});

/* -------------------- */
/* DATABASE */
/* -------------------- */

const dbPath =
  path.join(__dirname, "db.json");

/* -------------------- */
/* GET MEMORIES */
/* -------------------- */

app.get("/memories", (req, res) => {

  const data =
    fs.readFileSync(dbPath);

  res.json(JSON.parse(data));
});

/* -------------------- */
/* ADD MEMORY */
/* -------------------- */

app.post(

  "/memories",

  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "voice", maxCount: 1 }
  ]),

  (req, res) => {

    const memories =
      JSON.parse(
        fs.readFileSync(dbPath)
      );

    const image =
      req.files["image"]
      ? req.files["image"][0].filename
      : null;

    const voice =
      req.files["voice"]
      ? req.files["voice"][0].filename
      : null;

    const newMemory = {

      id: Date.now(),

      title: req.body.title,

      description:
        req.body.description,

      location:
        req.body.location,

      latitude:
        req.body.latitude,

      longitude:
        req.body.longitude,

      image:
        image
        ? `/uploads/${image}`
        : "",

      voice:
        voice
        ? `/uploads/${voice}`
        : "",

      likes: 0
    };

    memories.push(newMemory);

    fs.writeFileSync(
      dbPath,
      JSON.stringify(memories, null, 2)
    );

    res.json({
      success: true
    });
  }
);

/* -------------------- */
/* START SERVER */
/* -------------------- */

app.listen(5000, () => {

  console.log(
    "🧠 LifeFrame server running on port 5000"
  );
});