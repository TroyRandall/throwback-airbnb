import { csrfFetch } from "./csrf";


const OWNED_COLLECTION = 'session/ownedCollection';



const ownedCollection = (spots) => {
    return {
      type: OWNED_COLLECTION,
      payload: spots
    }
  }

  export const spotsByUser = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots/currentuser', {
      method: 'GET'
    });
    const data = await response.json();
    dispatch(ownedCollection(data.Spots));
    return data.Spots;
  }

  const initialState = { current: null };

  const currentReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case OWNED_COLLECTION:
            newState = Object.values({}, state);
            newState.current = action.payload;
            return newState;
        default:
            return state;
        }
      };

      export default currentReducer;
