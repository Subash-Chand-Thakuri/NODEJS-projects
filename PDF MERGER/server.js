const express = require("express");
const path = require("path");
const app = express();
const multer = require("multer");
const { mergePdfs } = require("./merge");

const upload = multer({ dest: "./public/data/uploads/" });

app.use("/static", express.static("public"));
const port = 3000;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "templates/index.html"));
});

app.post("/merge", upload.array("pdfs", 20), async (req, res, next) => {
  try {
    const pdfPaths = req.files.map((file) => path.join(__dirname, file.path));

    if (pdfPaths.length < 2) {
      return res.status(400).send("Please upload at least 2 files.");
    }

    if (pdfPaths.length > 20) {
      return res.status(400).send("You can upload a maximum of 20 files.");
    }

    const mergedFileName = await mergePdfs(pdfPaths);
    if (mergedFileName) {
      res.redirect(`http://localhost:3000/static/${mergedFileName}`);
    } else {
      console.error("Error merging PDFs: Merged file name is undefined.");
      res.status(500).send("Internal Server Error");
    }
  } catch (err) {
    console.error("Error merging PDFs:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
});
