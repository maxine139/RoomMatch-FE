import React, {Component} from 'react';
import {Button,
        StyleSheet,
        Text,
        View,
        TextInput,
        KeyboardAvoidingView,
        TouchableOpacity,
        Alert
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Logo from '../img/roommatch_logo.svg'
import theme from '../theme';
// User backend connection
import * as usersService from '../services/users.js';

export default class Register extends React.Component {
    constructor(props){
      super(props);

      this.state = {
        email: "",
        password: ""
      };
    }

    // Back button
    // hi
    static navigationOptions = {
        headerTransparent: true,
    };

    render() {
        return(
            <LinearGradient colors={['#2b5876', '#4e4376']}
                locations={[0,0.8]} style={styles.wrapper}>
            <KeyboardAvoidingView behavior='padding' style={styles.wrapper}>
            <View style={styles.titleCont}>
                    <Logo width={300}/>
                </View>
                <View style={styles.box}>
                    <Text style={styles.header}>
                    Create New Account
                    </Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder='Pacific Email'
                        placeholderTextColor="#D9E3E7"
                        onChangeText={ (email) => this.setState({email}) }
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder='Enter Password'
                        placeholderTextColor="#D9E3E7"
                        secureTextEntry={true}
                        onChangeText={ (password) => this.setState({password}) }
                    />
                    <TextInput
                        style={styles.textInput}
                        secureTextEntry={true}
                        placeholder='Confirm Password'
                        placeholderTextColor="#D9E3E7"
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.register}>
                        <Text style = {{fontFamily: 'Avenir', color: '#fff', fontSize: 18}}> Confirm </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
            </LinearGradient>
        );
    }

  register = () => {
    const email = this.state.email;

    // Request
    console.log("REGISTER SCREEN register");

    usersService.createUser(email).then((res) => {
      console.log('SUCCESS: User created');
      console.log(JSON.stringify(res));

      const success = res.data.success;
      if (success === true) {
        // success
        this.props.navigation.navigate('Login');
      } else {
        // failure
        const err = res.data.error;
        throw err;
      }
    }).catch((err) => {
      console.log("ERROR: Cannot register");
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
    },
    titleCont: {
        height: "30%",
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 20,
    },
    title: {
        fontSize: 36,
        marginTop: 120,
        alignSelf: 'center',
        marginBottom: 80,
        color: '#fff',
        fontFamily: 'Avenir',
        letterSpacing: 8
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
        borderRadius: 30,
    },
});
