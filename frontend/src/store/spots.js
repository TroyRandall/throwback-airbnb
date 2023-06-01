import { csrfFetch } from "./csrf";

const ALL_SPOTS = "spots/allSpots"
const ALL_REVIEWS = "spots/allReviews"


const allSpots = (spots) => {
    return {
      type: ALL_SPOTS,
      payload: spots
    }
  }

  const allReviews = (reviews) => {
    return {
        type: ALL_REVIEWS,
        payload: reviews
    }
  }

  export const getSpots = () => async (dispatch) => {
    const spots = await csrfFetch('/api/spots', {
        method: 'GET'
    })
    const data = await spots.json();
    dispatch(allSpots(data.Spots))
    return spots;
  }

  export const spotsById = (spotId) => async (dispatch) => {
    const spotById = await csrfFetch(`/api/spots/${spotId.id}` , {
      method: 'GET'
    })
    const data = await spotById.json();
    dispatch(allSpots(data));
    return spotById;
  }

  export const reviewsBySpotId = (spotId) => async (dispatch) => {
    const reviews = await csrfFetch(`/api/spots/${spotId.id}/reviews`, {
        method: 'GET'
    })
    const data = await reviews.json();
    dispatch(allReviews(data.Reviews))
    return reviews;
  }

  const initialState = { spot: null, reviews: null };

  const spotsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case ALL_SPOTS:
            newState = Object.assign({}, state);
            newState.spot = action.payload
            return newState;
        case ALL_REVIEWS:
            newState = Object.assign({}, state);
            newState.reviews = action.payload;
            return newState
        default:
            return state
    }
  };

  export default spotsReducer;
