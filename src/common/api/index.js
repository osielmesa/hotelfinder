const baseUrl = 'http://localhost:8000'
const tokenHead = 'Token '

//Login
const loginEndpoint = baseUrl + '/api-token-auth/'
const contentTypeLogin = 'application/json'
//Favourites
const favouritesEndpoint = baseUrl + '/favorites/'
//All hotels
const allHotelsEndpoint = baseUrl + '/hotel_api/'
//Add/remove favorites
const addRemoveFavoritesEndpoint = baseUrl + '/favorites/add_remove'
const contentTypeAddRemoveFavorites = 'application/json'
//Add hotel
const addHotelEndpoint = baseUrl + '/hotel_api'
const contentTypeAddHotel = 'application/json'


export {
  baseUrl,
  loginEndpoint,
  contentTypeLogin,
  favouritesEndpoint,
  allHotelsEndpoint,
  addRemoveFavoritesEndpoint,
  contentTypeAddRemoveFavorites,
  addHotelEndpoint,
  contentTypeAddHotel,
  tokenHead
}


