const express = require("express");
const app = express();
const cors = require("cors");
// const mongoose = require('mongoose');
const bodyParser = require("body-parser");

const { upload } = require("./services/csv-upload");
const { CsvStringParser, validateCSV } = require("./services/csv-parse");
// const Vendors = require("./Models/Vendor");

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
      // Create A database schema to set data into data base
      // const Vendors = new Vendors({ date, vendorName, validData })
      // Vendors.save().then(() => {
      //   return res.status(200).json({ message: "Vendors successfully validate and register" });
      // })
      return res.status(200).json({ date, vendorName, validData });
    }
  } catch (error) {
    return res.status(400).json({ errors });
  }
});

// const mongo_uri = process.env.MONGO_URI; 

// mongoose
//   .connect(mongo_uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("Successfully connected to MongoDB");
//     // Start your application or define further actions here
//   })
//   .catch((error) => {
//     console.error("MongoDB connection error:", error.message);
//   });

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
