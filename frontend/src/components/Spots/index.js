import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";


import * as spotActions from "../../store/spots.js";
import "./spots.css";
import PreviewSpot from "./previewSpot.js";

function AllSpotsPage() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
const spots = useSelector((state) => state.spots.spots);


  useEffect(() => {
    dispatch(spotActions.getSpots()).then(() => setIsLoaded(true));

  }, [dispatch]);

// let newArray = [];
// while(spots.length >= 1) newArray.shift(spots.pop());
// console.log(newArray)
  return (
    isLoaded && (
      <><div className='spots-container'>
        {(Object.values(spots)).reverse().map((spot) => {
          return (
            <PreviewSpot key = {spot.id} spot={spot} />
          );
        })}
      </div>

      </>
    )
  );
}

export default AllSpotsPage;
