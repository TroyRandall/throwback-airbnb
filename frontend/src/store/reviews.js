import { csrfFetch } from "./csrf";

const ALL_REVIEWS = "spots/allReviews"
const CREATE_REVIEW = 'reviews/create';
const DELETE_REVIEW = 'reviews/delete';

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

const deleteReview = (reviewId) => {
    return {
        type: DELETE_REVIEW,
        payload: reviewId
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

export const deleteReviewAction = (reviewId) => async (dispatch) => {
    const oldReview = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    })

    const data = await oldReview.json();
    dispatch(deleteReview(reviewId));
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
        case DELETE_REVIEW:
            newState = Object.assign({}, state);
            delete newState[action.payload]
            return newState;
            default:
                return state

    }
}

export default reviewsReducer;
