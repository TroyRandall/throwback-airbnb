const express = require("express");
const { Op } = require("sequelize");
const { check, cookie } = require("express-validator");
const {
  User,
  Spot,
  sequelize,
  Review,
  SpotImage,
  RevImage,
  Booking,
} = require("../../db/models");
const isBefore = require("date-fns/isBefore");
const parseISO = require("date-fns/parseISO");
const router = express.Router();
const { requireAuth } = require("../../utils/auth");
const {
  handleValidationErrors,
  handleBodyValidations,
  checkReview_stars,
  validateBooking,
} = require("../../utils/validation");

router.delete("/:id/images/:imageid", requireAuth, async (req, res, next) => {
  const spotId = +req.params.id;
  const spotImageId = +req.params.imageid;
  const userId = +req.user.id;
  const spot = await Spot.findOne({ where: { id: spotId } });
  const spotImage = await SpotImage.findOne({ where: { id: spotImageId } });
  // spot cant be found error handling
  if (!spot) {
    const err = new Error("Spot couldn't be found");
    err.status = 404;
    return next(err);
  }
  //authorization error handling
  if (userId !== spot.ownerId) {
    const err = new Error("Forbidden");
    err.status = 401;
    return next(err);
  }
  //handle spotImage not found error
  if (!spotImage) {
    const err = new Error("Spot Image couldn't be found");
    err.status = 404;
    err.errors = ["You must provide a valid id for the spot's image"];
    return next(err);
  }
  await spotImage.destroy();

  return res.json({
    message: "Successfully deleted",
    statusCode: 200,
  });
});
router.delete("/:id", requireAuth, async (req, res, next) => {
  const userId = +req.user.id;
  const spotId = +req.params.id;
  const spot = await Spot.findOne({ where: { id: spotId } });
  // spot cant be found error handling
  if (!spot) {
    const err = new Error("Spot couldn't be found");
    err.status = 404;
    return next(err);
  }
  //authorization error handling
  if (userId !== spot.ownerId) {
    const err = new Error("Forbidden");
    err.status = 401;
    return next(err);
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
      return next(err);
    }
    //authorization error handling
    if (userId !== spot.ownerId) {
      const err = new Error("Forbidden");
      err.status = 401;
      return next(err);
    }

    const spot1 = await Spot.findAll({ where: { name: name } });

    if (spot.name !== name && spot1.length > 1) {
      const err = new Error("Validation Error");
      err.status = 400;
      err.errors = ["Name must be unique"];
      return next(err);
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
  "/:id/bookings", //url for creating booking based on spots ID
  requireAuth, //validationg authentication before starting route
  validateBooking, //validating startDate and endDate from req.body
  async (req, res, next) => {
    const userId = +req.user.id;
    const spotId = +req.params.id;
    const spot = await Spot.findOne({ where: { id: spotId } });
    const { startDate, endDate } = req.body;
    const bookings = await Booking.findAll({
      where: {
        spotId: spotId,
        startDate: { [Op.between]: [startDate, endDate] },
      },
    });
    const bookings2 = await Booking.findAll({
      where: {
        spotId: spotId,
        endDate: { [Op.between]: [startDate, endDate] },
      },
    });
    //Enddate cannot be before startDate
    if (
      isBefore(parseISO(endDate), parseISO(startDate)) ||
      endDate === startDate
    ) {
      const err = new Error("Validation error");
      err.status = 400;
      err.errors = "endDate cannot be on or before startDate";
      return next(err);
    }
    // spot cant be found error handling
    if (!spot) {
      const err = new Error("Spot couldn't be found");
      err.status = 404;
      return next(err);
    }
    //authorization error handling
    if (userId === spot.ownerId) {
      const err = new Error("Forbidden");
      err.status = 401;
      return next(err);
    }
    //validating startDate against existing bookings dates
    if (bookings.length > 0) {
      const err = new Error(
        "Sorry, this spot is already booked for the specified dates"
      );
      err.status = 403;
      err.errors = "Start date conflicts with an existing booking";
      return next(err);
    }
    //validating endDate against existing bookings dates
    if (bookings2.length > 0) {
      const err = new Error(
        "Sorry, this spot is already booked for the specified dates"
      );
      err.status = 403;
      err.errors = "End date conflicts with an existing booking";
      return next(err);
    }

    const newBooking = await Booking.create({
      userId: userId,
      spotId: spotId,
      startDate: startDate,
      endDate: endDate,
    });

    return res.json(newBooking);
  }
),
  router.post(
    "/:id/reviews",
    requireAuth, //checking authentication before starting
    checkReview_stars, //checking review
    async (req, res, next) => {
      const userId = +req.user.id;
      const spotId = +req.params.id;
      const { review, stars } = req.body;
      const spot = await Spot.findOne({ where: { id: spotId } });
      const prevReview = await Review.findOne({
        where: { userId: userId, spotId: spotId },
      });

      //review already exist error handling
      if (prevReview) {
        const err = new Error("user already has a review for this spot");
        err.status = 403;
        return next(err);
      }
      // spot cant be found error handling
      if (!spot) {
        const err = new Error("Spot couldn't be found");
        err.status = 404;
        return next(err);
      }
      // stars validation error handling
      if (stars < 0 || stars > 5 || stars === undefined) {
        const err = new Error("Validation error");
        err.status = 400;
        err.errors = ["stars must be an integer from 1 to 5"];
        return next(err);
      }

      const newReview = await Review.create({
        userId: userId,
        spotId: spotId,
        review: review,
        stars: stars,
      });

      const newReviewUpdated = await Review.findOne({
        where: {
          review: review,
        },
        include: [
          {
            model: User,
            attributes: ["id", "firstName", "lastName"],
          },
        ],
      });

      return res.json(newReviewUpdated);
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
      const err = new Error("Forbidden");
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
    const spot = await Spot.findAll({ where: { name: name } });

    if (spot.length > 0) {
      const err = new Error("Validation Error");
      err.status = 400;
      err.errors = ["Name must be unique"];
      return next(err);
    }

    if (lat.toString() === lat) {
      const err = new Error("Validation Error");
      err.status = 400;
      err.errors = ["Latitude is invalid"];
      return next(err);
    }

    if (!(isFinite(lat) && Math.abs(lat) <= 90)) {
      const err = new Error("Validation Error");
      err.status = 400;
      err.errors = ["Latitude is invalid"];
      return next(err);
    }

    if (lng.toString() === lng) {
      const err = new Error("Validation Error");
      err.status = 400;
      err.errors = ["longitude is invalid"];
      return next(err);
    }

    if (!(isFinite(lng) && Math.abs(lng) <= 180)) {
      const err = new Error("Validation Error");
      err.status = 400;
      err.errors = ["Longitude is invalid"];
      return next(err);
    }
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
router.get("/:id/bookings", requireAuth, async (req, res, next) => {
  const currentId = +req.user.id;
  const spotId = +req.params.id;
  const spot = await Spot.findOne({ where: { id: spotId } });
  const spotsRelated = Booking.scope("spotsRelated");
  if (!spot) {
    const err = new Error("Spot couldn't be found");
    err.status = 404;
    next(err);
  }
  const userBookings = await Booking.findAll({
    where: {
      spotId: spotId,
    },
    include: {
      model: User,
      attributes: ["id", "firstName", "lastName"],
    },
  });
  const bookings = await spotsRelated.findAll({
    where: {
      spotId: spotId,
    },
  });

  if (spot.ownerId !== currentId) {
    return res.json(bookings);
  } else {
    return res.json(userBookings);
  }
});
router.get("/:id/reviews", async (req, res, next) => {
  const id = +req.params.id;
  const spot = await Spot.findOne({ where: { id: id } });
  const Reviews = await Review.findAll({
    where: {
      spotId: id,
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

  if (!spot) {
    const err = new Error("Spot couldn't be found");
    err.status = 404;
    next(err);
  } else {
    return res.json({ Reviews });
  }
});
router.get("/currentuser", requireAuth, async (req, res, next) => {
  const userId = req.user.id;
  const spots = await Spot.findAll({
    where: { ownerId: userId },
  });
  const resArray = [];

  for (let i = 0; i < spots.length; i++) {
    const spot = spots[i].toJSON();

    const AvgStarRating = await Review.findAll({
      where: {
        spotId: spot.id,
      },
      attributes: [
        [sequelize.fn("AVG", sequelize.col("stars")), "avgStarRating"],
      ],
      raw: true,
    });
    spot.avgStarRating = (+AvgStarRating[0].avgStarRating).toFixed(2);

    const previewImage = await SpotImage.findAll({
      where: {
        spotId: spot.id,
        preview: true,
      },
      attributes: ["url"],
      raw: true,
    });

    spot.previewImage =
      previewImage.length > 0 //validating if url exists. if not null
        ? previewImage[previewImage.length - 1].url
        : null;
    resArray.push(spot);
  }
  return res.json({
    Spots: resArray,
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
        [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgStarRating"],
      ],
    },
    group: [["Reviews.spotId"], ["Spot.id"]],
    include: [
      {
        model: Review, //needed for aggregate data to work properly
        attributes: [],
      },
    ],
  });

  if (spots) {
    const spot = spots.toJSON();
    spot.avgStarRating = (+spot.avgStarRating).toFixed(2);
    const spotImages = await SpotImage.findAll({
      where: { spotId: spotId },
      attributes: ["id", "url", "preview"],
    });
    spot.SpotImages = spotImages;

    const owner = await User.findOne({
      where: { id: spot.ownerId },
      attributes: ["id", "firstName", "lastName"],
    });
    spot.Owner = owner;
    return res.json(spot);
  } else {
    //spot couldnt be found error handling
    const err = new Error("Spot couldn't be found");
    err.status = 404;
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  let page = req.query.page;
  let size = req.query.size;
  const { minLat, maxLat, maxLng, minLng, minPrice, maxPrice } = req.query;
  if (!page) page = 0; //default value for page
  if (!size) size = 20; //default value for size
  let queries = { where: {} };
  let pagination = {};
  if (page > 0) pagination.offset = size * page; //validating and setting page
  pagination.limit = size; // setting size
  if (maxLat) {
    //building pagination objects starts here
    queries.where.lat = { [Op.lte]: maxLat };
  }
  if (minLat) {
    queries.where.lat = { [Op.gte]: minLat };
  }
  if (maxLng) {
    queries.where.lng = { [Op.lte]: maxLng };
  }
  if (minLng) {
    queries.where.lng = { [Op.gte]: minLng };
  }
  if (minPrice) {
    queries.where.price = { [Op.gte]: minPrice };
  }
  if (maxPrice) {
    queries.where.price = { [Op.lte]: maxPrice };
  } //end of building pagination object

  const spots = await Spot.findAll({
    ...queries,
    ...pagination,
  });
  const resArray = [];

  for (let i = 0; i < spots.length; i++) {
    const spot = spots[i].toJSON();

    const AvgStarRating = await Review.findAll({
      where: {
        spotId: spot.id,
      },
      attributes: [
        [sequelize.fn("AVG", sequelize.col("stars")), "avgStarRating"],
      ],
      raw: true,
    });
    spot.avgStarRating = (+AvgStarRating[0].avgStarRating).toFixed(2);

    const previewImage = await SpotImage.findAll({
      where: {
        spotId: spot.id,
        preview: true,
      },
      attributes: ["url"],
      raw: true,
    });

    spot.previewImage =
      previewImage.length > 0 //validating if url exists. if not null
        ? previewImage[previewImage.length - 1].url
        : null;
    resArray.push(spot);
  }
  return res.json({
    Spots: resArray,
    page: page,
    size: size,
  });
});

module.exports = router;
