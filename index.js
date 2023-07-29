const fs = require("fs");
const express = require("express");
const router = require("./router/router");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send(
    "Please use endpoints: to create the txt file - /file/create & to list the txt file - /file/list"
  );
});

app.use("/file", router);

app.listen(PORT, () => {
  console.log(`App is running on the port: ${PORT}`);
});
