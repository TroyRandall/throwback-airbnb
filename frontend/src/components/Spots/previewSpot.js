import React from "react";
import { useHistory } from "react-router-dom";

function PreviewSpot ({ spot }) {

const history = useHistory();
    const redirect = (e) => {
        e.preventDefault()
        history.push(`/spots/${spot.id}`)
      };


    return (
        <div className="prevSpots" onClick={redirect} key={spot.id}>
          <img src={spot.previewImage} alt={spot.description}></img>
          <h5>
            {spot.state}, {spot.country}
          </h5>
          <h5>{spot.avgStarRating}</h5>
          <h5>{spot.price} per/night</h5>
        </div>
      );
}

export default PreviewSpot;
