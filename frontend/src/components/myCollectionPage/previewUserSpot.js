import React from "react";
import { useHistory } from "react-router-dom";

import UpdateSpotButton from '../../components/updateSpotButton';
import DeleteSpotButton from '../../components/deleteSpotButton';

function PreviewUserSpot({ spot }) {
  const history = useHistory();
  const redirect = (e) => {
    e.preventDefault();
    history.push(`/spots/${spot.id}`);
  };

  return (
    <div>
      <div className="prev-user-spots" onClick={redirect}>
        <img src={spot.previewImage} alt={spot.description}></img>
        <h5>
          {spot.state}, {spot.country}
        </h5>
        <h5>{spot.avgStarRating}</h5>
        <h5>{spot.price} per/night</h5>
      </div>
        <UpdateSpotButton spotId={spot.id} />
        <DeleteSpotButton id={spot.id} />
    </div>
  );
}

export default PreviewUserSpot;
