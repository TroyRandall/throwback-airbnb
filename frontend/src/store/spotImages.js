import { csrfFetch } from "./csrf";

const CREATE_SPOT_IMAGE="spotimages/create"
const DELETE_SPOT_IMAGE='spotImages/delete'


const createSpotImage = (spotImage) => {
    return {
        type: CREATE_SPOT_IMAGE,
        payload: spotImage
    }
  }

const deleteSpotImage = (spotImage) => {
    return {
        type: DELETE_SPOT_IMAGE,
        payload: spotImage
    }
}

  export const createSpotImageAction = (image, preview = false, spotId) => async (dispatch) => {
    const newImage = await csrfFetch(`/api/spots/${spotId}/images`, {
        method: 'Post',
        body: JSON.stringify({
          preview: preview,
          url: image
        })
      })
      const data = await newImage.json();
      dispatch(createSpotImage(data))
      return newImage;
    }

    export const deleteSpotImageAction = (spotId, imageId) => async (dispatch) => {
        const response = await csrfFetch(`/spots/${spotId}/images/${imageId}`, {
          method: 'DELETE'
        })

        const data = await response.json();
        dispatch(deleteSpotImage(imageId))
        return data;
          }

  const initialState = { spotImages: null };

const spotImagesReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case CREATE_SPOT_IMAGE:
            newState = Object.assign({}, state);
            newState.spotImages = action.payload;
            return newState;
        case DELETE_SPOT_IMAGE:
            newState = Object.assign({}, state);
            delete newState[action.payload];
            return newState;
        default:
            return state;
    }
}

export default spotImagesReducer
