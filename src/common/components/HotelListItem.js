import React, {PureComponent} from 'react'
import {View, StyleSheet, Text,TouchableOpacity, Image} from 'react-native'
import { Icon } from 'react-native-material-ui';
import {connect} from 'react-redux'
import PropTypes from "prop-types";

import theme from '../theme'

class HotelListItem extends PureComponent {

  static propTypes = {
    title: PropTypes.string.isRequired,
    secondaryText: PropTypes.string.isRequired,
    iconName: PropTypes.string.isRequired,
    iconColor: PropTypes.string.isRequired,
    onPress: PropTypes.func,
    onIconPress: PropTypes.func,
    imageUri: PropTypes.string,
    stars: PropTypes.number
  }
  static defaultProps = {
    onPress: ()=>{},
    onIconPress: ()=>{},
    imageUri: null,
    stars: null
  }

  render() {
    const {title, secondaryText, iconName, iconColor, onPress=()=>{}, onIconPress=()=>{}, imageUri=null, orientation, stars = null} = this.props
    const limitTextSize  = orientation === 'portrait' ? 20 : 50
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.container}>
          <View style={styles.rowView}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              {imageUri && <Image style={{width: 50, height: 50}} source={{uri: imageUri}}/>}
              <Text style={{marginLeft:10}}>{title.length > limitTextSize ? title.slice(0, limitTextSize)+'...' : title}</Text>
            </View>
            <View style={styles.secondaryView}>
              <Text style={styles.secondaryText}>{secondaryText.length > limitTextSize ? secondaryText.slice(0, limitTextSize)+'...' : secondaryText}</Text>
              {stars &&
              <View style={{flexDirection:'row',alignItems:'center',marginRight: 5}}>
                <Text>{stars}</Text>
                <Icon name={'star'} size={15} color={theme.colors.starsColor}/>
              </View>
              }
              <TouchableOpacity onPress={onIconPress}>
                <Icon name={iconName} color={iconColor}/>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.divider}/>
        </View>
      </TouchableOpacity>
    )
  }
}
const styles = StyleSheet.create({
  container:{
    alignSelf:'stretch',
    alignItems:'center',
  },
  rowView:{
    flexDirection:'row',
    width:'90%',
    justifyContent:'space-between',
    alignItems:'center',
    height:60,
  },
  secondaryView:{
    flexDirection: 'row',
    alignItems:'center'
  },
  divider:{
    height: 1,
    backgroundColor:theme.colors.disabledColor,
    width: '90%'
  },
  secondaryText:{
    color:theme.colors.secondaryTextColor,
    marginRight:10,
    marginLeft:5
  }
})

const mapStateToProps = state => ({
  orientation: state.ui.orientation
});

export default connect(mapStateToProps)(HotelListItem)
