const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

app.use(cors());
app.use(express.json()); // read json data
app.use(express.urlencoded({ extended: true })); // read encoded data
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  }),
);

app.get("/info", async (req, res) => {
  res.status(200).json("API is live.");
});

app.post("/foo", async (req, res) => {
  let file = req.files.file;
  const result = await cloudinary.uploader.upload(file.tempFilePath, {
    folder: "users",
  });
  console.log(req.body);
  console.log(req.files); // log files

  const details = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    result,
  };

  res.status(200).send(details);
});

const port = 3000;
app.listen(port, () => {
  console.log(`listening on port:${port}...`);
});
