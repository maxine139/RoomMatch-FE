import React, {Component} from 'react';
import {Platform,
        StyleSheet,
        Text,
        View,
} from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import Login from './app/components/Login';
import Edit_Profile from './app/components/Edit_Profile';

const NavigationApp = createStackNavigator({
    Login: { screen: Login },

    Edit_Profile: { screen: Edit_Profile}

});

const AppContainer = createAppContainer(NavigationApp);

export default AppContainer;

const styles = StyleSheet.create({
  container: {

  },
});
