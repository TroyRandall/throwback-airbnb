import { csrfFetch } from "./csrf";

const ALL_SPOTS = "spots/allSpots"
const ALL_REVIEWS = "spots/allReviews"
const CREATE_SPOT="spots/create"
const DELETE_SPOT ="spots/delete"
const SPOT_BY_ID = 'spots/spotsbyid'
const UPDATE_SPOT = 'spots/update'


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

const singleSpot = (spot) => {
  return {
    type: SPOT_BY_ID,
    payload: spot
  }
}

  const createSpot = (spot) => {
    return {
      type: CREATE_SPOT,
      payload: spot
    }
  }


  const deleteSpot = (spotId) => {
    return {
      type: DELETE_SPOT,
      payload: spotId
    }
  }

  const updateSpot = (spot) => {
    return {
      type: UPDATE_SPOT,
      payload: spot
    }
  }

  export const getSpots = () => async (dispatch) => {
    const spots = await csrfFetch('/api/spots', {
        method: 'GET'
    })
    const data = await spots.json();
    const normalizedSpots = [];
    Object.values(data.Spots).forEach( spot => normalizedSpots[spot.id] = spot)
    dispatch(allSpots(data.Spots))
    return spots;
  }

  export const spotsById = (spotId) => async (dispatch) => {
    console.log(spotId + 'spotsById Thunk');
    const spotById = await csrfFetch(`/api/spots/${spotId}` , {
      method: 'GET'
    })
    const data = await spotById.json();
    dispatch(singleSpot(data));
    return spotById;
  }

  export const reviewsBySpotId = (spotId) => async (dispatch) => {
    const reviews = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'GET'
    })
    const data = await reviews.json();
    dispatch(allReviews(data.Reviews))
    return reviews;
  }

  export const deleteSpotById = (spotId) => async (dispatch) => {
    const oldSpot = await csrfFetch(`/api/spots/${spotId}`, {
      method: 'DELETE'
    })

    const data = await oldSpot.json();
    dispatch(deleteSpot(spotId));
    return data;
  }

  export const createSpotAction = (spot) =>async (dispatch) => {
    let { name, description, country, state, address, city, price, lat, lng } = spot;

    lat = Number(lat);
    lng = Number(lng);

    const newSpot = await csrfFetch(`/api/spots`, {
      method: 'POST',
      body: JSON.stringify({
        "name": name,
        "description" :description,
        "country": country,
        "state": state,
        "city": city,
        "address": address,
        "price": price,
        "lat":  lat,
        "lng": lng
      })
   })
    const data = await newSpot.json();
    dispatch(createSpot(data))
    return data;
   };



  export const updateSpotAction = (spot) => async (dispatch) => {
    const { name, description, city, state, country, address, price, lat, lng } = spot;
    const updatedSpot = await csrfFetch(`/api/spots/${spot.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        name,
        description,
        city,
        state,
        country,
        address,
        price,
        lat,
        lng
      })
    })

    const data = await updatedSpot.json();
    dispatch(updateSpot(data))
    return data;
  }


  const initialState = { spot: null, reviews: null, spots: null };

  const spotsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case ALL_SPOTS:
            newState = Object.assign({}, state);
            newState.spots = action.payload
            return newState;
        case ALL_REVIEWS:
            newState = Object.assign({}, state);
            newState.reviews = action.payload;
            return newState;
        case SPOT_BY_ID:
          newState = Object.assign({}, state);
          newState.spot = action.payload;
          return newState;
        case CREATE_SPOT:
            newState = Object.assign({}, state);
            newState.spots = action.payload;
            return newState;
        case DELETE_SPOT:
            newState = Object.assign({}, state);
            delete newState[action.payload];
            return newState;
        case UPDATE_SPOT:
          newState = Object.assign({}, state);
          newState[action.payload.id] = action.payload;
          return newState;
        default:
            return state
    }
  };

  export default spotsReducer;
