import React, {Component} from 'react';
import {
  Alert,
    StyleSheet,
    Text,
    View,
    TextInput,
    KeyboardAvoidingView,
    TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import theme from '../theme';
import PrimaryButton from './Button'
import Logo from '../img/roommatch_logo.svg'
import * as usersService from '../services/users.js';

export default class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }
    static navigationOptions = {
        header: null,
    };

    render() {
        return(
            <LinearGradient colors={['#2b5876', '#4e4376']}
                locations={[0,0.8]} style={styles.wrapper}>
            <KeyboardAvoidingView behavior='padding'>
                <View style={styles.titleCont}>
                    <Logo width={300}/>
                </View>
                <View style={styles.box}>
                    <Text style={styles.header}>
                        Login
                    </Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder='Pacific Email'
                        placeholderTextColor="#D9E3E7"
                        onChangeText={ (email) => this.setState({email}) }
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder='Password'
                        placeholderTextColor="#D9E3E7"
                        secureTextEntry = {true}
                        onChangeText={ (password) => this.setState({password}) }
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.login}>
                        <Text style = {{fontFamily: 'Avenir', color: '#fff', fontSize: 18}}> Log in </Text>
                    </TouchableOpacity>
                    <Text style={{ alignSelf: 'center', color: '#fff'}}> ──── OR ──── </Text>
                    <PrimaryButton title="Create New Account" onPress={() => this.gotoRegister()}/>
                </View>
            </KeyboardAvoidingView>
            </LinearGradient>
        );
    }

    gotoRegister = () => {
        this.props.navigation.navigate('Register');
    }
  login = () => {
    const email = this.state.email;

    // INITALIZE GLOBAL STORE FOR APP VARS
    let store = {};

    usersService.authUser(email).then((res) => {
      const status = res.status;

      if (status == 200) {
        if (!res.data.success)
          throw "Wrong email and password"
        global.user = res.data.data;

        // has profile?
        if (res.data.data.has_profile) {
          this.props.navigation.navigate('Home');
        } else {
          this.props.navigation.navigate('Profile');
        }
      } else {
        console.log("LOGIN PAGE ERROR: cannot login");
        console.log(JSON.stringify(res));
        throw res.data.error
      }
    }).catch((err) => {
      console.log("LOGIN PAGE ERROR: cannot login");
      console.log(JSON.stringify(err));
      Alert.alert(
        'Error',
        err,
        [
          {text: 'OK'},
        ],
        {cancelable: false},
      );
    });
  }
};


const styles = StyleSheet.create({
  wrapper: {
      flex: 1,
      //alignItems: 'center'
  },
    titleCont:{
        height: "30%",
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 20
    },
  title: {
      fontSize: 36,
      fontWeight: "900",
      color: '#fff',
      fontFamily: 'Avenir',
      letterSpacing: 3,
      alignSelf: 'center',
      margin: 0,
      textAlignVertical: 'center'
  },
  box: {
      width: "100%",
      height: 500,
      maxHeight: '40%',
      alignSelf: 'center',
      paddingLeft: 24,
      paddingRight: 24,
      paddingTop: 32,
      paddingBottom: 28,
      borderRadius: 30
  },
  header: {
      fontSize: 22,
      marginBottom: 16,
      color: '#fff',
      fontWeight: 'bold',
      fontFamily: 'Avenir',
      textAlign: 'left'

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
        backgroundColor: theme.primaryColor,
        height: 48,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30
    },
});
