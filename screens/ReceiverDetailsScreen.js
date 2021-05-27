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
                <View>
                    <Card title={'Item information'} titleStyle={{fontSize:20}}>

                    </Card>
                    <Card>
                        <Text>
                            Name:{this.state.itemName}
                        </Text>
                    </Card>
                    <Card>
                        <Text>
                        Reason :{this.state.reason_for_requesting}
                        </Text>
                    </Card>
                </View>
                <View>
                    <Card title={'Receiver information'} titleStyle={{fontSize:20}}>

                    </Card>
                    <Card>
                        <Text>
                            Name:{this.state.receiverName}
                        </Text>
                    </Card>
                    <Card>
                        <Text>
                        Contact :{this.state.receiverContact}
                        </Text>
                    </Card>
                    <Card>
                        <Text>
                            Address:{this.state.receiverAddress}
                        </Text>
                    </Card>
                </View>
                {this.state.receiverId!=this.state.userId?
                (<TouchableOpacity onPress={()=>{
                    this.updateItemStatus
                    this.props.navigation.navigate('MyDonation')
                }}>
                    <Text>
                        I want to donate.
                    </Text>
                </TouchableOpacity>)
                :null}
            </View>
        )
    }
}