import React, { Component } from 'react';
import { View,
  StyleSheet,
  Alert
} from 'react-native';
import { GiftedChat, Bubble } from "react-native-gifted-chat";

import * as matchesServices from '../services/matches';

export default class Chat_Screen extends Component {
  constructor(props){
    super(props)

    console.log("CHAT");
    const profile = this.props.navigation.getParam("profile");

    this.state = {
      profile: profile,
      messages: [
      ]
    }
  }

  componentDidMount() {
    console.log("CHAT SCREEN MOUNT");

    // add socket event
    global.socket.on('message', (msg) => {
      console.log('SOCKET MSGG');
      console.log(JSON.stringify(msg));

      this.getMessage();
    });

    if (this.state.profile.match_id == msg.match_id) {
      this.getMessage();
    }
  }

  getMessage = () => {
    // get chat
    const match_id = this.state.profile.match_id;
    matchesServices.getChat(match_id).then((res) => {
      const chat = res.data.data[0].chat;
      
      console.log(JSON.stringify(chat));

      let chat_list = [];
      for (let i = 0; i < chat.length; i ++) {
        const c = chat[i];

        chat_list.push({
          _id: i,
          text: c.message,
          createdAt: new Date(Number(c.timestamp)),
          user: {
            _id: global.user._id == c.from ? 1 : 2,
            name: global.user._id == c.from ? null : this.state.profile.firstname,
            avatar: global.user._id == c.from ? null : this.state.profile.image,
          }
        });
      }

      this.setState({
        messages: chat_list
      });
    }).catch((err) => {
      Alert.alert("Cannot connect to server");
    });

  };

  renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#2b5876',
          },
        }}
      />
    );
  }

  onSend(msg) {

    // append
    let chat = this.state.messages;
    chat.unshift({
      _id: chat.length,
      text: msg[0].text,
      createdAt: new Date(),
      user: {
        _id: 1
      }
    });
    this.setState({
      messages: chat
    });

    // send to server
    let match_id = this.state.profile.match_id;
    let user_id = global.user._id;
    let message = msg[0].text;
    matchesServices.addChat(match_id, user_id, message).then((res) => {
      console.log("CHAT ADD RES");
      console.log(JSON.stringify(res));
    }).catch((err) => {
      Alert.alert("Cannot connect to server");
    });
  }


  static navigationOptions = ({navigation, navigationOptions}) => {
    return {
      headerTitle: navigation.getParam('profile', {}).firstname,
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

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        renderBubble={this.renderBubble}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1
        }}
      />
    )
  }
}
const styles = StyleSheet.create({});
