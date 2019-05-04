import React, {Component} from 'react';
import {StyleSheet,
        Text,
        FlatList,
        View,
        TouchableOpacity,
        Alert,
        Dimensions
} from 'react-native';
import { Avatar } from 'react-native-elements';
import TimeAgo from 'react-native-timeago'

import * as matchesServices from '../services/matches';
import * as profilesServices from '../services/profiles';

export default class Chat_List extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        loading: false,
        data: [{
            key: '1',
            name: "chica",
            subtitle: "person who lives in pranavs house"
        },
        {
            key: '200000',
            name: "yo mama",
            subtitle: "literally yo momma. what you gunna do"
        }],
        page: 1,
        seed: 1,
        error: null,
        refreshing: false,
        profiles: [],
      };
    }

  componentDidMount() {

    // socket events
    if (global.socket) {
      global.socket.on('match', (msg) => {
        console.log("CHAT LIST MATCH");
        console.log(JSON.stringify(msg));

        this.onFocus();
      });
    }

    // add navigation event
    const didFocus = this.props.navigation.addListener(
      'didFocus',
      () => {
        this.onFocus();
      }
    );
  }

  onFocus = () => {
    let matches = null;
    matchesServices.getMatches(global.user._id).then((res) => {
      console.log("MMM");
      console.log(JSON.stringify(res));

      matches = res.data.data;
      console.log(res.data.data);

      this.setState({
        matches:matches
      });

      let ids = [];
      for (let i = 0; i < matches.length; i ++) {
        const m = matches[i];

        let other_id = m.user_ids[0] == global.user._id ? m.user_ids[1] : m.user_ids[0];

        matches[i].other_id = other_id;

        ids.push(other_id);
      }

      console.log("Match Ids");

      return profilesServices.getManyProfiles(ids);
    }).then((res) => {
      console.log(res)
      if (res.data.success == false){}
        //return;
      else {
        console.log("PPP");
        console.log(res);
        console.log(matches);
        let profiles = res.data.data;
        for (let i = 0; i < profiles.length; i ++) {
          for (let j = 0; j < matches.length; j ++) {
            if (profiles[i].user_id == matches[j].other_id) {
              profiles[i].match_id = matches[j]._id;
              break;
            }
          }
        }
        this.setState({
          profiles: profiles
        });
      }
    }).catch((err) => {
      console.log("Matches Error");
      console.log(JSON.stringify(err));

      Alert.alert("Cannot connect to server");
    });
  };

  static navigationOptions = ({navigation, navigationOptions}) => {
    return {
      headerTitle: 'Chats',
      headerTitleStyle: {
        flex: 1,
        color: '#fff',
        textAlign: 'center',
        alignSelf: 'center',
        fontWeight: 'normal',
      },

      headerStyle: {
        backgroundColor: '#2b5876',
      },
    }
  };


  FlatListItemSeparator = () => {
      return (
        <View
          style={{
            height: 1,
            width: "100%",
            backgroundColor: "#607D8B",
          }}
        />
      );
  }
  GetItem (item) {
    this.props.navigation.navigate('Chat_Screen', {profile: item});
  }

  render() {

    console.log("CHAT LIST RENDER");
    console.log(JSON.stringify(this.state.profiles));
    if (this.state.profiles.length == 0)
    {
      return (
        <View style = {styles.wrapper}>
          <Text style={{fontSize: 20, alignSelf: 'center', color: 'grey'}}> No matches yet :c </Text>
        </View>
      )
    }
    else
    {
      return (
        <View style={styles.wrapper}>
        <FlatList
            data={this.state.profiles}
            ItemSeparatorComponent = {this.FlatListItemSeparator}
            ListFooterComponent = {this.FlatListItemSeparator}
            renderItem={({item}) => {
              let match = null;
              for (let i = 0; i < this.state.matches.length; i ++) {
                if (this.state.matches[i]._id == item.match_id) {
                  match = this.state.matches[i];
                }
              }

              let last_msg = match.chat.length == 0 ? {
                message: "No chat yet",
                timestamp: null
              } : {
                message: match.chat[0].message,
                timestamp: new Date(match.chat[0].timestamp),
              };

              return (
                <View>
                  <TouchableOpacity style={styles.item}
                    onPress={() => this.GetItem(item)}>
                    <View style={styles.main_view}>
                      <View>
                        <Avatar size="large" rounded source={{uri: item.image}}/>
                      </View>
                      <View style={styles.details}>
                        <View style={{flexDirection: 'row'}}>
                          <View>
                            <Text style={styles.name}>{item.firstname + ' ' + item.lastname} </Text>
                          </View>
                          <View style = {styles.timestamp}>
                            {last_msg.timestamp ? (<TimeAgo time={last_msg.timestamp}/>) : <Text></Text>}
                          </View>
                        </View>
                        <View>
                          <Text style={styles.preview}> {last_msg.message} </Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              )}}
          />
        </View>
      )
  }
  }
}


const styles = StyleSheet.create({
  main_view:{
    flex: 1,
    flexDirection: 'row'
  },
  details: {
    marginLeft: 10,
    width: Dimensions.get('window').width - 95,
  },
    wrapper: {
      flex: 1,
      justifyContent: 'center'
    },

    item: {
      padding: 10,
      height: 100,
    },
    preview: {
      alignSelf: 'flex-start',
      fontSize: 15,
    },
    name: {
      fontWeight: 'bold',
      alignSelf: 'flex-start',
      fontSize: 20,
      paddingBottom: 10,
    },
    timestamp: {
      position: 'absolute',
      right: 10,
    }
});
