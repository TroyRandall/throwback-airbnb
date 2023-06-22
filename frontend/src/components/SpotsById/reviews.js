import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom';

import * as reviewActions from "../../store/reviews.js";
import DeleteReviewButton from '../deleteReviewButton';

function Reviews() {
    const dispatch= useDispatch();
    const[isLoaded, setIsLoaded] = useState(false);
const reviews = useSelector((state) => state.reviews);
const sessionUser = useSelector((state) => state.session.user);
const spotId  = useParams();
const { id } = spotId;
    useEffect(() => {
        if (id) dispatch(reviewActions.reviewsBySpotId(id)).then(() => setIsLoaded(true));
      }, [id, dispatch]);

let newArray;
const checkReviews = () => {
  console.log(Object.values(reviews).reverse);
  if(isLoaded)  newArray = Object.values(reviews);
 if(newArray.length > 0) {
  return true;
} else return false;
}

const checkReviewOwner = useCallback((review) => {
  if(sessionUser !== null) {
     if(review.userId === sessionUser.id){
    return true;
  } else return false;
} return false;
  }, [sessionUser])


      return isLoaded && (
        (checkReviews()) ?  (<div> {(Object.values(reviews).reverse()).map(review => {
             return (
             <div key ={review.id} className='reviews_container'>
                <h5 id='firstName'>{review.User.firstName}</h5>
                <h6 id='createdAt'>{review.createdAt.slice(0, 7)}</h6>
                <p id='review'>{review.review}</p>
                <label id='delete-review' >{checkReviewOwner(review) ? <DeleteReviewButton reviewId={review.id}  spotId={id}/> : null}</label>
             </div>)
            })}
        </div>) : <p>Be The First Person to Post Your Review!</p>

      )
}

export default Reviews;
