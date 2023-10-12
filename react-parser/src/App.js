import React, { useState } from "react";
import axios from "axios";


const App = () => {
  const [values, setValue] = useState({
    date: "",
    vendorName: "",
    selectedFile: null,
  });

  const [valuesError, setValueError] = useState({
    dateError: null,
    vendorNameError: null,
    selectedFileError: null,
  });

  const handleChange = (e) => {
    setValue({ ...values, [e.value.name]: e.value.target });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setValue({ ...values, selectedFile: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!values.date || !values.vendorName || !values.selectedFile) {
      console.log("inside error");
      if (!values.date)
        setValueError({
          ...valuesError,
          dateError: "This field is required*.",
        });
      if (!values.vendorName)
        setValueError({
          ...valuesError,
          vendorNameError: "This field is required*.",
        });
      if (!values.selectedFile)
        setValueError({
          ...valuesError,
          selectedFileError: "This field is required*.",
        });
      return;
    }

    const formData = new FormData();
    formData.append("date", values.date);
    formData.append("vendorName", values.vendorName);
    formData.append("file", values.selectedFile);

    try {
      const response = await axios.post(
        "http://localhost:4000/api/csv-parser",
        formData
      );
      console.log({ response });
    } catch (error) {
      console.log("error:::::::", error);
    }
  };

  console.log({ valuesError });
  console.log({ values });

  return (
    <div>
      <h2>Details Upload Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={values.date}
            onChange={(e) => setValue({ ...values, date: e.target.value })}
          />
          {valuesError?.dateError ? <div>{valuesError?.dateError}</div> : null}
        </div>

        <div>
          <label>Vendor Name:</label>
          <input
            type="text"
            name="vendorName"
            value={values.vendorName}
            onChange={(e) =>
              setValue({ ...values, vendorName: e.target.value })
            }
          />
          {valuesError?.vendorNameError ? (
            <div>{valuesError?.vendorNameError}</div>
          ) : null}
        </div>

        <div>
          <label>Upload a File:</label>
          <input type="file" accept=".csv" onChange={handleFileChange} />
          {valuesError?.selectedFileError ? (
            <div>{valuesError?.selectedFileError}</div>
          ) : null}
        </div>

        {values?.selectedFile && (
          <div>
            <p>Selected File: {values?.selectedFile?.name}</p>
            <p>File Size: {values?.selectedFile?.size} bytes</p>
          </div>
        )}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default App;
