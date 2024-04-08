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
  console.log("file/files=", req.files.file); // (single object, array):(single, multiple upload )

  // handle single file
  /*
  let file = req.files.file;
  const result = await cloudinary.uploader.upload(file.tempFilePath, {
    folder: "users",
  });
  console.log(req.body);
  console.log(req.files); // log files

  const details = {
    firstname: req.body.firstName,
    lastname: req.body.lastName,
    result
  };

  console.log(details);
  res.status(200).send(details);
  */

  // handle multiple file
  let result;
  let imageArray = [];

  if (req.files) {
    for (let index = 0; index < req.files.file.length; index++) {
      let result = await cloudinary.uploader.upload(
        req.files.file[index].tempFilePath,
        {
          folder: "users",
        },
      );

      imageArray.push({
        public_id: result.public_id,
        secure_url: result.secure_url,
      });
    }
  }

  console.log(result);

  const details = {
    firstname: req.body.firstName,
    lastname: req.body.lastName,
    result,
    imageArray,
  };

  console.log(details);
  res.status(200).send(details);
});

const port = 3000;
app.listen(port, () => {
  console.log(`listening on port:${port}...`);
});
