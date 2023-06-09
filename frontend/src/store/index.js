// frontend/src/store/index.js
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from "./session";
import spotsReducer from './spots.js';
import currentReducer from './current.js';
import spotImagesReducer from './spotImages.js'
import reviewsReducer from './reviews.js';

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const rootReducer = combineReducers({
  session: sessionReducer,
  spots: spotsReducer,
  current: currentReducer,
  spotImages: spotImagesReducer,
  reviews: reviewsReducer,
});

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
  };

  export default configureStore;
