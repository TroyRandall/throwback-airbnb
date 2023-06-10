import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";

import "./createReviewButton.css";

function CreateReviewButton() {
  const sessionUser = useSelector((state) => state.session.user);
  const [review, setReview] = useState("");
  const [stars, setStars] = useState(0);

  const [reviewModal, setReviewModal] = useState(false);

  const overlayRef = useRef();
  const createReviewRef = useRef();

  useEffect(() => {
    const closeReviewModal = (e) => {
      if (createReviewRef.current.contains(e.target)) {
      }
    };
  });

  const toggleReviewModal = () => {
    setReviewModal(true);
  };


  const checkReviewModal = () => {
    if (reviewModal === true) {
      return (
        <div className={reviewClassName}>
          <div className="overlay" ref={overlayRef}></div>
          <div className="review-modal-content">
            <div>
<label id="review-label">
              How was your stay?
               </label>
              <input
                id="review-input"
                type="textarea"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                required
                placeholder='Leave your review here...'
              />

            </div>


            <div className="rating">
              <input
                type="radio"
                id="star5"
                name="rating"
                onChange={(e) => setStars(e.target.value)}
                value="5"
              />
              <label for="star5" title="text"></label>
              <input
                type="radio"
                id="star4"
                name="rating"
                onChange={(e) => setStars(e.target.value)}
                value="4"
              />
              <label for="star4" title="text"></label>
              <input
                checked=""
                type="radio"
                id="star3"
                name="rating"
                onChange={(e) => setStars(e.target.value)}
                value="3"
              />
              <label for="star3" title="text"></label>
              <input
                type="radio"
                id="star2"
                name="rating"
                onChange={(e) => setStars(e.target.value)}
                value="2"
              />
              <label for="star2" title="text"></label>
              <input
                type="radio"
                id="star1"
                name="rating"
                onChange={(e) => setStars(e.target.value)}
                value="1"
              />
              <label for="star1" title="text"></label>
            </div>              <h3 id='stars' >stars</h3>
            <button ref={createReviewRef} id="review-submit">
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
      <button className={reviewClassName} onClick={toggleReviewModal}>
        Create a review
      </button>
      <div>{checkReviewModal()}</div>
    </>
  );
}

export default CreateReviewButton;
