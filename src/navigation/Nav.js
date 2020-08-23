import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';


import MoviesScreen from '../screens/Movies'
import WishlistScreen from '../screens/Wishlist'
import { COLOR_CODES } from '../utility/Theme'


const TabNavigator = createBottomTabNavigator({
  Movies: MoviesScreen,
  Wishlist: WishlistScreen,
}, {
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      let IconComponent = Ionicons;
      let iconName;
      if (routeName === 'Movies') {
        iconName = focused
          ? 'film-outline'
          : 'film-sharp';
      } else if (routeName === 'Wishlist') {
        iconName = focused ? 'heart-outline' : 'heart-sharp';
      }

      // You can return any component that you like here!
      return <IconComponent name={iconName} size={25} color={tintColor} />;
    },
  }),
  tabBarOptions: {
    activeTintColor: COLOR_CODES.PRIMARY,
    inactiveTintColor: COLOR_CODES.GRAY,
    labelStyle: {
      fontSize: 12,
    },
    allowFontScaling: false,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
    tabBarComponent: BottomTabBar,
  },
});


export default createAppContainer(TabNavigator)