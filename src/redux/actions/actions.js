import * as actionTypes from "./actionTypes"

export const addToFavouritesAction = (song) => ({
    type: actionTypes.ADD_TO_FAVOURITES,
    payload: song
})

export const removeFromFavouritesAction = (song) => ({
    type: actionTypes.REMOVE_FROM_FAVOURITES,
    payload: song
})

export const currentSongPlayingAction = (song) => ({
    type: actionTypes.CURRENT_SONG_PLAYING,
    payload: song
})

export const songIsPlayingAction = (boolean) => ({
    type: actionTypes.SONG_IS_PLAYING,
    payload: boolean
})

export const artistSearchLengthAction = (number) => ({
    type: actionTypes.ARTIST_SEARCH_LENGTH,
    payload: parseInt(number)
})

export const fetchArtistsAction = (event, artistSearch) => {
    return async (dispatch, getState) => {
        if(event.key === "Enter"){
            event.preventDefault()
            try {
                dispatch({
                    type: actionTypes.FETCH_ARTIST_LOADING,
                    payload: true
                })
                const response = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${artistSearch}`)
                const data = await response.json()
                const searchResult = await data.data
                console.log(searchResult);
                if(response.ok){
                    dispatch({
                        type: actionTypes.FETCH_ARTIST_LOADING,
                        payload: false
                    })
                    dispatch({
                        type: actionTypes.FETCH_ARTIST_SEARCH,
                        payload: searchResult
                    })
                    dispatch({
                        type: actionTypes.FETCH_ARTIST_ERROR,
                        payload: false
                    })
                    console.log(getState());
                }else{
                    console.log("error fetching artist search");
                    dispatch({
                        type: actionTypes.FETCH_ARTIST_ERROR,
                        payload: false
                    })
                }
            } catch (error) {
                console.log(error);
                dispatch({
                    type: actionTypes.FETCH_ARTIST_ERROR,
                    payload: true
                })
            }
        }
    }
}
