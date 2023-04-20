const express = require("express");
const bcrypt = require("bcryptjs");
const { Op } = require('sequelize');
const { check, cookie } = require("express-validator");

const
{ handleValidationErrors, validateSignup, validateLogin, isUniqueEmail, isUniqueName }
 = require("../../utils/validation");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");

const router = express.Router();




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

    if (!user || !bcrypt.compareSync(password, user.hashedPassword.toString())) {
      const err = new Error('Invalid credentials');
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
router.get('/currentuser', requireAuth, async (req, res, next) => {
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
router.post("", validateSignup, async (req, res, next) => {
  const { email, password, username, firstName, lastName } = req.body;
  const hashedPassword = bcrypt.hashSync(password);
  await isUniqueName(req, res, next);
  await isUniqueEmail(req, res, next);
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


module.exports = router;
