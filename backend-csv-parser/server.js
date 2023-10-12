const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const { upload } = require("./services/csv-upload");
const { CsvStringParser, validateCSV } = require("./services/csv-parse");

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello CSV-Parser API");
});

app.post("/api/csv-parser", upload, async (req, res) => {
  try {
    const date = req.body.date;
    const vendorName = req.body.vendorName;
    if (!date || !vendorName || !req.file) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const fileContent = req.file?.buffer;
    const data = await CsvStringParser(fileContent);
    if (data) {
      const { validData, errors } = validateCSV(data);
      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }
      return res.status(200).json({ date, vendorName, validData });
    }
  } catch (error) {
    return res.status(400).json({ errors });
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
