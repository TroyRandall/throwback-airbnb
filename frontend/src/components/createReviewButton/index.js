import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";

import * as reviewActions from "../../store/reviews";
import "./createReviewButton.css";

function CreateReviewButton() {
  const newReview = useSelector((state) => state.reviews.newReview)
  const [review, setReview] = useState("");
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const history = useHistory();
  const { id }  = useParams();

  const [reviewModal, setReviewModal] = useState(false);

  const overlayRef = useRef();
  const createReviewRef = useRef();

  useEffect(() => {
    const closeReviewModal = (e) => {
      const reviewInfo = { review, stars };
      if (createReviewRef.current.contains(e.target)) {
        if (review && stars) {
          setErrors({});
          return dispatch(
            reviewActions.createReviewAction( reviewInfo, id )
          ).catch(async (res) => {
            const data = await res.json();
            if (data && (data.message)) {
              setErrors({...errors,  message: data.message});
            }
          }).then(() => dispatch(reviewActions.reviewsBySpotId(id)))}
      }
      else if (overlayRef.current.contains(e.target)) {
        setReviewModal(false);
        setErrors(false)
        setReview('');
        setStars('');
      }
    };
    if(newReview && (newReview.review === review)) {
      dispatch(reviewActions.reviewsBySpotId(id))
        setStars(0);
        setReview('');
        setReviewModal(false);
        history.push(`/spots/${id}`)
    }



    if (reviewModal) {
      document.addEventListener("click", closeReviewModal);

      return () => document.removeEventListener("click", closeReviewModal);
    }
  }, [dispatch, id, newReview, review, reviewModal, stars, history, errors]);

  const toggleReviewModal = () => {
    setReviewModal(true);
  };

  const handleErrors = () => {
    let newErrors = {};
     newErrors.message = errors.message
    console.log(newErrors);
   return (newErrors.message && <p id='errors-create-review'>{newErrors.message}</p>)

    }
const idForButton = 'review-submit' + (((review.length > 9) && (stars > 0)) ? '' : '-disabled')

  const checkReviewModal = () => {
    if (reviewModal === true) {
      return (
        <div className={reviewClassName}>
          <div className="overlay" ref={overlayRef}></div>
          <div className="review-modal-content">
              <label id="review-label">How was your stay?</label>
              {handleErrors()}
              <textarea
                id="review-input"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                required
                placeholder="Leave your review here..."
              />
            <div className="rating">
              <input
                type="radio"
                id="star5"
                name="rating"
                onChange={(e) => setStars(5)}
                value={stars}
              />
              <label htmlFor="star5" title="text"></label>
              <input
                type="radio"
                id="star4"
                name="rating"
                onChange={(e) => setStars(4)}
                value={stars}
              />
              <label htmlFor="star4" title="text"></label>
              <input
                type="radio"
                id="star3"
                name="rating"
                onChange={(e) => setStars(3)}
                value={stars}
              />
              <label htmlFor="star3" title="text"></label>
              <input
                type="radio"
                id="star2"
                name="rating"
                onChange={(e) => setStars(2)}
                value={stars}
              />
              <label htmlFor="star2" title="text"></label>
              <input
                type="radio"
                id="star1"
                name="rating"
                onChange={(e) => setStars(1)}
                value={stars}
              />
              <label htmlFor="star1" title="text"></label>
            </div>
            <h3 id="stars">stars</h3>
            <button ref={createReviewRef} id={idForButton}>
              Submit Your Review
            </button>
          </div>
        </div>
      );
    }
  };

  const reviewClassName = "review-modal" + (reviewModal ? "" : ".hidden");

  return (
    <>
      <button id="post-review-button" onClick={toggleReviewModal}>
        Post Your Review
      </button>
      <div>{checkReviewModal()}</div>
    </>
  );
}

export default CreateReviewButton;
