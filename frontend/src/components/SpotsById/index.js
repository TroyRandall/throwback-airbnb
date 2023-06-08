import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import * as spotActions from "../../store/spots.js";
import SpotImages from "./spotImages.js"
import Reviews from "./reviews.js"
import DeleteSpotButton from '../deleteSpotButton';
import './spotsById.css'

function SpotsById() {
    const dispatch = useDispatch();
    const[isLoaded, setIsLoaded] = useState(false);
    const { id } = useParams();

const sessionUser = useSelector((state) => state.session.user);
const spot = useSelector((state) => state.spots.spot);

const addImages = (spotImages = [], i = 0) => {


while(spotImages.length < 5) {
if(!spotImages[i]) spotImages.push(( {'id': i + 100, 'url': 'https://reprospecialty.com/wp-content/themes/apexclinic/images/no-image/No-Image-Found-400x264.png'}));
i++ }
return spotImages;
}
    useEffect(() => {
        if (id) dispatch(spotActions.spotsById(id)).then(() => setIsLoaded(true));
      }, [id, dispatch]);





      const comingSoon = (e) => {
        e.preventDefault();
        return <alert>This feature will be coming soon!</alert>
      }


      return  (isLoaded && (
          <div className='wholePage'>
            <div id='title-box'>  <h1 id="spot_name">{spot.name}</h1>
            <h3>🌎{spot.city}, {spot.state}, {spot.country}</h3>
            <div id='spot-images-container'>
               <SpotImages spotImages={addImages(spot.SpotImages)} description={spot.description} />
            </div>
            </div>
          <hr />
            <div id='description-box'>
            <h2 className="owner_info">Hosted By {spot.Owner.firstName} {spot.Owner.lastName}</h2>
            <p id='description'>{spot.description}</p>
            <div id='price-box'>
              <p id='price'>💵{spot.price.toLocaleString("en-US")}/night</p>
              <p id='rating'>⭐{spot.avgStarRating} - {spot.numReviews} reviews</p>
              {(sessionUser &&(sessionUser.id === spot.ownerId)) ? <DeleteSpotButton spotId={id} /> :
              <button id='reserve' onClick={comingSoon}>Reserve</button>}
            </div>
            </div>
            <hr />

            <h3>⭐{spot.avgStarRating} - {spot.numReviews} reviews</h3>
            <Reviews spotId={id} />
         </div>
          ))

      }




export default SpotsById;
