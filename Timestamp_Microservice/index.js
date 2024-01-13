const express = require("express");
const cors = require("cors"); // Import the cors middleware
const app = express();

// Use cors middleware
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/:date?", function (req, res) {
  let date = req.params.date;

  let unixDate;
  let dateObj;
  let utcDate;

  let isUnix = /^\d+$/.test(date);

  if (typeof req.params.date === "undefined") {
    dateObj = new Date();
  } else if (date && isUnix) {
    unixDate = parseInt(date);
    dateObj = new Date(unixDate);
  } else if (date && !isUnix) {
    dateObj = new Date(date);
  }

  if (dateObj.toString() === "Invalid Date") {
    res.json({ error: "Invalid Date" });
    return;
  }

  unixDate = dateObj.getTime();
  utcDate = dateObj.toUTCString();

  res.json({ unix: unixDate, utc: utcDate });
});

// app.get("/api", function (req, res) {
//   let date = new Date();
//   let unix = date.getTime();
//   let utc = date.toUTCString();
//   res.json({ unix: unix, utc: utc });
// });

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
