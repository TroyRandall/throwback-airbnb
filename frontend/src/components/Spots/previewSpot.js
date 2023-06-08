import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import './previewSpot.css';


function PreviewSpot ({ spot, modal }) {
const history = useHistory();
    const redirect = (e) => {
        e.preventDefault()
        history.push(`/spots/${spot.id}`)
      };

useEffect(() => {
  const previewSpot = document.getElementsByClassName('images');
  Array.prototype.forEach.call(previewSpot, (image) => {
      image.addEventListener('error', function handleError (e)  {
    e.preventDefault();
    image.src='https://reprospecialty.com/wp-content/themes/apexclinic/images/no-image/No-Image-Found-400x264.png';
  })})
  })




    return (
        <div className="prevSpots" id='grow' onClick={redirect} key={spot.id}>
          <img src={spot.previewImage || 'https://reprospecialty.com/wp-content/themes/apexclinic/images/no-image/No-Image-Found-400x264.png' } alt={spot.description} id='image-preview' className='images'></img>
          <div id='prev_spot_info' >
            <h4 id='state_country' >
                🗺️{spot.city}, {spot.state}
          </h4>
          <h6 id='country'>🌎{spot.country} </h6>
          <h4 id='starRating' >⭐{spot.avgStarRating}</h4>
          <h4 id='price-preview' >💵${spot.price} per/night</h4>
          <button id='reserve-button'>Reserve</button>
            </div>

        </div>
      );
}

export default PreviewSpot;
