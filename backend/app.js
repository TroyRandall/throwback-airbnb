const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const { environment } = require('./config');
const isProduction = environment === 'production';

const app = express();

app.use(morgan('dev'));

app.use(cookieParser());
app.use(express.json());



// Security Middleware
if (!isProduction) {
    // enable cors only in development
    app.use(cors());
  }

  // helmet helps set a variety of headers to better secure your app
  app.use(
    helmet.crossOriginResourcePolicy({
      policy: "cross-origin"
    })
  );

  // Set the _csrf token and create req.csrfToken method
  app.use(
    csurf({
      cookie: {
        secure: isProduction,
        sameSite: isProduction && "Lax",
        httpOnly: true
      }
    })
  );


// backend/app.js
const routes = require('./routes');

// ...

app.use(routes); // Connect all the routes

// Catch unhandled requests and forward to error handler.
app.use((_req, _res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.title = "Resource Not Found";
  err.errors = { message: "The requested resource couldn't be found." };
  err.status = 404;
  next(err);
});

const { ValidationError } = require('sequelize');

// ...

// Process sequelize errors
app.use((err, _req, _res, next) => {
  // check if error is a Sequelize error:
  if (err instanceof ValidationError) {
    let errors = [];
    for(let i = 0; i < err.length; i++){
      errors.push(err.message)
    }
    err.title = 'Validation error';
    err.errors = errors;
  }
  next(err)
}),

// Error formatter
app.use((err, _req, res, _next) => {

  if(err.status === 403){
    res.status(err.status);
    console.error(err);
    if(err.errors){
      return res.json({
        message: err.message,
        statusCode: err.status,
        errors: err.errors
      })
    } else {
        return res.json({
      message: err.message,
      statusCode: err.status,
    })
    }

  }
  if(err.status === 400){
    res.status(err.status);
    console.error(err);
    if(err.errors){
      return res.json({
        message: err.message,
        statusCode: err.status,
        errors: err.errors
      })
    } else {
        return res.json({
      message: err.message,
      statusCode: err.status,
    })
    }
  }
  if(err.status === 404){
    res.status(err.status);
    console.error(err);
    return res.json({
      message: err.message,
      statusCode: err.status,
    })
  }

  if(err.status === 401){
    res.status(err.status);
    console.error(err);
    return res.json({
      message: err.message,
      statusCode: err.status,
      errors: (err.errors ? err.errors : null)

    })
  }

  res.status(err.status || 500);
  console.error(err);
  res.json({
    message: err.message,
    statusCode: err.status,
    errors: err.errors,
  });
});

module.exports = app;
