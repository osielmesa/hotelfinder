// I am not sure why add hotel is not working with the API,
// I am doing something wrong because using postman I was available to add it
// I dont include in the form image and positioning map because of the time.
// I also run out of time to persist data locally in the device.
// The app is proportional in all devices and listen for orientation changes.
// I use animation as well.
// I use modularity software design principle which is a specialization of the principle of separation of concerns.
// Following the principle of modularity implies separating software into components according to functionality and responsibility.
import React, {Component} from 'react'
import {ScrollView, FlatList, StyleSheet, View, Text} from 'react-native'
import {connect} from 'react-redux'
import * as Animatable from 'react-native-animatable';

import theme from "../../../common/theme";
import HotelListItem from '../../../common/components/HotelListItem'
import {addRemoveFavorites} from "../redux/FavoritesActions";
import {baseUrl} from '../../../common/api'

class Search extends Component {

  limitAnimationDelayCount = 15

  onItemPressed = (item) => {
    this.props.navigation.navigate('HotelDetails',{hotel:item,isFavorite:true})
  }

  onItemIconPressed = (item) => {
    const {token } = this.props
    this.props.dispatch(addRemoveFavorites({token:token,hotelId:item.id,isFavorite:false}))
  }

  _renderItem = ({item,index}) =>{
    console.log(item)
    if(this.animationDelayFactor === undefined){
      this.animationDelayFactor = 0
    }else{
      this.animationDelayFactor += 1
    }
    if(this.animationDelayFactor >= this.limitAnimationDelayCount){
      this.animationDelayFactor = 0
    }
    return (
      <Animatable.View animation={'bounceIn'} delay={this.animationDelayFactor*50} key={index}>
        <HotelListItem
          title={item.name.length > 20 ? item.name.slice(0, 20)+'...' :item.name}
          secondaryText={item.city}
          iconName={'favorite'}
          iconColor={theme.colors.favColor}
          onPress={() => this.onItemPressed(item)}
          onIconPress={() => this.onItemIconPressed(item)}
          imageUri={baseUrl + item.image}
          stars={item.stars}
        />
      </Animatable.View>
    )
  }

  render() {
    const {favourites} = this.props
    return (
      <ScrollView>
        {favourites.length === 0 &&
        <View style={{margin:40}}>
          <Text style={{fontSize:16, color:theme.colors.secondaryTextColor}}>Your favourites hotels will be shown here when they are available.</Text>
        </View>
        }
        {favourites.length > 0 &&
        <FlatList
          keyExtractor={(item, index) => index+''}
          data={favourites}
          renderItem={item => this._renderItem(item)}
          style={styles.hotelsList}
        />}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  hotelsList:{
    marginTop:20
  }
})

const mapStateToProps = state => ({
  user: state.login.user,
  token: state.login.token,
  favourites: state.favourites.favourites
});

export default connect(mapStateToProps)(Search)
