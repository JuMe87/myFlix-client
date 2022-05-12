import {
    SET_FILTER,
    SET_MOVIES,
    SET_USER,
    SET_USERDATA,
    SET_FAVORITES,
    ADD_FAVMOVIES,
    REM_FAVMOVIES,
    SET_DIRECTORS,
    SET_GENRES,
} from "../actions/actions"

import { combineReducers } from "redux"

// Reducer function - takes a state and an action, more general terminology than actions
function movies(state = [], action) {
    switch (action.type) {
        case SET_MOVIES:
            return action.value
        case SET_FAVORITES:
            return action.value
        case ADD_FAVMOVIES:
            return action.value
        case REM_FAVMOVIES:
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

// Third reducer function for user
function user(state = "", action) {
    switch (action.type) {
        case SET_USER:
            return action.value
        default:
            return state
    }
}

// Fourth reducer function to update user data
function userData(state = "", action) {
    switch (action.type) {
        case SET_USERDATA:
            console.log("SET_USERDATA is working")
            return action.value
        default:
            return state
    }
}

function directors(state = [], action) {
    switch (action.type) {
        case SET_DIRECTORS:
            return action.value
        default:
            return state
    }
}

function genres(state = [], action) {
    switch (action.type) {
        case SET_GENRES:
            return action.value
        default:
            return state
    }
}

// Combined reducer (a reducer made out of other reducers)
const moviesApp = combineReducers({
    movies,
    visibilityFilter,
    user,
    userData,
    directors,
    genres,
})

//here an export is necessary whereas for actions there are written in an export function right away
export default moviesApp
