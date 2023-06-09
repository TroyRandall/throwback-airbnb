import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import PreviewUserSpot from "./previewUserSpot.js";
import * as currentActions from "../../store/current.js";
import "./myCollection.css";
import UpdateSpotButton from "../../components/updateSpotButton";
import DeleteSpotButton from "../../components/deleteSpotButton";

function MyCollection() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);
  const spots = useSelector((state) => state.spots);

  useEffect(() => {
    dispatch(currentActions.spotsByUser()).then(() => setIsLoaded(true));
  }, [dispatch, spots]);

  if (!sessionUser && isLoaded) history.push("/");

  const userSpots = useSelector((state) => state.current.current);

  const spotButton = (e) => {
    e.preventDefault();
    history.push("/spots/create");
  };

  if (isLoaded && Object.values(userSpots).length < 1) {
    return (
      isLoaded && (
        <div className='button-holder'>
          <h1 className='manage-spots-title'>Manage spots</h1>
          <button onClick={spotButton} className="createSpotButton" id='manage-spots-create'>
            <span>Create a Spot</span>
            <i></i>
          </button>
        </div>
      )
    );
  } else {
    return (
      isLoaded && (
        <>
          <h1 className='manage-spots-title'>Manage spots</h1>
          <div className="user-spots-container">
            {userSpots.map((spot) => {
              return (
                <div key={spot.id} id="collection-container">
                  <PreviewUserSpot key={spot.id} spot={spot} />
                  <UpdateSpotButton key={spot.id + 50} spotId={spot.id} />
                  <DeleteSpotButton key={spot.id + 100} id={spot.id} />
                </div>
              );
            })}
          </div>
        </>
      )
    );
  }
}
export default MyCollection;
