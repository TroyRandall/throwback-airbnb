const express = require("express");
const { check, cookie } = require("express-validator");
const { User, Spot, sequelize, Review, SpotImage } = require("../../db/models");
const router = express.Router();
const { requireAuth } = require("../../utils/auth");
const {
  handleValidationErrors,
  handleBodyValidations,
} = require("../../utils/validation");

router.delete("/:id", requireAuth, async (req, res, next) => {
  const userId = +req.user.id;
  const spotId = +req.params.id;
  const spot = await Spot.findOne({ where: { id: spotId } });
  // spot cant be found error handling
  if (!spot) {
    const err = new Error("Spot couldn't be found");
    err.status = 404;
    next(err);
  }
  //authorization error handling
  if (userId !== spot.ownerId) {
    const err = new Error("Spot does not belong to current User");
    err.status = 401;
    next(err);
  }

  await spot.destroy();
  res.json({
    message: "Successfully deleted",
    statusCode: 200,
  });
});
router.put(
  "/:id",
  requireAuth, //checking authentication and error handling
  handleBodyValidations, //error handling validations on request body
  async (req, res, next) => {
    const userId = +req.user.id;
    const spotId = +req.params.id;
    const {
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    } = req.body;
    const spot = await Spot.findOne({ where: { id: spotId } });
    // spot cant be found error handling
    if (!spot) {
      const err = new Error("Spot couldn't be found");
      err.status = 404;
      next(err);
    }
    //authorization error handling
    if (userId !== spot.ownerId) {
      const err = new Error("Spot does not belong to current User");
      err.status = 401;
      next(err);
    }

    const updated = await spot.update({
      address: address,
      city: city,
      state: state,
      country: country,
      lat: lat,
      lng: lng,
      name: name,
      description: description,
      price: price,
    });
    return res.json(updated);
  }
);
router.post(
  "/:id/images",
  requireAuth, //authentication checking
  async (req, res, next) => {
    const userId = +req.user.id;
    const spotId = +req.params.id;
    const spot = await Spot.findOne({ where: { id: spotId } });
    const { url, preview } = req.body;
    // spot cant be found error handling
    if (!spot) {
      const err = new Error("Spot couldn't be found");
      err.status = 404;
      next(err);
    }
    //authorization error handling
    if (userId !== spot.ownerId) {
      const err = new Error("Spot does not belong to current User");
      err.status = 401;
      next(err);
    } else {
      const newSpotImage = SpotImage.create({
        url: url,
        userId: userId,
        spotId: spotId,
        preview: preview,
      });
      //response formatting for API docs
      const response = await SpotImage.findOne({
        where: { url: url },
        attributes: ["id", "url", "preview"],
      });
      return res.json(response);
    }
  }
);

router.post(
  "/",
  requireAuth, //authentication checking and error handling
  handleBodyValidations, //checking validations on req body submissions
  async (req, res, next) => {
    const userId = +req.user.id;
    const {
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    } = req.body;

    const newSpot = await Spot.create({
      ownerId: userId,
      address: address,
      city: city,
      state: state,
      country: country,
      lat: lat,
      lng: lng,
      name: name,
      description: description,
      price: price,
    });
    res.status(201);
    res.json(newSpot);
  }
);

router.get("/currentuser", requireAuth, async (req, res, next) => {
  const userId = req.user.id;
  const spots = await Spot.findAll({
    where: { ownerId: userId },
  });

  return res.json({
    Spots: spots,
  });
});

router.get("/:id", async (req, res, next) => {
  const spotId = +req.params.id;
  const spots = await Spot.findOne({
    where: {
      id: spotId,
    },
    attributes: {
      //aggregate data functions begin here
      include: [
        [sequelize.fn("COUNT", sequelize.col("Reviews.stars")), "numReviews"],
        [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating"],
      ],
    },
    group: ["Reviews.spotId"],
    include: [
      {
        model: Review, //needed for aggregate data to work properly
        attributes: [],
      },
      {
        model: SpotImage,
        attributes: ["id", "url", "preview"],
      },
      {
        model: User,
        as: "Owner",
        attributes: ["id", "firstName", "lastName"],
      },
    ],
  });

  if (spots) {
    return res.json(spots);
  } else {
    //spot couldnt be found error handling
    const err = new Error("Spot couldn't be found");
    err.status = 404;
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  const spots = await Spot.findAll({
    attributes: {
      include: [
        [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgStarRating"],
      ],
    },
    group: ["spotId"],

    include: {
      model: Review,
      attributes: [],
    },
  });

  return res.json({
    Spots: spots,
  });
});

module.exports = router;
