import React, { Component } from 'react';
import { View,
         StyleSheet
} from 'react-native';
import { GiftedChat, Bubble } from "react-native-gifted-chat";

export default class Chat_Screen extends Component {
  constructor(props){
    super(props)

    this.state = {
      messages: []
    }
  }

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: "Hello developer",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "React Native",
            avatar: "https://placeimg.com/140/140/any"
          }
        }
      ]
    });
  }

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

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));
  }


  static navigationOptions = ({navigation, navigationOptions}) => {
    return {
      headerTitle: navigation.getParam('name', 'null'),
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
        bottomOffset={100}
        minInputToolbarHeight={50}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1
        }}
      />
    )
  }
}
const styles = StyleSheet.create({});

kklkl
