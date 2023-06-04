import { csrfFetch } from "./csrf";

const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";
const OWNED_COLLECTION = 'session/ownedCollection';

const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

const ownedCollection = (spots) => {
  return {
    type: OWNED_COLLECTION,
    payload: spots
  }
}


export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch("/api/users/login", {
    method: "POST",
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

export const restoreUser = () => async (dispatch) => {
    const response = await csrfFetch("/api/session");
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
  };

export const signup = (user) => async (dispatch) => {
    const { username, firstName, lastName, email, password } = user;
    const response = await csrfFetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        username,
        firstName,
        lastName,
        email,
        password,
      }),
    });
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
 };

 export const logout = () => async (dispatch) => {
  const response = await csrfFetch('/api/users', {
    method: 'DELETE',
  });
  dispatch(removeUser());
  return response;
};

export const spotsByUser = () => async (dispatch) => {
  const response = await csrfFetch('/api/spots/currentuser', {
    method: 'GET'
  });
  const data = await response.json();
  dispatch(ownedCollection(data.Spots));
  return data.Spots;
}



const initialState = { user: null, owned: null };

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    case OWNED_COLLECTION:
      newState = Object.values({}, state);
      newState.owned = action.payload;
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;
