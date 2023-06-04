import React from "react";
import { useHistory } from "react-router-dom";

function CreateSpotButton() {
  const history = useHistory();

  const spotButton = (e) => {
    e.preventDefault();
    history.push("/spots/create");
  };
  return (
    <button onClick={spotButton} className="create_spot_button">
      Create a Spot
    </button>
  );
}

export default CreateSpotButton;
