import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  StyleSheet,
} from "react-native";
import { Card, Icon, ListItem } from "react-native-elements";
import MyHeader from "../components/MyHeader.js";
import firebase from "firebase";
import db from "../config.js";

export default class MyDonationScreen extends Component{
    constructor() {
        super();
        this.state = {
          donorId: firebase.auth().currentUser.email,
          allDonations: [],
        };
        this.requestRef = null;
      }

      getDonorDetails = (donorId) => {
        db.collection("users")
          .where("email_id", "==", donorId)
          .get()
          .then((snapshot) => {
            snapshot.forEach((doc) => {
              this.setState({
                donorName: doc.data().first_name + " " + doc.data().last_name,
              });
            });
          });
      };

      getAllDonations = () => {
        this.requestRef = db
          .collection("all_donations")
          .where("donor_id", "==", this.state.donorId)
          .onSnapshot((snapshot) => {
            var allDonations = [];
            snapshot.docs.map((doc) => {
              var donation = doc.data();
              donation["doc_id"] = doc.id;
              allDonations.push(donation);
            });
            this.setState({
              allDonations: allDonations,
            });
          });
      };


      sendItem = (itemDetails) => {
        if (itemDetails.request_status === "Item Sent") {
          var requestStatus = "Donor Interested";
          db.collection("all_donations").doc(itemDetails.doc_id).update({
            request_status: "Donor Interested",
          });
          this.sendNotification(itemDetails, requestStatus);
        } else {
          var requestStatus = "Item Sent";
          db.collection("all_donations").doc(itemDetails.doc_id).update({
            request_status: "Item Sent",
          });
          this.sendNotification(itemDetails, requestStatus);
        }
      };

      sendNotification = (itemDetails, requestStatus) => {
        var requestId = itemDetails.request_id;
        var donorId = itemDetails.donor_id;
        db.collection("all_notifications")
          .where("request_id", "==", requestId)
          .where("donor_id", "==", donorId)
          .get()
          .then((snapshot) => {
            snapshot.forEach((doc) => {
              var message = "";
              if (requestStatus === "Item Sent") {
                message = this.state.donorName + " sent you item";
              } else {
                message =
                  this.state.donorName + " has shown interest in donating the item";
              }
              db.collection("all_notifications").doc(doc.id).update({
                message: message,
                notification_status: "unread",
                date: firebase.firestore.FieldValue.serverTimestamp(),
              });
            });
          });
      };
    

      keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, i }) => (
    <ListItem
      key={i}
      title={item.item_name}
      subtitle={
        "Requested By : " +
        item.requested_by +
        "\nStatus : " +
        item.request_status
      }
      leftElement={<Icon name="item" type="font-awesome" color="#696969" />}
      titleStyle={{ color: "black", fontWeight: "bold" }}
      rightElement={
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor:
                item.request_status === "Item Sent" ? "green" : "#ff5722",
            },
          ]}
          onPress={() => {
            this.sendItem(item);
          }}
        >
          <Text style={{ color: "#ffff" }}>
            Send Item
          </Text>
        </TouchableOpacity>
      }
      bottomDivider
    />
  );

  componentDidMount(){
      this.getAllDonations();
  }

    render(){
        return(
            <View style={{flex:1}}>
                <MyHeader navigation={this.props.navigation} title="My Donations"/>
                <View style={{flex:1}}>
                    {
                        this.state.allDonations.length===0
                        ?(
                            <View style={styles.subtitle}>
                                <Text style={{fontSize:20}}>
                                    List of All Donations
                                </Text>
                            </View>
                        )
                        :(
                            <FlatList
                            keyExtractor={this.keyExtractor}
                            data={this.state.allDonations}
                            renderItem={this.renderItem}
                            />
                        )
                    }
                </View>
            </View>
        )
    }
}

const styles= StyleSheet.create({
    button: {
        width: 100,
        height: 30,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 8,
        },
        elevation: 16,
      },
      subtitle: {
        flex: 1,
        fontSize: 20,
        justifyContent: "center",
        alignItems: "center",
      }
})