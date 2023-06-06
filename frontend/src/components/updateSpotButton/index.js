import React from "react";
import { useHistory } from "react-router-dom";

function UpdateSpotButton({ spotId }) {
  const history = useHistory();

  const updateButton = (e) => {
    e.preventDefault();
    history.push(`/spots/${spotId}/update`);
  };
  return (
    <button onClick={updateButton} className="update_spot_button">
      Update
    </button>
  );
}

export default UpdateSpotButton;
