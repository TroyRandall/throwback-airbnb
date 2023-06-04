import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import * as spotActions from "../../store/spots.js";
import SpotImages from "./spotImages.js"
import Reviews from "./reviews.js"
import DeleteSpotButton from '../deleteSpotButton';

function SpotsById() {
    const dispatch= useDispatch();
    const[isLoaded, setIsLoaded] = useState(false);
    const spotId = useParams();

    useEffect(() => {
        dispatch(spotActions.spotsById(spotId)).then(() => setIsLoaded(true));
      }, [spotId, dispatch]);

      const spot = useSelector((state) => state.spots.spot);
      const sessionUser = useSelector((state) => state.session.user);


      const comingSoon = (e) => {
        e.preventDefault();
        return <alert>This feature will be coming soon!</alert>
      }

      if (isLoaded && (sessionUser.id === spot.ownerId)){
        return (
          <>
            <h1 className="spot_name">{spot.name}</h1> <DeleteSpotButton spotId={spotId} />
            <h3 className="spot_location">{spot.city}, {spot.state}, {spot.country}</h3>
            <SpotImages spotImages={spot.SpotImages} description={spot.description} />
            <h2 className="owner_info">Hosted By {spot.Owner.firstName} {spot.Owner.lastName}</h2>
            <div>
              <p>${spot.price}/night</p>
              <p>⭐{spot.avgStarRating} - {spot.numReviews} reviews</p>
              <button onClick={comingSoon}>Reserve</button>
            </div>
            <hr />

            <h3>⭐{spot.avgStarRating} - {spot.numReviews} reviews</h3>
            <Reviews />
         </>
          )
      } else {
         return  isLoaded && (
      <>
        <h1 className="spot_name">{spot.name}</h1>
        <h3 className="spot_location">{spot.city}, {spot.state}, {spot.country}</h3>
        <SpotImages spotImages={spot.SpotImages} description={spot.description} />
        <h2 className="owner_info">Hosted By {spot.Owner.firstName} {spot.Owner.lastName}</h2>
        <div>
          <p>${spot.price}/night</p>
          <p>⭐{spot.avgStarRating} - {spot.numReviews} reviews</p>
          <button onClick={comingSoon}>Reserve</button>
        </div>
        <hr />

        <h3>⭐{spot.avgStarRating} - {spot.numReviews} reviews</h3>
        <Reviews />
     </>
      )
      }


}

export default SpotsById;
