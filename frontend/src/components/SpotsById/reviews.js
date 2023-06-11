import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom';

import * as reviewActions from "../../store/reviews.js";

function Reviews() {
    const dispatch= useDispatch();
    const[isLoaded, setIsLoaded] = useState(false);
const reviews = useSelector((state) => state.reviews.review);
const newReview = useSelector((state) => state.reviews.newReview)
const spotId  = useParams();
const { id } = spotId;
    useEffect(() => {
        if (id) dispatch(reviewActions.reviewsBySpotId(id)).then(() => setIsLoaded(true));
      }, [id, dispatch, newReview]);

let newArray;
const checkReviews = () => {
  if(isLoaded)  newArray = Object.values(reviews);
 if(newArray.length > 0) {
  return true;
} else return false;
}

      return isLoaded && (
        (checkReviews()) ?  <div> {(Object.values(reviews)).reverse().map(review => {
             return <div key ={review.id} className='reviews_container'>
                <h5 id='firstName'>{review.User.firstName} ⭐{review.stars}</h5>
                <h6 id='createdAt'>{review.createdAt.slice(0, 7)}</h6>
                <p id='review'>{review.review}</p>
             </div>
            })}
        </div> : <p>Be The First Person to Post Your Review!</p>

      )
};

export default Reviews;
