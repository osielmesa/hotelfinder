import React, {PureComponent} from 'react'
import {TouchableOpacity, View} from 'react-native'
import {connect} from 'react-redux'
import {Icon} from "react-native-material-ui"

//Local
import {logout} from "../../loggedOut/redux/LoginActions";
import {cleanHotels, retrievAllHotelsList} from "../../loggedIn/search/redux/SearchActions";
import {cleanFavorites} from "../../loggedIn/favourites/redux/FavoritesActions";

class Logout extends PureComponent {

  logoutIconPressed = () => {
    this.props.dispatch(logout())
    this.props.dispatch(cleanHotels())
    this.props.dispatch(cleanFavorites())
  }

  render() {
    return (
      <TouchableOpacity onPress={() => this.logoutIconPressed()}>
        <Icon name={'exit-to-app'} color={'white'} size={30}/>
      </TouchableOpacity>
    )
  }
}

export default connect()(Logout)
