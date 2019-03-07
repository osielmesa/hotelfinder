import {CLEAN_FAVORITES, RETRIEVE_FAVOURITES} from "../../../common/redux/ActionTypes";
import {
  addRemoveFavoritesEndpoint,
  contentTypeAddRemoveFavorites,
  favouritesEndpoint,
  tokenHead
} from "../../../common/api";
import {showToast} from "../../../common/components";
import {getAllHotels} from "../../search/redux/SearchActions";

export const cleanFavorites = () => ({
  type: CLEAN_FAVORITES,
})

export const getFavourites = (token) => {
  return dispatch => {
    const url = favouritesEndpoint
    const config = {
      method: 'GET',
      headers: {
        'Authorization': tokenHead+token
      }
    }
    fetch(url,config).then(res => {
      if(res.ok && res.status === 200){
        res.json().then(jsonResponse => {
          if(jsonResponse.length > 0){
            dispatch({type:RETRIEVE_FAVOURITES,payload:jsonResponse})
          }
        }).catch(error => {
          console.log('ERROR: ',error)
        })
      }

    }).catch(error => {
      console.log('ERROR: ',error)
    })
  }
}

export const addRemoveFavorites = ({token,hotelId,isFavorite}) => {
  return dispatch => {
    const url = addRemoveFavoritesEndpoint
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': contentTypeAddRemoveFavorites,
        'Authorization': tokenHead+token
      },
      body: JSON.stringify({
        hotel_id: hotelId,
        is_favorite: isFavorite,
      }),
    }
    fetch(url,config).then(res => {
      if(res.ok && res.status === 200){
        dispatch(getFavourites(token))
        dispatch(getAllHotels(token))
        res.json().then(jsonResponse => {
          if(jsonResponse.Message){
            showToast(jsonResponse.Message)
          }
        }).catch(error => {
          console.log('ERROR: ',error)
        })
      }else{
        console.log("ERROR add/remove favorite: ",res)
      }
    }).catch(error => {
      console.log('ERROR: ',error)
    })
  }
}
