
import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import * as spotActions from "../../store/spots.js";
import './deleteSpotButton.css';
import * as currentActions from '../../store/current.js';


function DeleteSpotButton({ id }) {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const overlayRef = useRef();
  const deleteButtonRef = useRef();
  const keepButtonRef = useRef();
  const [deleteModal, setDeleteModal] = useState(false);
  const spot = useSelector((state) => state.spots[id]);

  useEffect(() => {
    const closeDeleteModal = (e) => {
      if ((deleteButtonRef.current).contains(e.target)) {
           dispatch(spotActions.deleteSpotById(id))
           dispatch(currentActions.spotsByUser())
            setDeleteModal(false);
            history.push('/mycollection')
          }
         else if (
        overlayRef.current.contains(e.target) ||
        keepButtonRef.current.contains(e.target)
      ) {
        setDeleteModal(false);
      }}

    if (deleteModal) {
      document.addEventListener("click", closeDeleteModal);

      return () => document.removeEventListener("click", closeDeleteModal);
    }
  }, [ deleteModal, dispatch, history, sessionUser, spot, id]);

  const toggleDeleteModal = (e) => {
    e.stopPropagation();
    setDeleteModal(true);
  };

  const deleteClassName = "delete-modal" + (deleteModal ? "" : "-hidden");

  const checkDeleteModal = () => {
      return (
        <div id={deleteClassName} ref={overlayRef} >
          <div className='overlay-delete'></div>
          <div className='delete-modal-content'>
            <h1 id="confirm-delete-title">Confirm Delete</h1>
            <h3 id="confirm-delete-info">
              Are you sure you want to remove this spot from the listings?
            </h3>
            <button id="confirm-delete-button" className='shrink' ref={deleteButtonRef}>
              Yes ( Delete Spot )
            </button>
            <button id="deny-delete-button" ref={keepButtonRef}>
              No ( Keep Spot )
            </button>
          </div>
        </div>
      );
    }

  return (
    <>
      <button
        onClick={toggleDeleteModal}
        id="delete_spot_button"
      >
        Delete
      </button>
      <div>{checkDeleteModal()}</div>;
    </>
  );
}

export default DeleteSpotButton;
