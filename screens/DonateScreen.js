import React,{Component} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {ListItem} from 'react-native-elements';
//import {MyHeader} from '../components/MyHeader';
import firebase from 'firebase';
import db from '../config';
export default class DonateScreen extends Component{
  constructor(){
    super()
    this.state = {
      requestedItemsList : []
    };
    this.requestRef= null
  }
    
  getRequestedItemsList =()=>{
    this.requestRef = db.collection("requested_item")
    .onSnapshot((snapshot)=>{
      var requestedItemsList = snapshot.docs.map(document => document.data());
      this.setState({
        requestedItemsList : requestedItemsList
      });
      console.log(this.state.requestedItemsList);
    })
    
  }
  componentDidMount=()=>{
    this.getRequestedItemsList()
  }
  keyExtractor = (item, index) => index.toString()

  renderItem = ( {item, i} ) =>{
    console.log(item)
    console.log(i)
    return (
      <ListItem
        key={i}
        bottomDivider>
          <ListItem.Content>
        <ListItem.Title>{item.book_name}</ListItem.Title>
        <ListItem.Subtitle>{item.reason_to_request}</ListItem.Subtitle>
        
        
            <TouchableOpacity style={styles.button}
            onPress={()=>{
              this.props.navigation.navigate("ReceiverDetails",{"details":item})
            }}
            >
              <Text style={{color:'#ffff'}}>View</Text>
            </TouchableOpacity>

          </ListItem.Content>
       </ListItem>
    )
  }

  render(){
    return(
      <View style={{flex:1}}>
        {/*<MyHeader title="Donate Books"/>*/}
        <View style={{flex:1}}>
          {
            this.state.requestedItemsList.length === 0
            ?(
              <View style={styles.subContainer}>
                <Text style={{ fontSize: 20}}>List Of All Requested Books</Text>
              </View>
            )
            :(
              <View>
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.requestedItemsList}
                renderItem={this.renderItem}
              />
              </View>
            )
          }
        </View>
      </View>
    )
  }
}
  


const styles = StyleSheet.create({
    subContainer:{
      flex:1,
      fontSize: 20,
      justifyContent:'center',
      alignItems:'center'
    },
    button:{
      width:100,
      height:30,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:"#ff5722",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8
       }
    }
  })     