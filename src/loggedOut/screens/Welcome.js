// I am not sure why add hotel is not working with the API,
// I am doing something wrong because using postman I was available to add it
// I dont include in the form image and positioning map because of the time.
// I also run out of time to persist data locally in the device.
// The app is proportional in all devices and listen for orientation changes.
// I use animation as well.
// I use modularity software design principle which is a specialization of the principle of separation of concerns.
// Following the principle of modularity implies separating software into components according to functionality and responsibility.
import React, {PureComponent} from 'react'
import {View, ScrollView, Text, StyleSheet, Dimensions, AsyncStorage} from 'react-native'
import {connect} from 'react-redux'
//Local
import theme from '../../common/theme'

class Welcome extends PureComponent {

  finishWelcome = async () => {
    this.props.navigation.navigate('Signin')
    try {
      await AsyncStorage.setItem('NOT_FIRST_TIME','NOT')
    } catch (error) {
      console.log('Error retrieving data:' + error)
    }
  }
  render() {
    const SCREEN_WIDTH = Dimensions.get('window').width
    return (
      <ScrollView
        horizontal
        pagingEnabled
        style={{flex:1}}
      >
        <View style={[styles.sectionView,{backgroundColor: theme.colors.primaryColor, width: SCREEN_WIDTH}]}>
          <View style={{alignItems: 'center'}}>
            <Text style={[styles.text,{fontSize:30}]}>Welcome to Hotels Finder.</Text>
            <Text style={styles.sloganText}>You feel it, you live it!</Text>
          </View>
          <Text style={styles.text2}>Swipe right to continue.</Text>
        </View>
        <View style={[styles.sectionView,{backgroundColor: theme.colors.secondWelcomeScreen, width: SCREEN_WIDTH}]}>
          <Text style={styles.text}>Sig in using your credentials.</Text>
          <Text style={styles.text2}>Swipe right to continue or left to previous tip.</Text>
        </View>
        <View style={[styles.sectionView,{backgroundColor: theme.colors.primaryColor, width: SCREEN_WIDTH}]}>
          <Text style={styles.text}>Touch a hotel to watch details, price, description and more.</Text>
          <Text style={styles.text2}>Swipe right to continue or left to previous tip.</Text>
        </View>
        <View style={[styles.sectionView,{backgroundColor: theme.colors.forthWelcomeScreen, width: SCREEN_WIDTH}]}>
          <Text style={styles.text}>Use favourite icon to follow hotel.</Text>
          <Text style={styles.text2}>Swipe right to continue or left to previous tip.</Text>
        </View>
        <View style={[styles.sectionView,{backgroundColor: theme.colors.primaryColor, width: SCREEN_WIDTH}]}>
          <Text style={styles.text}>You are ready!</Text>
          <Text style={styles.text2} onPress={() => this.finishWelcome()}>Touch here to finish.</Text>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  text:{
    fontSize:20,
    color:'white',
    marginLeft: 15,
    marginRight: 15
  },
  sloganText:{
    fontSize:20,
    color:'white',
    marginTop:100,
    marginLeft: 15,
    marginRight: 15
  },
  text2:{
    fontSize:15,
    color:'white',
    marginLeft: 15,
    marginRight: 15
  },
  sectionView:{
    flex:1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor:'red'
  }
})

const mapStateToProps = state => ({
  orientation: state.ui.orientation
})

export default connect(mapStateToProps)(Welcome)
