const { validationResult } = require('express-validator');
const { User } = require('../db/models');
const { check, cookie } = require("express-validator");
const { isBefore } = require('date-fns');


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
const validateBooking = [
  check('startDate')
    .not().isEmpty()
    .isDate()
    .withMessage('startDate is required and must be a date'),
  check('startDate')
    .isAfter(Date.Now)
    .withMessage('startDate must be after the current date'),
  check('endDate')
    .not().isEmpty()
    .isDate()
    .withMessage('endDate is required and must be a date'),
    handleValidationErrors
]
const checkReview_stars = [
  check('review')
    .not().isEmpty()
    .withMessage("Review text is required"),
  check('stars')
    .not().isEmpty()
    .isNumeric()
    .withMessage('Stars must be an integer from 1 to 5'),
  handleValidationErrors
]
const handleBodyValidations = [
  check('address')
      .exists({ checkFalsy: true})
      .withMessage('Street address is required'),
  check('city')
      .exists({ checkFalsy: true})
      .withMessage('City is required'),
  check('state')
      .exists({ checkFalsy: true})
      .withMessage('State is required'),
  check('country')
      .exists({ checkFalsy: true})
      .withMessage('Country is required'),
  check('lat')
      .isFloat()
      .not().isAlpha()
      .withMessage('Latitude is not valid'),
  check('lng')
      .isFloat()
      .not().isAlpha()
      .withMessage('Longitude is not valid'),
  check('name')
      .isLength({ max: 50})
      .withMessage('Name must be less than 50 characters'),
  check('name')
      .not().isEmpty()
      .withMessage('Name cannot be empty'),
  check('description')
      .exists({ checkFalsy: true})
      .withMessage('Description is required'),
  check('price')
      .exists({ checkFalsy: true})
      .withMessage('Price per day is required'),
  handleValidationErrors,
]

const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("The Provided Email is Invalid"),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Please provide a username with at least 4 characters."),
  check("username").not().isEmail().withMessage("Username cannot be an email."),
  check("username")
    .not().isEmpty()
    .withMessage("Username is required"),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  check("firstName")
    .not().isEmpty()
    .withMessage("First name is required"),
  check("lastName")
    .not().isEmpty()
    .withMessage("Last name is required"),
  handleValidationErrors,
];

const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Email or username is required'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Password is required'),
  handleValidationErrors
];

const isUniqueName = async (req, res, next) => {
  const { username } = req.body;
  const user = await User.findAll({
    where: {
      username: username
    }
  })


  if(user.length > 0){
     const err = new Error('User already exists');
     err.status = 403;
     err.errors = [
      "User with that username already exists"
     ]
     next(err);
  }
};

 const isUniqueEmail = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({
    where: {
      email: email
    }
  })

  if(user){
     const err = new Error('User already exists');
     err.status = 403;
     err.errors = [
      "User with that email already exists"
     ]
     next(err);
  }
};

module.exports = {
  handleValidationErrors, isUniqueName, isUniqueEmail, validateLogin, validateSignup, handleBodyValidations, checkReview_stars, validateBooking
};
