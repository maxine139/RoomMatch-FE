import React, {Component} from 'react';
import {Platform,
        StyleSheet,
        Text,
        View,
        TextInput,
        KeyboardAvoidingView,
        TouchableOpacity,
        AsyncStorage
} from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';

export default class Home extends React.Component {
    constructor(props){
        super(props);
    }

    

    render() {
        return(
            <Text> Hi! like me pls thx </Text>
        );
    }
};


const styles = StyleSheet.create({
  wrapper: {
      flex: 1,
      backgroundColor: '#6a7a94',
      alignItems: 'center'

  },
  title: {
      fontSize: 36,
      marginTop: 100,
      marginBottom: 80,
      color: '#fff',
      fontFamily: 'Avenir',
      letterSpacing: 8
  },
  box: {
      width: "85%",
      alignItems:'center',
      backgroundColor: '#fff',
      paddingLeft:40,
      paddingRight:40,
      paddingTop: 70,
      paddingBottom: 70,
      borderRadius: 30
  },
  header: {
      fontSize: 24,
      marginBottom: 60,
      color: '#6a7a94',
      fontWeight: 'bold',
      fontFamily: 'Avenir',

  },
  textInput: {
      alignSelf: 'stretch',
      padding: 16,
      marginBottom: 20,
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: '#6a7a94',
      borderRadius: 30,
      fontFamily: 'Avenir',

  },
  button: {
      alignSelf: 'stretch',
      backgroundColor: '#63a884',
      padding: 20,
      alignItems: 'center',
      borderRadius: 30
  }
});
