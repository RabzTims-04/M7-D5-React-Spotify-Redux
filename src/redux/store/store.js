import { combineReducers, createStore, compose, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import artistSearchReducer from "../reducers/artistSearchReducer"
import currentSongReducer from "../reducers/currentSongReducer"
import favouritesReducer from "../reducers/favouritesReducer"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const initialState = {
    favourites: {
        songs:[]
    },
    currentSong:{
        song: {},
        isPlaying: false
    },
    artistsSearch:{
        artists:[],
        searchLength:0,
        error: false,
        isLoading: false
    }
}

const mainReducer = combineReducers({
    favourites: favouritesReducer,
    currentSong: currentSongReducer,
    artistsSearch: artistSearchReducer
})

export const configureStore = createStore(
    mainReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk))
)