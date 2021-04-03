import * as React from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import DonateScreen from '../screens/DonateScreen';
import RequestScreen from '../screens/RequestScreen';


export const AppTabNavigator = createBottomTabNavigator({
    BookRequestScreen: {
        screen: BookRequestScreen,
        navigationOptions: {
            tabBarLabel: 'Request items.'
        }
    },
    BookDonateScreen : {
        screen: AppStackNavigator,
        navigationOptions:{
            tabBarLabel: 'Donate items.'
        }
        
    }
});

const switchNavigator = createSwitchNavigator({
    SignupLoginScreen: {screen:SignupLoginScreen},
    TabNavigator:TabNavigator
  })
  
  const AppContainer = createAppContainer(switchContainer);