import React from "react";
import { useHistory } from "react-router-dom";

import './previewSpot.css';


function PreviewSpot ({ spot, modal }) {
const history = useHistory();
    const redirect = (e) => {
        e.preventDefault()
        history.push(`/spots/${spot.id}`)
      };


    return (
        <div className="prevSpots" id='grow' onClick={redirect} key={spot.id}>
          <img src={spot.previewImage} alt={spot.description} className='image-preview'></img>
          <div className='prev_spot_info' >
            <h4 className='state_country' >
                🗺️{spot.city}, {spot.state}
          </h4>
          <h6 className='country'>🌎{spot.country} </h6>
          <h4 className='starRating' >⭐{spot.avgStarRating}</h4>
          <h4 className='price' >💵${spot.price} per/night</h4>
          <button className='reserve-button'>Reserve</button>
            </div>

        </div>
      );
}

export default PreviewSpot;
