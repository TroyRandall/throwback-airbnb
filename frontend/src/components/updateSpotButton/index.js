import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch} from "react-redux";
import * as spotActions from "../../store/spots";

function UpdateSpotButton({ spotId }) {
  const history = useHistory();
  const dispatch=useDispatch();

  const updateButton = (e) => {
    e.preventDefault();
    dispatch(spotActions.spotsById(spotId)).then(() => history.push(`/spots/${spotId}/update` ))

  };
  return (
    <button onClick={updateButton} className="update_spot_button">
      Update
    </button>
  );
}

export default UpdateSpotButton;
