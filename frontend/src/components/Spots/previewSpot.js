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
      <div className='tooltip-container' id='shrink'>
        <span className='tooltip'>{spot.name}</span>
        <div id="prevSpots"  className='shrink' onClick={redirect} key={spot.id}>
          <img src={spot.previewImage || 'https://reprospecialty.com/wp-content/themes/apexclinic/images/no-image/No-Image-Found-400x264.png' } alt={spot.description} id='image-preview-spots' className='images'></img>
          <div id='prev_spot_info-spots' className='shrink-info' >
            <h4 id='state_country-spots'  >
                🗺️{spot.city}, {spot.state}
          </h4>
          <h4 id='starRating'  >⭐{spot.avgStarRating === '0.00' ? 'New' : spot.avgStarRating}</h4>
          <h4 id='price-preview' >💵${spot.price.toLocaleString("en-US")} per/night</h4>
          <button className='shrink' id='reserve-button' >Reserve</button>
            </div>

        </div>
      </div>

      );
}

export default PreviewSpot;
