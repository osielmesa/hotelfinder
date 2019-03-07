import {
  RETRIEVE_HOTELS_LIST,
  CLEAN_HOTELS
} from "../../../common/redux/ActionTypes";

const initialState = {
  hotels:[]
}

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case RETRIEVE_HOTELS_LIST:
      return {
        ...state,
        hotels: action.payload
      }
    case CLEAN_HOTELS:
      return {
        ...state,
        hotels: []
      }
    default:
      return state;
  }
}

export default searchReducer
