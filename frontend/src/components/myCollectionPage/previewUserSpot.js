import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";


import "./previewUserSpot.css";

function PreviewUserSpot({ spot }) {



  const history = useHistory();
  const redirect = (e) => {
    e.preventDefault();
    history.push(`/spots/${spot.id}`);
  };

  useEffect(() => {
    const previewSpot = document.getElementsByClassName("images");
    Array.prototype.forEach.call(previewSpot, (image) => {
      image.addEventListener("error", function handleError(e) {
        e.preventDefault();
        image.src =
          "https://reprospecialty.com/wp-content/themes/apexclinic/images/no-image/No-Image-Found-400x264.png";
      });
    });
  });

  return (
    <div className='tooltip-container' id='shrink'>
      <span className='tooltip' id='tooltip-user-spots'>{spot.name}</span>
      <div id="prev-user-spots" className = 'shrink' onClick={redirect} >
        <img
          className="images"
          id="image-preview"
          src={
            spot.previewImage ||
            "https://reprospecialty.com/wp-content/themes/apexclinic/images/no-image/No-Image-Found-400x264.png"
          }
          alt={spot.description}
        ></img>
        <div id="prev_spot_info" className='shrink-info'>
          <h4 id="state_country">
            🗺️{spot.city}, {spot.state}
          </h4>
          <h4 id="starRating">⭐{spot.avgStarRating === '0.00' ? 'New' : spot.avgStarRating}</h4>
          <h4 id="price-user">💵${spot.price.toLocaleString('en-US')} per/night</h4>
        </div>
      </div>
      </div>
  );
}

export default PreviewUserSpot;
