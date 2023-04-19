const express = require("express");
const bcrypt = require("bcryptjs");
const { Op } = require('sequelize');
const { check, cookie } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");

const router = express.Router();

const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Please provide a username with at least 4 characters."),
  check("username").not().isEmail().withMessage("Username cannot be an email."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
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

//login route
router.post(
  '/login',
    validateLogin,
      async (req, res, next) => {
        const { credential, password } = req.body;

      const user = await User.unscoped().findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential
          }
        }
      });

    if(!credential){
      const err = new Error('login failed');
      err.status = 400;
      err.title = 'Login failed';
      err.errors = { credential: 'Email or username is required'};
      return next(err);
    }

    if(!password){
      const err = new Error('login failed');
      err.status = 400;
      err.title = 'Login failed';
      err.errors = { credential: 'password is required'};
      return next(err);
    }

    if (!user || !bcrypt.compareSync(password, user.hashedPassword.toString())) {
      const err = new Error('Login failed');
      err.status = 401;
      err.title = 'Login failed';
      err.errors = { credential: 'The provided credentials were invalid.' };
      return next(err);
    }

    const safeUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
      token: ""

    };

    await setTokenCookie(res, safeUser);

    return res.json({
      user: safeUser
    });
  }
);

  // Log out
  router.delete(
    '/',
    (_req, res) => {
      res.clearCookie('token');
      return res.json({ message: 'success' });
    }
  );

//currentUser
router.get('/currentuser', async (req, res, next) => {
  if(req.user){
    const userId = +req.user.id;
  const currentScope = User.scope('current');



  const current = await currentScope.findByPk(userId);
  const { id, firstName, lastName, email, username } = current;
  return res.json({
    user: {
      id,
      firstName,
      lastName,
      email,
      username
    }
  })
  } else {
    return res.json({
      user: null
    })
  }

}),
// Sign up
router.post("", validateSignup, async (req, res) => {
  const { email, password, username, firstName, lastName } = req.body;
  const hashedPassword = bcrypt.hashSync(password);
  const user = await User.create({ email, username, firstName, lastName, hashedPassword });

  const safeUser = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    username: user.username,

  };

  await setTokenCookie(res, safeUser);

  return res.json({
    user: safeUser,
  });

}),

router.post("", async (req, res, err) => {
  if(err.status === 401) {
    return res.json({
      message: "Invalid credentials",
      statusCode: 401
    })
  };

  if(err.status === 400) {
    return res.json({
        message: "Validation error",
        statusCode: 400,
        errors: [
          err.errors.credential
        ]
      })
  }
})

module.exports = router;
