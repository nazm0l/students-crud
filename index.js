const express = require("express");
const app = express();
require("dotenv").config();
const students = require("./routes/students");

const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/v1", students);

app.get("/", (req, res) => {
  res.send("App is working");
});

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
