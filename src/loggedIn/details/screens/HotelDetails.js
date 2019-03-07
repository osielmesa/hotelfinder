// I am not sure why add hotel is not working with the API,
// I am doing something wrong because using postman I was available to add it
// I dont include in the form image and positioning map because of the time.
// I also run out of time to persist data locally in the device.
// The app is proportional in all devices and listen for orientation changes.
// I use animation as well.
// I use modularity software design principle which is a specialization of the principle of separation of concerns.
// Following the principle of modularity implies separating software into components according to functionality and responsibility.
import React, {Component} from 'react'
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, Image} from 'react-native'
import {connect} from 'react-redux'

import {headerStyle, headerTitleStyle} from "../../../common/utils";
import theme from "../../../common/theme";
import {addRemoveFavorites} from "../../favourites/redux/FavoritesActions";
import {baseUrl} from "../../../common/api";

class HotelDetails extends Component {
  static navigationOptions = () => {
    return {
      headerTitle:'Details',
      headerStyle: headerStyle,
      headerTintColor: theme.colors.headerTintColor,
      headerTitleStyle: headerTitleStyle,
    }
  }

  AddOrRemovePressedPressed = () => {
    const hotel = this.props.navigation.getParam('hotel', {})
    const {token, favourites} = this.props
    this.props.dispatch(addRemoveFavorites({token:token,hotelId:hotel.id,isFavorite:!this.isFavorite(hotel.id,favourites)}))
  }

  isFavorite = (hotelId,favourites) => {
    for(let i = 0; i < favourites.length;i++){
      if(favourites[i].id === hotelId){
        return true
      }
    }
    return false
  }

  render() {
    const hotel = this.props.navigation.getParam('hotel', {})
    const {favourites} = this.props
    return (
      <ScrollView contentContainerStyle={{paddingVertical:40}}>
        <View style={styles.elementsView}>
          {hotel.image &&
            <View style={{alignSelf:'stretch',alignItems:'center'}}>
              <Image style={{width: 250, height: 250}} source={{uri: hotel.image.includes('http') ? hotel.image : baseUrl + hotel.image }}/>
            </View>
          }
          {hotel.price &&
            <Text style={styles.priceText}>{'$'+hotel.price+ ' per night'}</Text>
          }
          <Text style={styles.descriptionTitle}>NAME</Text>
          {(hotel.name && hotel.name.trim() !== "")
            ? <Text style={styles.descriptionText}>{hotel.name}</Text>
            : <Text style={styles.descriptionText}>There is no name description available for this hotel.</Text>
          }
          <Text style={styles.descriptionTitle}>STARS</Text>
          {(hotel.stars)
            ? <Text style={styles.descriptionText}>{hotel.stars}</Text>
            : <Text style={styles.descriptionText}>There is no stars description available for this hotel.</Text>
          }

          <Text style={styles.descriptionTitle}>CITY</Text>
          {(hotel.city && hotel.city.trim() !== "")
            ? <Text style={styles.descriptionText}>{hotel.city}</Text>
            : <Text style={styles.descriptionText}>There is no city description available for this hotel.</Text>
          }
          <Text style={styles.descriptionTitle}>COUNTRY</Text>
          {(hotel.country && hotel.country.trim() !== "")
            ? <Text style={styles.descriptionText}>{hotel.country}</Text>
            : <Text style={styles.descriptionText}>There is no country description available for this hotel.</Text>
          }
          <Text style={styles.descriptionTitle}>DESCRIPTION</Text>
          {(hotel.description && hotel.description.trim() !== "")
            ? <Text style={styles.descriptionText}>{hotel.description}</Text>
            : <Text style={styles.descriptionText}>There is no description available for this hotel.</Text>
          }
        </View>
        <TouchableOpacity onPress={() => this.AddOrRemovePressedPressed()}>
          <Text style={styles.addOrRemoveToFavoritesText}>{this.isFavorite(hotel.id,favourites) ? 'REMOVE FROM FAVORITES' : 'ADD TO FAVORITES'}</Text>
        </TouchableOpacity>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  elementsView:{
    alignSelf:'center',
    width: '90%',
  },
  priceText:{
    alignSelf:'center',
    fontWeight: 'bold',
    fontSize:16,
    marginTop:5
  },
  descriptionTitle:{
    color:theme.colors.primaryColor,
    fontWeight: 'bold',
    marginTop:20
  },
  descriptionText:{
    color:theme.colors.textColor,
    fontSize: 13,
    marginTop:7
  },
  addOrRemoveToFavoritesText:{
    alignSelf:'center',
    color:theme.colors.primaryColor,
    fontWeight: 'bold',
    marginTop:40
  }
})

const mapStateToProps = state => ({
  user: state.login.user,
  token: state.login.token,
  favourites: state.favourites.favourites
});

export default connect(mapStateToProps)(HotelDetails)
