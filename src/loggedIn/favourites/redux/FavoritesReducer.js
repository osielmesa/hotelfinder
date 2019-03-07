import {
  RETRIEVE_FAVOURITES,
  CLEAN_FAVORITES
} from "../../../common/redux/ActionTypes";

const initialState = {
  favourites:[]
}

const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLEAN_FAVORITES:
      return {
        ...state,
        favourites: []
      }
    case RETRIEVE_FAVOURITES:
      return {
        ...state,
        favourites: action.payload
      }
    default:
      return state;
  }
}

export default favoritesReducer
