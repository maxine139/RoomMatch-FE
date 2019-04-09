import React, {Component} from 'react';
import {Platform,
        Modal,
        Button,
        StyleSheet,
        Image,
        Text,
        View,
        TextInput,
        KeyboardAvoidingView,
        TouchableOpacity,
        TouchableHighlight,
        AsyncStorage
} from 'react-native';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';

// User backend connection
import { createUser } from '../services/users.js';

export default class Register extends React.Component {
    constructor(props){
      super(props);

      this.state = {
        email: "",
        password: ""
      };
    }

    static navigationOptions = {
        headerTransparent: true
    };

    render() {
        return(
            <LinearGradient colors={['#2b5876', '#4e4376']}
                locations={[0,0.8]} style={styles.wrapper}>
            <KeyboardAvoidingView behavior='padding' style={styles.wrapper}>
                <Text style = {styles.title}> Welcome to {"\n"} RoomMatch </Text>
                <View style={styles.box}>
                    <Text style={styles.header}>
                        - Register -
                    </Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder='Pacific Email'
                        onChangeText={ (email) => this.setState({email}) }
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder='Create Password'
                        secureTextEntry={true}
                        onChangeText={ (password) => this.setState({password}) }
                    />
                    <TextInput
                        style={styles.textInput}
                        secureTextEntry={true}
                        placeholder='Enter Password Again'
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.register}>
                        <Text style = {{fontFamily: 'Avenir', color: '#fff', fontSize: 18}}> Register </Text>
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
        createUser(email);
        this.props.navigation.navigate('Profile');
    }
};


const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
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
        alignSelf: 'center',
        width: "80%",
        alignItems:'center',
        backgroundColor: '#fff',
        paddingLeft:40,
        paddingRight:40,
        paddingTop: 50,
        paddingBottom: 50,
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
