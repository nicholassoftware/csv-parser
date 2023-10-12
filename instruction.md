Your task is to implement a feature which allows employees to bulk insert purchase order information. To demonstrate the feature, you need to build a minimal app, which includes a front-end web interface and a back-end API service.
The application should have a form that allows employees to submit the purchase order details. The required form fields are date, vendor name and a file that accepts a CSV containing the following required information: Model Number, Unit Price, Quantity. The form will be submitted to the backend and the application should display either a success message or any validation errors that occurred.

The backend service should parse the CSV and form elements and relay any validation errors to the frontend. The uploaded file requires Model Number to be a string, Unit Price to be a float/decimal, and Quantity should be an integer. Valid submissions should have all data persisted to your choice of storage.
Feel free to implement any additional business rules you see appropriate. If you decided to add anything, please explain your reasoning.

For this coding exercise, you are allowed to use any programming languages, frameworks, and tools.
A submitted solution should be runnable without configuration, modifying code or computer settings, e.g. Docker, Heroku, etc.
The code should be submitted to GitHub so that we can look at the commit history and validate your knowledge of Git. The first commit should only contain a README.md file containing a time estimate for completion of this exercise. It should be done immediately upon starting this exercise.

# CSV Parser API

## cd backend-csv-parser
## npm install
## npm start

endpoint api/csv-parser

form-data body
required*
date
vendorName
File(Conditions define in task)

# CSV Parser Frontend

## cd react-parser
## npm install
## npm start
