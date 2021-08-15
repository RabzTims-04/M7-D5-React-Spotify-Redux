import { CURRENT_SONG_PLAYING, SONG_IS_PLAYING } from "../actions/actionTypes";
import { initialState } from "../store/store";


const currentSongReducer = (state = initialState.currentSong, action) => {
    switch(action.type){
        case CURRENT_SONG_PLAYING : return {
            ...state,
            song: action.payload
        }
        case SONG_IS_PLAYING : return {
            ...state,
            isPlaying: action.payload
        }
        default: {
            return state
        }
    }
}

export default currentSongReducer