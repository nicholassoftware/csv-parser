const csv = require("fast-csv");

const CsvStringParser = async (csvString) => {
  const dataArr = [];

  try {
    await new Promise((resolve, reject) => {
      const stream = csv
        .parse({ headers: true }) // Assumes the first row contains headers
        .on("error", (error) => {
          reject({ status: 400, message: "Invalid Csv" });
        })
        .on("data", (row) => {
          dataArr.push(row);
        })
        .on("end", (rowCount) => {
          resolve(dataArr);
          console.log(`Parsed ${rowCount} rows`);
        });
      stream.write(csvString);
      stream.end();
    });
  } catch (e) {
    throw { status: 400, message: e.message };
  }

  return dataArr;
};

const validateCSV = (data) => {
  console.log({ data });
  const errors = [];
  const validData = [];

  data.forEach((row, index) => {
    const modelNumber = row["Model Number"];
    const unitPrice = parseFloat(row["Unit Price"]);
    const quantity = parseInt(row["Quantity"], 10);

    console.log({ modelNumber, unitPrice, quantity });

    if (!modelNumber || typeof modelNumber !== "string") {
      errors.push(
        `Row ${index + 1}: Model Number is required and must be a string.`
      );
    }
    if (isNaN(unitPrice)) {
      errors.push(
        `Row ${index + 1}: Unit Price is required and must be a float/decimal.`
      );
    }
    if (isNaN(quantity)) {
      errors.push(
        `Row ${index + 1}: Quantity is required and must be a integer.`
      );
    }

    if (!errors.length) {
      validData.push({ modelNumber, unitPrice, quantity });
    }
  });

  return { validData, errors };
};

module.exports = {
  validateCSV,
  CsvStringParser,
};
