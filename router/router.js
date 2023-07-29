const express = require("express");
const fs = require("fs");
const router = express.Router();

router.get("/create", async (req, res) => {
  try {
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let year = date_ob.getFullYear();
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();
    let fileName =
      date + "-" + month + "-" + year + " " + hours + minutes + seconds;
    var ws = fs.createWriteStream(`files/${fileName}.txt`, {
      flags: "w",
      encoding: "utf8",
      mode: 0o666,
    });
    let ts = Date.now();
    var data = "FILE WAS CREATED AT: " + Math.floor(ts / 1000);
    ws.write(data, (err) => {
      if (err) console.log(err);
      else console.log("file created successfully");
    });

    res.send("Current TimeStamp: " + fileName);
  } catch {
    res.send({
      statusCode: 500,
      msg: "Internal server error",
    });
  }
});

router.get("/list", async (req, res) => {
  try {
    const dirName = "./files/";
    let fileLists = [];
    fs.readdir(dirName, (err, files) => {
      if (err) console.log(err);
      else
        files.forEach((file) => {
          fileLists.push(file);
        });
      res.send(fileLists);
    });
  } catch {
    res.send({
      statusCode: 500,
      msg: "Internal server error",
    });
  }
});

module.exports = router;
