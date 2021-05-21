import React from 'react';
import {View, Text} from 'react-native';
import {Card, Header, Icon} from 'react-native-elements';
import firebase from 'firebase'
import { diffClamp } from 'react-native-reanimated';

export default class ReceiverDetailsScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            userId:firebase.auth().currentUser.email,
            receiverId:this.props.navigation.getParem('details')["user_Id"],
            requestId:this.props.navigation.getParem('details')["request_id"],
            itemName:this.props.navigation.getParem('details')["item_name"],
            reason_for_requesting:this.props.navigation.getParem('details')["reason_to_request"],
            receiverName:'',
            receiverContact:'',
            receiverAddress:'',
            receiverRequestDocId:''
        }
    }

    getReceiverDetails(){
        db.collection('users').where('email_id','==', this.state.receiverId).get()
            .then(snapshot=>{
                snapshot.forEach(doc=>{
                    this.setState({
                        receiverName:doc.data().first_name,
                        receiverContact:doc.data().contact,
                        receiverAddress:doc.data().address
                    })
                })
            })
            
            db.collection('requested_items').where('request_id','==', this.state.requestId).get()
            .then(snapshot=>{
                snapshot.forEach(doc=>{
                    this.setState({
                        receiverRequestDocId:doc.id
                    })
                })
            })
        }

    updateItemStatus(){
        db.collection('all_donations').add({
            item_name:this.state.itemName,
            request_id:this.state.requestId,
            requested_by:this.state.receiverName,
            donor_id:this.state.userId,
            request_status:"Donor interested"
        })
    }

    render(){
        return(
            <View>
                <Text>
                    Receiver Details Screen
                </Text>
            </View>
        )
    }
}