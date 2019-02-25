import React, {Component} from 'react';
import {Platform,
        StyleSheet,
        Text,
        View,
} from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import Login from './app/components/Login';
import Edit_Profile from './app/components/Edit_Profile';
import Home from './app/components/Home';

const NavigationApp = createStackNavigator({
    Login: { screen: Login },
    Edit_Profile: { screen: Edit_Profile},
    Home: { screen: Home }

});

const AppContainer = createAppContainer(NavigationApp);

export default AppContainer;

const styles = StyleSheet.create({
  container: {

  },
});
