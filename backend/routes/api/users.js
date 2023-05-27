const express = require("express");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");
const { check, cookie } = require("express-validator");

const {
  handleValidationErrors,
  validateSignup,
  validateLogin,
  isUniqueEmail,
  isUniqueName,
} = require("../../utils/validation");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const {
  User,
  Review,
  Spot,
  RevImage,
  SpotImage,
  Booking,
} = require("../../db/models");

const router = express.Router();

const cookieParser = require("cookie-parser");
const app = express();
app.use(cookieParser());

//login route
router.post("/login", validateLogin, async (req, res, next) => {
  const { credential, password } = req.body;

  const user = await User.unscoped().findOne({
    where: {
      [Op.or]: {
        username: credential,
        email: credential,
      },
    },
  });

  if (!user || !bcrypt.compareSync(password, user.hashedPassword.toString())) {
    const err = new Error("Invalid credentials");
    err.status = 401;
    err.title = "Login failed";
    err.errors = { credential: "The provided credentials were invalid." };
    return next(err);
  }

  const safeUser = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    username: user.username,
    token: "",
  };

  await setTokenCookie(res, safeUser);
  safeUser.token = req.cookies.token;
  return res.json({
    user: safeUser,
  });
});

// Log out
router.delete("/", (_req, res) => {
  res.clearCookie("token");
  return res.json({ message: "success" });
});
//currentUser/bookings
router.get("/currentuser/bookings", requireAuth, async (req, res, next) => {
  const currentId = +req.user.id;
  const Bookings = await Booking.findAll({
    where: {
      userId: currentId,
    },
  });
  if (Bookings.length < 0) {
    return res.json({ Bookings: [] });
  } else {
    let resArray = [];
    for (let i = 0; i < Bookings.length; i++) {
      const booking = Bookings[i].toJSON();
      const spot = await Spot.findOne({
        where: { id: booking.spotId },
        attributes: { exclude: ["createdAt", "updatedAt"] },
        raw: true
      });
      const previewImage = await SpotImage.findAll({
        where: { spotId: booking.spotId, preview: true },
        attributes: ["url"],
        raw: true
      });

      spot.previewImage =
        previewImage.length > 0 //validating if url exists. if not null
          ? previewImage[previewImage.length - 1].url
          : null;
      booking.Spot = spot;
      resArray.push(booking);
    }

    return res.json({ Bookings: resArray });
  }
});

//currentUser/reviews
router.get("/currentuser/reviews", requireAuth, async (req, res, next) => {
  const id = +req.user.id;
  const Reviews = await Review.findAll({
    where: {
      userId: id,
    },
    include: [
      {
        model: User,
        attributes: ["id", "firstName", "lastName"],
      },
      {
        model: RevImage,
        as: "ReviewImages",
        attributes: ["id", "url"],
      },
    ],
  });

  const resArray = [];
  for (let i = 0; i < Reviews.length; i++) {
    const review = Reviews[i].toJSON();
    const spotId = review.spotId;
    const spot = await Spot.findOne({
      where: { id: spotId },
      raw: true,
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    const previewImage = await SpotImage.findAll({
      where: {
        spotId: spotId,
        preview: true,
      },
      attributes: ["url"],
    });

    spot.previewImage =
      previewImage.length > 0 //validating if url exists. if not null
        ? previewImage[previewImage.length - 1].url
        : null;
    review.Spot = spot;

    resArray.push(review);
  }

  return res.json({ Reviews: resArray });
});

//currentUser
router.get("/currentuser", requireAuth, async (req, res, next) => {
  if (req.user) {
    const userId = +req.user.id;
    const currentScope = User.scope("current");
    const current = await currentScope.findByPk(userId);
    const { id, firstName, lastName, email, username } = current;
    return res.json({
      user: {
        id,
        firstName,
        lastName,
        email,
        username,
      },
    });
  } else {
    return res.json({
      user: null,
    });
  }
}),
  // Sign up
  router.post("", validateSignup, async (req, res, next) => {
    const { email, password, username, firstName, lastName } = req.body;
    const hashedPassword = bcrypt.hashSync(password);
    await isUniqueName(req, res, next);
    await isUniqueEmail(req, res, next);
    const user = await User.create({
      email,
      username,
      firstName,
      lastName,
      hashedPassword,
    });

    const safeUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
    };

    await setTokenCookie(res, safeUser);
    safeUser.token = req.cookies.token;
    return res.json({
      user: safeUser,
    });
  }),
  (module.exports = router);
