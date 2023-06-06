import React from "react";
import { useHistory } from "react-router-dom";

import './previewSpot.css';


function PreviewSpot ({ spot }) {

const history = useHistory();
    const redirect = (e) => {
        e.preventDefault()
        history.push(`/spots/${spot.id}`)
      };


    return (
        <div className="prevSpots" id='grow' onClick={redirect} key={spot.id}>
          <img id='grow'src={spot.previewImage} alt={spot.description}></img>
          <div className='prev_spot_info' id='grow'>
            <h5 className='state_country' id='grow'>
                🗺️{spot.state}, {spot.country}
          </h5>
          <h5 className='starRating' id='grow'>⭐{spot.avgStarRating}</h5>
          <h5 className='price' id='grow'>💵{spot.price} per/night</h5>
            </div>

        </div>
      );
}

export default PreviewSpot;
