const { validationResult } = require('express-validator');
const { User } = require('../db/models')

isUniqueName = (value, req, res, next) => {
  const user = User.findOne({
    where: {
      'username': value
    }
  })

  if(user){
     const err = new Error('User already exists');
     err.status = 403;
     err.errors = [
      "User with that username already exists"
     ]
  }
}
// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = [];
    validationErrors
      .array()
      .forEach(error => errors.push(error.msg));

    const err = Error("Validation error");
    err.errors = errors;
    err.status = 400;
    err.title = "Bad request.";
    next(err);
  }
  next();
};

const UserAlreadyExistsErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = [];
    validationErrors
      .array()
      .forEach(error => errors.push(error.msg));

    const err = Error("User already exists");
    err.errors = errors;
    err.status = 403;
    err.title = "Bad request.";
    next(err);
  }
  next();
};
module.exports = {
  handleValidationErrors, UserAlreadyExistsErrors
};
