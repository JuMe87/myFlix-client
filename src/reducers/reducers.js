import { SET_FILTER, SET_MOVIES } from "../actions/actions"
import { combineReducers } from "redux"

// first reducer function for movies, takes a state and an action, more general terminology than actions
function movies(state = [], action) {
    switch (action.type) {
        case SET_MOVIES:
            return action.value
        default:
            return state
    }
}

// Second reducer function - either shows a movie or not
function visibilityFilter(state = "", action) {
    switch (action.type) {
        case SET_FILTER:
            return action.value
        default:
            return state
    }
}

// Combined reducer (a reducer made out of other reducers)
const moviesApp = combineReducers({
    movies,
    visibilityFilter,
})

//here an export is necessary whereas for actions there are written in an export function right away
export default moviesApp
