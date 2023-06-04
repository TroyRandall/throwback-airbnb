import React from "react";
import { useHistory, useParams } from "react-router-dom";

function UpdateSpotButton({ spotId }) {
  const history = useHistory();
  const spotId = useParams();

  const updateButton = (e) => {
    e.preventDefault();
    history.push(`/spots/${spotId.id}/update`);
  };
  return (
    <button onClick={updateButton} className="update_spot_button">
      Update
    </button>
  );
}

export default UpdateSpotButton;
