import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import * as spotActions from "../../store/spots.js";
import SpotImages from "./spotImages.js";
import Reviews from "./reviews.js";
import "./spotsById.css";
import CreateReviewButton from '../createReviewButton';



function SpotsById() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const { id } = useParams();
  const spot = useSelector((state) => state.spots[id]);
  const reviews = useSelector((state) => state.reviews);
  const [reserve, setReserve] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);

  const checkReviewOwner = () => {

    if((sessionUser) && (reviews !== null)) {
      if((spot.ownerId !== null) &&(spot.ownerId === sessionUser.id)) return false


    const reviewsArray = Object.values(reviews)
    for(let i = 0; i <reviewsArray.length; i++) {
      if(reviewsArray[i]?.userId === sessionUser.id) return false;
    }
    return true
  }
  return false

  }


  useEffect(() => {
    if (id) dispatch(spotActions.spotsById(id)).then(() => setIsLoaded(true));
  }, [id, dispatch, reviews, ]);


  const addImages = (spotImages = [], i = 0) => {
    while (spotImages.length < 5) {
      if (!spotImages[i])
        spotImages.push({
          id: i + 100,
          url: "https://reprospecialty.com/wp-content/themes/apexclinic/images/no-image/No-Image-Found-400x264.png",
        });
      i++;
    }   let newImages = [];
    for(let i = 0; i < spotImages.length; i++){
        const image = spotImages[i]
        if(!image.preview || image.preview===null){
        image.id = i + 1;
    }
    newImages[i]=image;
}
    return newImages;
}



  const checkNumReviews = (numReviews) => {
    if(Number(numReviews) < 1) {
      return 'New';
    }
      if(numReviews > 1) {
        return `${spot.avgStarRating} - ${spot.numReviews} reviews`;
      } else {
        return  `${spot.avgStarRating} - ${spot.numReviews} review`
      }

  }


  const displayText = () => {
    setReserve(!reserve);
  }


  return (
    isLoaded && (
      <div className="wholePage">
        <div id="title-box">
          <h1 id="spot_name">{spot.name}</h1>
          <h3>
            🌎{spot.city}, {spot.state}, {spot.country}
          </h3>
          <div id="spot-images-container">
            <SpotImages
              spotImages={addImages(Object.values(spot.SpotImages))}
              description={spot.description}
            />
          </div>
        </div>
        <hr />
        <div id="description-box">
          <h2 className="owner_info">
            Hosted By {spot.Owner.firstName} {spot.Owner.lastName}
          </h2>
          <p id="description-spot-by-id">{spot.description}</p>
          <div id="price-box">
            <p id="price">💵{spot.price.toLocaleString("en-US")}/night</p>
            <p id="rating">
              ⭐{checkNumReviews(spot.numReviews)}
            </p>
            <button id="reserve" onClick={displayText}>
              Reserve
            </button>
            <label id='reserve-alert' hidden={reserve ? "" : 'hidden'}>This Feature Coming Soon!</label>
          </div>
        </div>
        <hr />
      <div id='review-container'>
        <h3 id='numReviews'>
          ⭐{checkNumReviews(spot.numReviews)}
        </h3>
        <h3>
          {checkReviewOwner() ? <CreateReviewButton /> :  null}
        </h3>
        <Reviews spotId={id} />
      </div>
      <hr></hr>
    </div>


    )
  )
}

export default SpotsById;
