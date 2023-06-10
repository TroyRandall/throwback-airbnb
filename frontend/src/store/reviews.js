import { csrfFetch } from "./csrf";

const ALL_REVIEWS = "spots/allReviews"
const CREATE_REVIEW = 'reviews/create';

const allReviews = (reviews) => {
    return {
        type: ALL_REVIEWS,
        payload: reviews
    }
  }

const createReview = (review) => {
    return {
        type: CREATE_REVIEW,
        payload: review
    }
}

export const reviewsBySpotId = (spotId) => async (dispatch) => {
    const reviews = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'GET'
    })
    const data = await reviews.json();
    dispatch(allReviews(data.Reviews))
    return reviews;
  }

export const createReviewAction = (reviewInfo, spotId) => async (dispatch) => {
    let { review, stars} = reviewInfo;
    stars = Number(stars);
    const newReview = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        body: JSON.stringify({
        review: review,
        stars: stars
        })
    })

    const data = await newReview.json();
    dispatch(createReview(data));
    return data;
}



const initialState = { review: null, newReview: null };


const reviewsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case ALL_REVIEWS:
            newState = Object.assign({}, state);
            newState.review = action.payload;
            return newState;
        case CREATE_REVIEW:
            newState = Object.assign({}, state);
            newState.newReview = action.payload;
            return newState;
            default:
                return state

    }
}

export default reviewsReducer;
