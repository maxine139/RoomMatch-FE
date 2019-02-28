import React, {Component} from 'react';
var t = require('tcomb-form-native');
import {Platform,
        StyleSheet,
        Text,
        View,
        ScrollView,
        TextInput,
        KeyboardAvoidingView,
        TouchableOpacity,
        AsyncStorage,
        TouchableHighlight
} from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import TagsView from './Tags';

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

const tags=['Extrovert', 'Introvert', 'Clean/Tidy', 'Messy', 'Drinks Alcohol', 'Smokes Weed', 'Smokes cigs', 'Night Owl', 'Early Bird']

var Profile = t.struct({
  Name: t.String,              // a required string
  Surname: t.maybe(t.String),  // an optional string
  Age: t.Number,               // a required number
  gender: Gender,
  class: Class,
  major: t.String,
  'Im looking for housing...': Campus,
  'Short Bio': t.maybe(t.String)
});
var options = {
    fields: {
        'Short Bio': {
            multiline: true
        }
    }
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
      <ScrollView style={styles.container}>
        {/* display */}
        <Form
          ref="form"
          type={Profile}
          options={options}
        />
        <TagsView
            all={tags}
            //selected={['hi']}
            isExclusive={false}
        />
        <TouchableHighlight style={styles.button} onPress={() => this.handlePress()} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableHighlight>
      </ScrollView>
    );
  }


};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //alignItems: 'center',
        //justifyContent: 'center',
        backgroundColor: '#fff',
        padding: 20
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
        borderRadius: 30,
        marginBottom: 50
    }
})
