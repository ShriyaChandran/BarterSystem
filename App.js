import * as React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import SignupLoginScreen from './screens/SignupLoginScreen';
import {AppTabNavigator} from './components/AppTabNavigator';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import { AppDrawerNavigator } from '../BookSantaComplete/components/AppDrawerNavigator';

export default class App extends React.Component{
  render(){
    return(
      <AppContainer/>
    )
  }
}
const switchNavigator = createSwitchNavigator({
  SignupLoginScreen: {screen:SignupLoginScreen},
  Drawer:{screen:AppDrawerNavigator}
})

const AppContainer = createAppContainer(switchNavigator);