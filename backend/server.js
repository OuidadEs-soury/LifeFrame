const express = require("express");
const cors = require("cors");
const fs = require("fs");
const multer = require("multer");

const app = express();

app.use(cors());

app.use(express.json());



app.use(
  "/uploads",
  express.static("../uploads")
);


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

const upload = multer({ storage });

const DB_FILE = "./db.json";

/* ---------------------- */
/* GET MEMORIES */
/* ---------------------- */

app.get("/memories", (req, res) => {

  const data = JSON.parse(
    fs.readFileSync(DB_FILE)
  );

  res.json(data);
});



app.post(

  "/memories",

  upload.fields([

    { name: "image", maxCount: 1 },

    { name: "voice", maxCount: 1 }

  ]),

  (req, res) => {

    const data = JSON.parse(
      fs.readFileSync(DB_FILE)
    );

    const imageFile =
      req.files.image[0];

    const voiceFile =
      req.files.voice
        ? req.files.voice[0]
        : null;

    const newMemory = {

      id: Date.now(),

      title: req.body.title,

      description: req.body.description,

      location: req.body.location,

      likes: 0,

      image:
        `/uploads/${imageFile.filename}`,

      voice: voiceFile
        ? `/uploads/${voiceFile.filename}`
        : null
    };

    data.push(newMemory);

    fs.writeFileSync(

      DB_FILE,

      JSON.stringify(data, null, 2)
    );

    res.json({

      message: "Memory uploaded"
    });
  }
);


app.listen(5000, () => {

  console.log(
    "🚀 LifeFrame server running on port 5000"
  );
});