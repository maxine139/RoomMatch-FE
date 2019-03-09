import React, {Component} from 'react';
import {Platform,
        Button,
        StyleSheet,
        Text,
        View,
        TextInput,
        KeyboardAvoidingView,
        TouchableOpacity,
        AsyncStorage
} from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';

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
            <LinearGradient colors={['#2b5876', '#4e4376']}
                locations={[0,0.8]} style={styles.wrapper}>
            <KeyboardAvoidingView behavior='padding'>
                <Text style = {styles.title}>WELCOME TO{"\n"}ROOMMATCH</Text>
                <View style={styles.box}>
                    <Text style={styles.header}>
                        ─ Login ─
                    </Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder='Pacific Email'
                        placeholderTextColor="#D9E3E7"
                        onChangeText={ (username) => this.setState({username}) }
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder='Password'
                        placeholderTextColor="#D9E3E7"
                        onChangeText={ (password) => this.setState({password}) }
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.login}>
                        <Text style = {{fontFamily: 'Avenir', color: '#fff', fontSize: 18}}> Log in </Text>
                    </TouchableOpacity>
                    <Text> ──── OR ──── </Text>
                    <Button title="Create New Account" style={{fontFamily: 'Avenir'}} onPress={() => this.gotoRegister()}/>
                </View>
            </KeyboardAvoidingView>
            </LinearGradient>
        );
    }

    gotoRegister = () => {
        this.props.navigation.navigate('Register');
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
      //alignItems: 'center'
  },
  title: {
      fontSize: 36,
      fontWeight: "bold",
      color: '#fff',
      fontFamily: 'Avenir',
      letterSpacing: 3,
      alignSelf: 'center',
      margin: 0,
      height: "30%",
      textAlignVertical: 'center'
      
  },
  box: {
      width: "100%",
      height: 400,
      alignSelf: 'center',
      alignItems:'center',
      paddingLeft: 24,
      paddingRight: 24,
      paddingTop: 32,
      paddingBottom: 28,
      borderRadius: 30
  },
  header: {
      fontSize: 22,
      marginBottom: "10%",
      color: '#fff',
      fontWeight: 'bold',
      fontFamily: 'Avenir'

  },
  textInput: {
      alignSelf: 'stretch',
      paddingLeft: 10,
      height: 40,
      marginBottom: 16,
      color: '#fff',
      borderWidth: 1,
      borderColor: '#6a7a94',
      borderRadius: 16,
      fontFamily: 'Avenir'
  },
  button: {
      alignSelf: 'stretch',
      backgroundColor: '#D5237E',
      height: 48,
      marginBottom: 10,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 30
  }
});
