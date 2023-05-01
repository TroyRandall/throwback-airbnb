const express = require("express");
const { Op } = require("sequelize");
const {
  User,
  Spot,
  sequelize,
  Review,
  SpotImage,
  RevImage,
  Booking,
} = require("../../db/models");
const router = express.Router();
const { requireAuth } = require("../../utils/auth");
const {
  handleValidationErrors,
  handleBodyValidations,
  checkReview_stars,
  validateBooking,
} = require("../../utils/validation");
const isBefore = require("date-fns/isBefore");
const parseISO = require("date-fns/parseISO");

router.delete("/:id", requireAuth, async (req, res, next) => {
  const bookingId = +req.params.id;
  const userId = +req.user.id;
  const booking = await Booking.findOne({ where: { id: bookingId } });

  // booking cant be found error handling
  if (!booking) {
    const err = new Error("Booking couldn't be found");
    err.status = 404;
    return next(err);
  }
  //checking booking has not started before deletion
  const now = new Date();
  if (isBefore(parseISO(booking.startDate), now)) {
    const err = new Error("Bookings that have been started can't be deleted");
    err.status = 403;
    return next(err);
  }
  const spot = await Spot.findOne({ where: { id: booking.spotId } });
  //authorization error handling
  if (userId !== booking.userId && userId !== spot.ownerId) {
    const err = new Error("Forbidden");
    err.status = 401;
    return next(err);
  }

  await booking.destroy();
  return res.json({
    message: "Successfully deleted",
    statusCode: 200,
  });
});
router.put(
  "/:id",
  requireAuth, //checking authentication
  validateBooking, //validating startDate and endDate from req.body
  async (req, res, next) => {
    const bookingId = +req.params.id;
    const userId = +req.user.id;
    const { endDate, startDate } = req.body;
    const bookings = await Booking.findOne({ where: { id: bookingId } });
    const bookings1 = await Booking.findAll({
      where: {
        id: bookingId,
        startDate: { [Op.between]: [startDate, endDate] },
      },
    });
    const bookings2 = await Booking.findAll({
      where: { id: bookingId, endDate: { [Op.between]: [startDate, endDate] } },
    });

    // booking cant be found error handling
    if (!bookings) {
      const err = new Error("Booking couldn't be found");
      err.status = 404;
      return next(err);
    }
    //checking endDate of booking has not already happened
    const now = new Date();
    if (isBefore(parseISO(bookings.endDate), now)) {
      const err = new Error("Past bookings can't be modified");
      err.status = 403;
      return next(err);
    }
    //authorization error handling
    if (userId !== bookings.userId) {
      const err = new Error("Forbidden");
      err.status = 401;
      return next(err);
    }
    //checking endDate is not before startDate
    if (
      isBefore(parseISO(endDate), parseISO(startDate)) ||
      endDate === startDate
    ) {
      const err = new Error("Validation error");
      err.status = 400;
      err.errors = "endDate cannot be on or before startDate";
      return next(err);
    }
    //checking startDate against existing bookings
    if (bookings1.length > 0) {
      const err = new Error(
        "Sorry, this spot is already booked for the specified dates"
      );
      err.status = 403;
      err.errors = "Start date conflicts with an existing booking";
      return next(err);
    }
    //checking endDate against existing bookings
    if (bookings2.length > 0) {
      const err = new Error(
        "Sorry, this spot is already booked for the specified dates"
      );
      err.status = 403;
      err.errors = "End date conflicts with an existing booking";
      return next(err);
    }

    const updated = await bookings.update({
      startDate: startDate,
      endDate: endDate,
    });

    return res.json(updated);
  }
);

module.exports = router;
