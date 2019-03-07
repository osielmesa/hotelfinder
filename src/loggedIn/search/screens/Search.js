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
import * as Animatable from 'react-native-animatable'
import ActionButton from 'react-native-action-button';

//Local
import theme from "../../../common/theme";
import {SearchBar} from "../../../common/components";
import {getAllHotels} from "../redux/SearchActions";
import {addRemoveFavorites, getFavourites} from "../../favourites/redux/FavoritesActions";
import HotelListItem from '../../../common/components/HotelListItem'

class Search extends Component {

  constructor(){
    super()
    this.limitAnimationDelayCount = 15
    this.state = {
      filteredHotelsArray:[],
      textFilter:''
    }
  }

  componentDidMount(): void {
    const {token} = this.props
    this.props.dispatch(getAllHotels(token))
    this.props.dispatch(getFavourites(token))
  }

  onItemPressed = (item) => {
    const {favourites} = this.props
    this.props.navigation.navigate('HotelDetails',{hotel:item,isFavorite:this.isFavorite(item.id,favourites)})
  }

  onItemIconPressed = (item) => {
    let isFavorite = false
    const {token,favourites } = this.props
    if(this.isFavorite(item.id,favourites)){
      isFavorite = true
    }
    this.props.dispatch(addRemoveFavorites({token:token,hotelId:item.id,isFavorite:!isFavorite}))
  }

  onSearchTextChanged = (text) => {
    if(text !== ''){
      const newData = this.props.hotels.filter(item => {
        const itemData = item.name.toUpperCase()
        const textData = text.toUpperCase()
        return itemData.indexOf(textData) > -1
      });
      this.setState({
        filteredHotelsArray: newData,
        textFilter:text
      })
    }else{
      this.setState({
        filteredHotelsArray: [],
        textFilter:''
      })
    }
  }

  isFavorite = (hotelId,favourites) => {
    for(let i = 0; i < favourites.length;i++){
      if(favourites[i].id === hotelId){
        return true
      }
    }
    return false
  }

  _renderItem = ({item,index}) =>{
    const {favourites} = this.props
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
          title={item.name}
          secondaryText={item.city}
          iconName={this.isFavorite(item.id,favourites) ? 'favorite' : 'favorite-border'}
          iconColor={this.isFavorite(item.id,favourites) ? theme.colors.favColor : theme.colors.secondaryTextColor}
          onPress={() => this.onItemPressed(item)}
          onIconPress={() => this.onItemIconPressed(item)}
          imageUri={item.image}
          stars={item.stars}
        />
      </Animatable.View>
    )
  }

  addHotelButtonPressed = () => {
    console.log('add Hotel')
  }

  render() {
    return (
      <View style={{flex:1}}>
        <ScrollView>
          <View style={{marginTop: 15}}>
            <SearchBar
              onSearchChange={(text) => this.onSearchTextChanged(text)}
              onClose={() => this.onSearchTextChanged('')}
              height={50}
              placeholder={'Search here'}
              autoCorrect={false}
              padding={5}
              returnKeyType={'search'}
              iconBackName={'magnify'}
              iconSearchName={'magnify'}
              iconCloseName={'close'}
              textStyle={{fontSize:15,fontWeight: 'bold'}}
            />
          </View>
          {this.props.hotels.length === 0 &&
          <View style={{margin:40}}>
            <Text style={{fontSize:16, color:theme.colors.secondaryTextColor}}>The hotels list will be shown here when it is available.</Text>
          </View>
          }
          {this.props.hotels.length > 0 &&
          <FlatList
            keyExtractor={(item, index) => index+''}
            data={this.state.filteredHotelsArray.length> 0 ? this.state.filteredHotelsArray : this.state.textFilter === '' ? this.props.hotels : []}
            renderItem={item => this._renderItem(item)}
            style={styles.hotelsList}
          />}
        </ScrollView>
        <ActionButton
          buttonColor={theme.colors.primaryColor}
          onPress={() => { this.props.navigation.navigate('AddHotel')}}
        />
      </View>
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
  favourites: state.favourites.favourites,
  hotels: state.search.hotels,
});

export default connect(mapStateToProps)(Search)
