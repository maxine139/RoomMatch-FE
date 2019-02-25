import React, {Component} from 'react';
var t = require('tcomb-form-native');
import {Platform,
        StyleSheet,
        Text,
        View,
        TextInput,
        KeyboardAvoidingView,
        TouchableOpacity,
        AsyncStorage,
        TouchableHighlight
} from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';

var Form = t.form.Form;

var Gender = t.enums({
  M: 'Male',
  F: 'Female'
});

var Class = t.enums({
    'F': 'Freshman',
    'So': 'Sophomore',
    'J': 'Junior',
    'Sr': 'Senior',
    'G': 'Graduate'
});

var Campus = t.enums({
    'On': 'On-Campus',
    'Off': 'Off-Campus'
})

var Profile = t.struct({
  Name: t.String,              // a required string
  Surname: t.maybe(t.String),  // an optional string
  Age: t.Number,               // a required number
  gender: Gender,
  class: Class,
  major: t.String,
  'Im looking for housing...': Campus
});
var options = {
    // auto: 'placeholders'
};

export default class Edit_Profile extends React.Component {
    constructor(props){
        super(props);
    }

    handlePress(){
        this.props.navigation.navigate('Home')
    }

  render() {
    return (
      <View style={styles.container}>
        {/* display */}
        <Form
          ref="form"
          type={Profile}
          options={options}
        />
        <TouchableHighlight style={styles.button} onPress={() => this.handlePress()} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableHighlight>
      </View>
    );
  }


};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //alignItems: 'center',
        //justifyContent: 'center',
        backgroundColor: '#fff'
    },
    text: {
        color: '#6a7a94'
    },
    button: {
        width: '30%',
        alignSelf: 'center',
        backgroundColor: '#63a884',
        padding: 20,
        alignItems: 'center',
        borderRadius: 30
    }
})
