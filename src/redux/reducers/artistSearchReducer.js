import { ARTIST_SEARCH_LENGTH, FETCH_ARTIST_ERROR, FETCH_ARTIST_LOADING, FETCH_ARTIST_SEARCH } from "../actions/actionTypes";
import { initialState } from "../store/store";

const artistSearchReducer = (state= initialState.artistsSearch, action) => {
    switch(action.type){
        case FETCH_ARTIST_SEARCH : return {
            ...state,
            artists: action.payload
        }
        case FETCH_ARTIST_ERROR : return {
            ...state,
            error: action.payload
        }
        case ARTIST_SEARCH_LENGTH : return {
            searchLength: action.payload,
            artists:[]
        }
        case FETCH_ARTIST_LOADING : return {
            ...state,
            isLoading: action.payload,
        }
        default: {
            return state
        }
    }
}

export default artistSearchReducer