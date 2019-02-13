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

export default class Home extends React.Component {
    render() {
        return(
                <View style={styles.container}>
                    <Text style={styles.text}>
                        insert things here <3
                    </Text>
                </View>
        );
    }


};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2896d3'
    },
    text: {
        color: '#fff'
    }
})
