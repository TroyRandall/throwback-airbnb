import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import * as reviewActions from '../../store/reviews';
import './deleteReviewButton.css'

function DeleteReviewButton({ reviewId, spotId}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const overlayRef = useRef();
  const deleteButtonRef = useRef();
  const keepButtonRef = useRef();
  const [deleteReviewModal, setDeleteReviewModal] = useState(false);


  useEffect(() => {
    const closeReviewDeleteModal = (e) => {
        if((deleteButtonRef.current).contains(e.target)) {
            dispatch(reviewActions.deleteReviewAction(reviewId))
            dispatch(reviewActions.reviewsBySpotId(spotId))
            setDeleteReviewModal(false);
        } else if (
            (overlayRef.current.contains(e.target) ||
            keepButtonRef.current.contains(e.target))
          ) {
            setDeleteReviewModal(false);
          }}

        if (deleteReviewModal) {
          document.addEventListener("click", closeReviewDeleteModal);

          return () => document.removeEventListener("click", closeReviewDeleteModal);
        }

  }, [deleteReviewModal, dispatch, history, reviewId, spotId]);

  const toggleDeleteModal = (e) => {
    e.stopPropagation();
    setDeleteReviewModal(true);
  };

  const checkDeleteModal = () => {
    return (
      <div id={deleteClassName} ref={overlayRef}>
        <div className="overlay-delete"></div>
        <div className="delete-modal-content">
          <h1 id="confirm-delete-title">Confirm Delete</h1>
          <h3 id="confirm-delete-info">
            Are you sure you want to delete this review?
          </h3>
          <button id="confirm-delete-button" ref={deleteButtonRef}>
            <span>Yes ( Delete Review )</span><i></i>

          </button>
          <button id="deny-delete-button" ref={keepButtonRef}>
            No ( Keep Review )
          </button>
        </div>
      </div>
    );
  };

  const deleteClassName = "delete-modal" + (deleteReviewModal ? "" : "-hidden");

  return (
    <>
    <div  onClick={toggleDeleteModal} className="del">
      <div>
      Delete
      </div>
    </div>

    <div>{checkDeleteModal()}</div>
  </>
  )
}

export default DeleteReviewButton;
