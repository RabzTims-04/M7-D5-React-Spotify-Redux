import { initialState } from "../store/store";
import { ADD_TO_FAVOURITES, REMOVE_FROM_FAVOURITES } from "../actions/actionTypes";

const favouritesReducer = (state= initialState.favourites, action) => {
    
    switch(action.type){
        case ADD_TO_FAVOURITES :
            let songsInFavourites = state.songs.find((song) => song.id === action.payload.id)
            let newSongs = [...state.songs]
            if(newSongs.includes(songsInFavourites)){
                
                alert("already in favourites")
            }
            else{
                newSongs.push(action.payload)
            }
            return {
                ...state,
                songs: newSongs
            }
            case REMOVE_FROM_FAVOURITES : 
            return {
                ...state,
                songs: state.songs.filter(song => song.id !== action.payload.id)
            }
            default : {
                return state
            }
    }
}

export default favouritesReducer