import React from 'react';
import { useForm, Controller } from 'react-hook-form';

const App = () => {
  const { control, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    // Handle form submission here
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Date:</label>
        <Controller
          name="date"
          control={control}
          rules={{ required: 'Date is required' }}
          render={({ field }) => <input {...field} type="date" />}
        />
        <span>{errors.date && errors.date.message}</span>
      </div>

      <div>
        <label>Vendor Name:</label>
        <Controller
          name="vendorName"
          control={control}
          rules={{ required: 'Vendor name is required' }}
          render={({ field }) => <input {...field} type="text" />}
        />
        <span>{errors.vendorName && errors.vendorName.message}</span>
      </div>

      <div>
        <label>CSV File:</label>
        <Controller
          name="csvFile"
          control={control}
          render={({ field }) => <input {...field} type="file" accept=".csv" />}
        />
      </div>

      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default App;
