import React from "react";
import { useHistory } from "react-router-dom";

import './createSpotButton.css';

function CreateSpotButton() {
  const history = useHistory();

  const spotButton = (e) => {
    e.preventDefault();
    history.push("/spots/create");
  };
  return (
    <button onClick={spotButton} className='createSpotButton'>
      <span>Create a Spot</span><i></i>
    </button>
  );
}

export default CreateSpotButton;
