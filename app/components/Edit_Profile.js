import React, {Component} from 'react';
var t = require('tcomb-form-native');
var v = require('tcomb-validation');
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
import LinearGradient from 'react-native-linear-gradient';
import { TagSelect } from 'react-native-tag-select';
import theme from '../theme';

var Form = t.form.Form;

// overriding the text color
//Form.stylesheet.controlLabel.normal.color = '#fff';
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
  'First Name': t.String,              // a required string
  'Last Name': t.maybe(t.String),  // an optional string
  Age: t.Number,               // a required number
  gender: Gender,
  class: Class,
  major: t.String,
  'Im looking for housing...': Campus,
  'Short Bio': t.String
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
      // call getValue() to get the values of the form
      var value = this.refs.form.getValue();
      if (value) {
        this.props.navigation.navigate('Home')
      }
    }

  static navigationOptions = ({navigation, navigationOptions}) => {
    return {
      headerTitle: 'Profile',
      headerStyle: {
        backgroundColor: '#2b5876',
      },
    }
  }

  render() {
    const data = [
      { id: 1, label: 'Extrovert' },
      { id: 2, label: 'Introvert' },
      { id: 3, label: 'Clean/Tidy' },
      { id: 4, label: 'Messy' },
      { id: 5, label: 'Drinks Alcohol' },
      { id: 6, label: 'Smokes Weed' },
      { id: 7, label: 'Smokes cigs' },
      { id: 8, label: 'Night Owl' },
      { id: 9, label: 'Early Bird' }
    ];

    return (
      <View style={styles.wrapper}>
        <LinearGradient colors={['#2b5876', '#4e4376']}
        locations={[0,0.8]} style={styles.header}>
          <Text style={styles.text}> Profile </Text>
        </LinearGradient>
        <ScrollView style={styles.container}>
          {/* display */}
          <Form
            ref="form"
            type={Profile}
            options={options}
          />
          <TagSelect
            data={data}
            ref={(tag) => {
              this.tag = tag;
            }}
          />
          <TouchableHighlight style={styles.button} onPress={() => this.handlePress()} underlayColor='#99d9f4'>
            <Text style={{fontFamily: 'Avenir', color: '#fff', fontSize: 18}}>Save</Text>
          </TouchableHighlight>
        </ScrollView>
      </View>
    );
  }


};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
    container: {
      flex: 1,
      paddingTop: 20,
      paddingLeft: 20,
      paddingRight: 20,
      backgroundColor: '#fff'
    },
    header: {
      backgroundColor: '#6a7a94',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: 10,
      height: '10%',
    },
    text: {
      color: '#fff',
      fontSize: 20,
      fontWeight: 'bold'
    },
    button: {
      alignSelf: 'stretch',
      backgroundColor: theme.primaryColor,
      height: 48,
      marginBottom: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 30,
    }
})
