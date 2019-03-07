import React from "react";
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from "react-navigation";
import Logout from '../common/components/Logout'

//Local
import Search from './search/screens/Search'
import AddHotel from './search/screens/AddHotel'
import Favorites from './favourites/screens/Favorites'
import HotelDetails from './details/screens/HotelDetails'
import {CustomTab} from "../common/components";
import {headerStyle, headerTitleStyle} from "../common/utils";
import theme from "../common/theme";

const TabNavigator = createBottomTabNavigator({
  Search: {
    screen: Search
  },
  Favorites: {screen: Favorites}
},{
  tabBarComponent:CustomTab,
});

const LoggedInNavigator = createStackNavigator({
  Tabs: {screen: TabNavigator},
  HotelDetails: {screen:HotelDetails},
  AddHotel:{screen:AddHotel}
});

const getTitle = (routeName) =>{
  switch (routeName) {
    case 'Search':
      return 'Hotels'
    case 'Favorites':
      return 'Favorites'
  }
}

TabNavigator.navigationOptions = ({ navigation }) => {
  const { routeName } = navigation.state.routes[navigation.state.index];
  const headerTitle = getTitle(routeName);
  return {
    headerTitle,
    headerStyle: headerStyle,
    headerTintColor: theme.colors.headerTintColor,
    headerTitleStyle: headerTitleStyle,
    headerRight: (<Logout/>),
  };
};

export default createAppContainer(LoggedInNavigator);
