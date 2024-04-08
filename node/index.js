const express = require("express");
const app = express();
const cors = require("cors");
const fileUpload = require("express-fileupload");

app.use(cors());
app.use(express.json()); // read json data
app.use(express.urlencoded({ extended: true })); // read encoded data
app.use(fileUpload());

app.get("/info", async (req, res) => {
  res.status(200).json("API is live.");
});

app.post("/foo", async (req, res) => {
  console.log(req.body);
  console.log(req.files); // log files
});

const port = 3000;
app.listen(port, () => {
  console.log(`listening on port:${port}...`);
});
