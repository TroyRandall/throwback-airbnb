import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";


import * as spotActions from "../../store/spots.js";

function DeleteSpotButton({ spotId }) {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();



  const spot = useSelector((state) => state.spots.spot)

  const deleteSpot = async () => {
    if  (sessionUser.id === spot.ownerId) {
      await dispatch(spotActions.deleteSpotById(spotId));
      history.push("/");
    }
  };
  return <button onClick={deleteSpot} id="delete_spot_button">Delete</button>;
}

export default DeleteSpotButton;
