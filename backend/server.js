const express = require("express");
const cors = require("cors");
const fs = require("fs");
const multer = require("multer");

const app = express();

app.use(cors());

app.use(express.json());



app.use("/uploads",
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



app.get("/memories", (req, res) => {

  const data =
    JSON.parse(fs.readFileSync(DB_FILE));

  res.json(data);

});

/* ------------------ */
/* ADD MEMORY */
/* ------------------ */

app.post(
  "/memories",
  upload.single("image"),
  (req, res) => {

    const data =
      JSON.parse(fs.readFileSync(DB_FILE));

    const newMemory = {

      id: Date.now(),

      title: req.body.title,

      description: req.body.description,

      image: `/uploads/${req.file.filename}`

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