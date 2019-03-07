import { createStore, combineReducers, applyMiddleware } from 'redux';
import { reducer as formReducer } from 'redux-form'
import thunkMiddleware from 'redux-thunk';

//Local
import uiReducer from './UIReducer'
import loginReducer from '../../loggedOut/redux/LoginReducer'
import searchReducer from '../../loggedIn/search/redux/SearchReducer'
import symbolViewReducer from '../../loggedIn/details/redux/SymbolViewReducer'
import favoritesReducer from '../../loggedIn/favourites/redux/FavoritesReducer'

const rootReducer = combineReducers({
  form: formReducer,
  ui: uiReducer,
  login: loginReducer,
  search:searchReducer,
  symbolView:symbolViewReducer,
  favourites:favoritesReducer
});

const store = createStore(rootReducer,applyMiddleware(thunkMiddleware));
export default store;
