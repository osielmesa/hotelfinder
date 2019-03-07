
import {RETRIEVE_HOTELS_LIST, CLEAN_HOTELS} from "../../../common/redux/ActionTypes";
import {showErrorToast, showToast} from "../../../common/components";
import {
  allHotelsEndpoint,
  tokenHead,
  addHotelEndpoint,
  contentTypeAddRemoveFavorites,
  contentTypeAddHotel
} from "../../../common/api";

export const retrievAllHotelsList = (hotels) => ({
  type: RETRIEVE_HOTELS_LIST,
  payload:hotels
})

export const cleanHotels = () => ({
  type: CLEAN_HOTELS,
})

export const getAllHotels = (token) => {
  return dispatch => {
    const url = allHotelsEndpoint
    const config = {
      method: 'GET',
      headers: {
        'Authorization': tokenHead + token
      }
    }
    fetch(url,config).then(res => {
      if(res.ok && res.status === 200){
        res.json().then(jsonResponse => {
          if(jsonResponse.length > 0){
            dispatch(retrievAllHotelsList(jsonResponse))
          }
        }).catch(error => {
          console.log('ERROR: ',error)
        })
      }
    }).catch(error => {
      showErrorToast('Imposible to fetch data. Please check internet connection!')
    })
  }
}

export const addHotel = ({token,name,city,country,stars,description,price,location,userId}) => {
  return dispatch => {
    const url = addHotelEndpoint
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': contentTypeAddHotel,
        'Authorization': tokenHead + token
      },
      body: JSON.stringify({
        name: name,
        city: city,
        country:country,
        stars:stars,
        description:description,
        price:price,
        location:location,
        user:userId
      }),
    }
    debugger
    fetch(url,config).then(res => {
      console.log(res)
      if(res.ok && res.status === 200){
        dispatch(getAllHotels(token))
        showToast('Hotel added.')
      }else{
        console.log('Error creating hotel: ',res)
      }
      debugger
    }).catch(error => {
      showErrorToast('Imposible to create hotel. Please check internet connection!')
    })
  }
}




