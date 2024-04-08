const express = require("express");
const app = express();

app.use(express.json()); // read json data
app.use(express.urlencoded({ extended: true })); // read encoded data

const port = 3000;
app.listen(port, () => {
  console.log(`listening on port:${port}...`);
});
