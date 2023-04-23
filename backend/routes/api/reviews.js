const express = require("express");
const { check, cookie } = require("express-validator");
const {
  User,
  Spot,
  sequelize,
  Review,
  SpotImage,
  RevImage,
} = require("../../db/models");
const router = express.Router();
const { requireAuth } = require("../../utils/auth");
const {
  handleValidationErrors,
  handleBodyValidations,
  checkReview_stars,
} = require("../../utils/validation");

router.put('/:id',
requireAuth, // checking authentication for logged in user
checkReview_stars, // checking validations for review body
async (req, res, next) => {
    const reviewId = +req.params.id;
    const reviewById = await Review.findOne({where: {id: reviewId}});
    const { review, stars } = req.body;

          // stars validation error handling
          if(stars < 0 || stars > 5) {
            const err = new Error('Validation error');
            err.status = 400;
            err.errors = ['stars must be an integer from 1 to 5']
            next(err);
        }

        await reviewById.update({
            review: review,
            stars: stars,
        });

        return res.json(reviewById);

})
router.post('/:id/images', requireAuth, async (req, res, next) => {
    const userId = +req.user.id;
    const reviewId = +req.params.id;
    const review = await Review.findOne({ where: { id: reviewId } });
    const { url } = req.body;
    // spot cant be found error handling
    if (!review) {
      const err = new Error("Review couldn't be found");
      err.status = 404;
      next(err);
    }
    //authorization error handling
    if (userId !== review.userId) {
      const err = new Error("Review does not belong to current User");
      err.status = 401;
      next(err);
    }

    const totalImages = await RevImage.findAll({where: {reviewId: reviewId} })
    if(totalImages.length === 10){
        const err = new Error('Maximum number of images for this resource was reached');
        err.status = 403;
        next(err);
    };

    const newImage = await RevImage.create({
        userId: userId,
        reviewId: reviewId,
        url: url
    });
    const { id } = newImage;
    return res.json({
        id: id,
        url: url
    });

    })



module.exports = router;
