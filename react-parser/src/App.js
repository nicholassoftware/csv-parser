import axios from "axios";
import React, { useState } from "react";

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

  const clearFieldValues = () => {
    setValue({
      date: "",
      vendorName: "",
      selectedFile: null,
    });
  };

  const clearError = () => {
    setValueError({
      dateError: null,
      vendorNameError: null,
      selectedFileError: null,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setValue({ ...values, selectedFile: file });
  };

  const checkAndSetError = (fieldName, value, errorMessage, setError) => {
    if (!value) {
      setError((prevErrors) => ({
        ...prevErrors,
        [fieldName]: errorMessage,
      }));
      return true;
    }
    return false;
  };

  const handleSubmit = async (e) => {
    clearError();
    e.preventDefault();
    if (
      checkAndSetError(
        "dateError",
        values.date,
        "This field is required*.",
        setValueError
      ) ||
      checkAndSetError(
        "vendorNameError",
        values.vendorName,
        "This field is required*.",
        setValueError
      ) ||
      checkAndSetError(
        "selectedFileError",
        values.selectedFile,
        "This field is required*.",
        setValueError
      )
    ) {
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
      console.error("error:::::::", error);
    } finally {
      clearFieldValues();
    }
  };

  return (
    <div>
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
            {valuesError?.dateError ? (
              <div>{valuesError?.dateError}</div>
            ) : null}
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
    </div>
  );
};

export default App;
