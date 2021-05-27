import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import CustomSideBarMenu from './CustomSideBarMenu';
import {AppTabNavigator} from './AppTabNavigator';
import DonateScreen from '../screens/DonateScreen';
import RequestScreen from '../screens/RequestScreen';
import SettingScreen from '../screens/SettingScreen';
import MyDonationScreen from '../screens/MyDonationScreen';

export const AppDrawerNavigator = createDrawerNavigator({
    Home:{
        screen:AppTabNavigator
    },
    MyDonations:{
        screen:MyDonationScreen
    },
    Notifications:{
        screen: NotificationScreen
    },
    Setting:{
        screen:SettingScreen
    }
},
{
    contentComponent:CustomSideBarMenu
},
{
    initialRouteName:'Home'
})