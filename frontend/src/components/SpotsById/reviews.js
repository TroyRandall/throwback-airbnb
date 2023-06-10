import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react"

import * as reviewActions from "../../store/reviews.js";

function Reviews({ spotId }) {
    const dispatch= useDispatch();
    const[isLoaded, setIsLoaded] = useState(false);



    useEffect(() => {
        if (spotId) dispatch(reviewActions.reviewsBySpotId(spotId)).then(() => setIsLoaded(true));
      }, [spotId, dispatch]);

      const reviews = useSelector((state) => state.reviews.review);

      return isLoaded && (
        <div>
            {Object.values(reviews).map(review => {
             return <div key ={review.id} className='reviews_container'>
                <h5 id='firstName'>{review.User.firstName} ⭐{review.stars}</h5>
                <h6 id='createdAt'>{review.createdAt.slice(0, 7)}</h6>
                <p id='review'>{review.review}</p>
             </div>
            })}
        </div>
      )
};

export default Reviews;
