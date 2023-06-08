import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react"

import * as spotActions from "../../store/spots.js";

function Reviews({ spotId }) {
    const dispatch= useDispatch();
    const[isLoaded, setIsLoaded] = useState(false);



    useEffect(() => {
        if (spotId) dispatch(spotActions.reviewsBySpotId(spotId)).then(() => setIsLoaded(true));
      }, [spotId, dispatch]);

      const reviews = useSelector((state) => state.spots.reviews);

      return isLoaded && (
        <>
            {Object.values(reviews).map(review => {
             return <div key ={review.id}>
                <h5>{review.User.firstName} ⭐{review.stars}</h5>
                <h6>{review.createdAt.slice(0, 7)}</h6>
                <p>{review.review}</p>
             </div>
            })}
        </>
      )
};

export default Reviews;
