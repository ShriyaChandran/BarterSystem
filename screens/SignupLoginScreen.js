import * as React from 'react';
import {View, Text, TextInput, Alert, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Modal, ScrollView} from 'react-native';
import db from '../config';
import firebase from 'firebase';


export default class SignupLoginScreen extends React.Component{
    constructor(){
        super();
        this.state={
            emailId:'',
            password:'',
            confirmPassword:'',
            first_name:'',
            last_name:'',
            isModalVisible:'',
            contact:'',
            address:''

        }
    }

    userSignup = (emailId, password, confirmPassword) =>{
        if(password!=confirmPassword){
            alert('Password does not match.')
        }
        else{  
            firebase.auth().createUserWithEmailAndPassword(emailId, password)
            .then(()=>{
                db.collection('users').add({
                    first_name : this.state.firstName,
                    last_name : this.state.lastName,
                    contact : this.state.contact,
                    email_id : this.state.emailId,
                    address : this.state.address,
                    IsBookRequestActive: false  
                })
                alert('user added successfully');
                this.setState({
                    isModalVisible:false
                })
            })
            .catch(error=>{
                alert(error.code, error.message)
            })  
        }
    }

    userLogin = (emailId, password)=>{
        firebase.auth().signInWithEmailAndPassword(emailId, password)
        .then(()=>{
            this.props.navigation.navigate('RequestScreen')
        })
        .catch((error)=>{
            alert(error.code, error.message)
        })
    }

    showModal=()=>{
        return(
            <Modal visible={this.state.isModalVisible} transparent={true} animationType="fade">
                <View style={styles.modalContainer}>
                    <ScrollView>
                        <KeyboardAvoidingView>
                            <Text style={styles.modalTitle}>REGISTRATION</Text>
                            <TextInput
                               style={styles.formTextInput}
                               placeholder = {"First Name"}
                               maxLength = {15}
                               onChangeText = {(text)=>{this.setState({
                                   firstName: text
                               })}}
                            />
                            <TextInput
                             style={styles.formTextInput}
                             placeholder = {"Last Name"}
                             maxLength = {15}
                             onChangeText = {(text)=>{this.setState({
                                 lastName : text
                             })}}
                            />
                            <TextInput
                            style={styles.formTextInput}
                            placeholder = {"contact"}
                            maxLength = {10}
                            keyboardType = {'numeric'}
                            onChangeText = {(text)=>{this.setState({
                                contact: text
                            })}}
                            />
                            <TextInput
                            style={styles.formTextInput}
                            placeholder = {"address"}
                            onChangeText = {(text)=>{this.setState({
                                address: text
                            })}}
                            />
                            <TextInput
                             style={styles.formTextInput}
                             placeholder ={"emailId"}
                             keyboardType = {'email-address'}
                             onChangeText = {(text)=>{this.setState({
                                 emailId : text
                             })}}
                            />
                            <TextInput
                             style={styles.formTextInput}
                             placeholder ={"password"}
                             secureTextEntry = {true}
                             onChangeText = {(text)=>{this.setState({
                                 password : text
                             })}}
                            />
                            <TextInput
                            style={styles.formTextInput}
                            placeholder ={"confirmPassword"}
                            secureTextEntry = {true}
                            onChangeText = {(text)=>{this.setState({
                                confirmPassword : text
                            })}}
                            />
                            <View style={styles.button}>
                                <TouchableOpacity onPress={()=>{this.userSignup(this.state.emailId, this.state.password,this.state.confirmPassword)}}>
                                    <Text style={styles.registerButtonText}> Register</Text>
                                </TouchableOpacity>
                            </View>

                            <View>
                                <TouchableOpacity style={styles.button}
                                onPress={()=>{this.setState({
                                    isModalVisible:false
                                })}}>
                                    <Text style={styles.registerButtonText}> Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </Modal>
        )
    }

    render(){
        return(
        <View style={styles.container}>
            {
                this.showModal()
            }
            <View>
                <Text style={styles.modalTitle}>
                    Barter System App :)
                </Text>
            </View>
            <View>
                <TextInput
                    style={styles.formTextInput}
                    placeholder="abc@example.com"
                    keyboardType="email-address"
                    onChangeText={(text)=>{
                        this.setState({
                            emailId:text
                        })
                    }}
                />

                <TextInput
                style={styles.formTextInput}
                    placeholder="Enter password"
                    secureTextEntry={true}
                    onChangeText={(text)=>{
                        this.setState({
                        password:text
                        })
                    }}
                />
                <TouchableOpacity style={styles.button}
                onPress = {()=>{this.userLogin(this.state.emailId, this.state.password)}}>
                    <Text style={styles.buttonText}> Login </Text>
                </TouchableOpacity>

                <TouchableOpacity
                style={styles.button}
                onPress={()=>{
                    console.log(this.state.isModalVisible)
                    this.setState({
                        isModalVisible:true 
                    })
                    console.log(this.state.isModalVisible)
                }}
                >
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
                
            </View>
        </View>
        );
    }
} 

const styles= StyleSheet.create({
    button:{
        width:300,
        height:50,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:25,
        backgroundColor:"#00B9F6",
        shadowColor: "#000",
        margin:10,
        shadowOffset: {
           width: 0,
           height: 8,
        }
    },
    buttonText:{
        color:'#0031e7',
        fontWeight:'200',
        fontSize:20
      },
    container:{
        flex:1,
        backgroundColor:'#CBE2F1',
        alignItems: 'center',
        justifyContent: 'center'
    },
    formTextInput:{
        width:"75%",
        height:35,
        alignSelf:'center',
        borderColor:'#ffab91',
        borderRadius:10,
        borderWidth:1,
        marginTop:20,
        padding:10
      },
      modalTitle:{
          justifyContent:'center',
          alignSelf:'center',
          fontSize:30,
          margin:20,
          color:'#0031e7'
      },
      modalContainer:{
          flex:1,
          borderRadius:20,
          justifyContent:'center',
          alignItems:'center',
          backgroundColor:'#ffff',
          marginRight:30,
          marginLeft:30,
          marginTop:80,
          marginBottom:80
      }

})


//add styling to the registeration title of modal
//add styling to register button
//add styling to the title barter system app
//have margins around login n sign up