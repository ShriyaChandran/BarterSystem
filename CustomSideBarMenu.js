import * as React from 'react';
import {View, TouchableOpacity, StyleSheet, Text, ImageBackground, Platform} from 'react-native';
import {DrawerItems} from 'react-navigation-drawer';
import { Avatar } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from 'expo-permissions';
import firebase from 'firebase';
import db from './config';
import { Icon } from "react-native-elements";
import { RFValue } from "react-native-responsive-fontsize";

export default class CustomSideBarMenu extends React.Component{
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.DrawerItemsContainer}>
                    <DrawerItems{...this.props}/>
                </View>
                <View style={styles.LogOutContainer}>
                    <TouchableOpacity style={styles.LogOutContainer}
                        onPress={()=>{
                        this.props.navigation.navigate('SignupLoginScreen')
                        firebase.auth().signOut()
                    }}>
                        <Text style={styles.LogOutText}>Sign Out</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
const styles= StyleSheet.create({
    container:{
        flex:1
    },
    DrawerItemsContainer:{
        flex:0.8
    },
    LogOutContainer:{
        flex:0.2,
        justifyContent:'flex-end',
        paddingBottom:200
    },
    LogOutButton:{
        height:80,
        width:'100%',
        justifyContent:'center',
        padding:10
    },
    LogOutText:{
        fontSize:30,
        fontWeight:'bold'
    }

})