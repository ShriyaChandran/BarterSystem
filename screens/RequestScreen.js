import * as React from 'react';
import {Text, View, StyleSheet, TouchableOpacity,TextInput,KeyboardAvoidingView} from 'react-native';
import firebase from 'firebase';
import db from '../config';
import {MyHeader} from '../components/MyHeader';
import { ScrollView } from 'react-native';

export default class  RequestScreen extends React.Component{
    constructor(){
        super();
        this.state={
            userId: firebase.auth().currentUser.email,
            name: "",
            reasonToRequest:""
        }
    }
    createUniqueId(){
        return Math.random().toString(36).substring(7);
    }

    getIsItemRequestActive() {
        db.collection("users")
          .where("email_id", "==", this.state.userId)
          .onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              this.setState({
                IsItemRequestActive: doc.data().IsItemRequestActive,
                userDocId: doc.id,
              });
            });
          });
      }

      sendNotification = () => {
        //to get the first name and last name
        db.collection("users")
          .where("email_id", "==", this.state.userId)
          .get()
          .then((snapshot) => {
            snapshot.forEach((doc) => {
              var name = doc.data().first_name;
              var lastName = doc.data().last_name;
    
              // to get the donor id and book nam
              db.collection("all_notifications")
                .where("request_id", "==", this.state.requestId)
                .get()
                .then((snapshot) => {
                  snapshot.forEach((doc) => {
                    var donorId = doc.data().donor_id;
                    var itemName = doc.data().item_name;
    
                    //targert user id is the donor id to send notification to the user
                    db.collection("all_notifications").add({
                      targeted_user_id: donorId,
                      message:
                        name + " " + lastName + " received the item " + itemName,
                      notification_status: "unread",
                      item_name: itemName,
                    });
                  });
                });
            });
          });
      };

    addRequest=(name,reasonToRequest)=>{
        var userId= this.state.userId;
        var randomRequestId= this.createUniqueId();
        db.collection('requested_item').add({
            "user_id": userId,
            "item_name":name,
            "reason_to_request": reasonToRequest,
            "request_id": randomRequestId
        })
        this.setState({
            name:'',
            reasonToRequest: '',
            itemStatus:'',
        })
        alert("item requested successfully!")
    }

    render(){
        if(this.state.IsItemRequestActive==true){
            return(
                <View style={{flex:1, justifyContent:'center'}}>
                    <View style={{borderColor:'blue', borderWidth:2,justifyContent:'center',alignItems:'center'}}>
                <Text>Item name</Text>
                <Text> {this.state.name}</Text>
                    </View>
                    <View style={{borderColor:"blue",borderWidth:2, justifyContent:'center',alignItems:'center'}}>
                        <Text>Item status</Text>
                        <Text>{this.state.itemStatus}</Text>
                    </View>
                    <TouchableOpacity style={{borderWidth:1, borderColor:'blue', backgroundColor:'#ADD8E6'}}>
                        <Text>
                            I received the book.
                        </Text>
                    </TouchableOpacity>
                </View>
              )
        }
        else{
            return(
                <View style={{flex:1}}>
                    <MyHeader title="Request Item" navigation={this.props.navigation}/>
                    <ScrollView>
                        <KeyboardAvoidingView style={styles.keyBoardStyle}> 
                            <TextInput 
                            style={styles.formTextInput}
                            placeholder={"Enter item name"}
                            onChangeText={(text)=>{
                                this.setState({
                                    name:text
                                })
                            }}
                            value={this.state.name}
                            />
                            <TextInput
                            style={[styles.formTextInput, {height:300}]}
                            multiline
                            numberOfLines={8}
                            placeholder={"Why do you need the item"}
                            onChangeText={(text)=>{
                                this.setState({
                                    reasonToRequest:text
                                })
                            }}
                            />
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            )
        }
        
    }
}
const styles = StyleSheet.create({
    keyBoardStyle : {
      flex:1,
      alignItems:'center',
      justifyContent:'center'
    },
    formTextInput:{
      width:"75%",
      height:35,
      alignSelf:'center',
      borderColor:'#ffab91',
      borderRadius:10,
      borderWidth:1,
      marginTop:20,
      padding:10,
    },
    button:{
      width:"75%",
      height:50,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:10,
      backgroundColor:"#ff5722",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8,
      },
      shadowOpacity: 0.44,
      shadowRadius: 10.32,
      elevation: 16,
      marginTop:20
      },
    }
  )