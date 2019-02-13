import React, {Component} from 'react';
import {Platform,
        StyleSheet,
        Text,
        View,
} from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import Login from './app/components/login';
import Home from './app/components/Home';

const NavigationApp = createStackNavigator({
    Home: { screen: Home},

    Login: { screen: Login }
});

const AppContainer = createAppContainer(NavigationApp);

export default AppContainer;

const styles = StyleSheet.create({
  container: {

  },
});
