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

export default class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    componentDidMount(){
        this._loadInitialState().done()
    }

    _loadInitialState = async () => {
        //var value = await AsyncStorage.getItem('user');
        //if (value !== null) {
            //this.props.navigation.navigate('Home');
        //}
    }

    render() {
        return(
            <KeyboardAvoidingView behavior='padding' style={styles.wrapper}>
                <Text style = {styles.title}> Welcome to {"\n"} RoomMatch </Text>
                <View style={styles.box}>
                    <Text style={styles.header}>
                        - Login -
                    </Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder='Pacific Email'
                        onChangeText={ (username) => this.setState({username}) }
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder='Password'
                        onChangeText={ (password) => this.setState({password}) }
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.login}>
                        <Text style = {{fontFamily: 'Avenir', color: '#fff', fontSize: 18}}> Log in </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        );
    }

    login = () => {
        this.props.navigation.navigate('Edit_Profile');
        // alert(this.state.username);
        // fetch('http://67.166.132.5:3000/users', {
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         username: this.state.username,
        //         password: this.state.password
        //     })
        // })
        //
        // .then((response) => response.json())
        // .then ((res) => {
        //     if (res.success === true){
        //         AsyncStorage.setItem('user', res.user);
        //         this.props.navigation.navigate('Home');
        //     }
        //     else {
        //         alert(res.message);
        //     }
        // })
        // .done();
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
      borderRadius: 30
  },
  button: {
      alignSelf: 'stretch',
      backgroundColor: '#63a884',
      padding: 20,
      alignItems: 'center',
      borderRadius: 30
  }
});
