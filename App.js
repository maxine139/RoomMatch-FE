import React, {Component} from 'react';
import {Button, Platform,
        StyleSheet,
        Text,
        View,
} from 'react-native';
import { createSwitchNavigator, createStackNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import Login from './app/components/Login';
import Edit_Profile from './app/components/Edit_Profile';
import Home from './app/components/Home';
import Register from './app/components/Register';

const AppStack = createStackNavigator({ Home: Home });
const AuthStack = createStackNavigator({ Login: Login, Register: Register, Profile: Edit_Profile });

const DrawerNav = createDrawerNavigator({
    AppStack: AppStack,
  Logout: AuthStack,
  Profile: Edit_Profile,
})

export default createAppContainer(createSwitchNavigator(
  {
    App: DrawerNav,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'Auth',
  }
));

// const NavigationApp = createStackNavigator(
//     {
//         Login: { screen: Login, navigationOptions: ({header:null}) },
//         Edit_Profile: { screen: Edit_Profile, navigationOptions: ({header:null})},
//         Home: {
//             screen: Home,
//             navigationOptions: ({ navigation }) => ({
//                 title: "RoomMatch",
//                 headerLeft: <Button navigate={this.props.navigation.toggleDrawer()} title= "=" />
//             })
//         },
//         Register: { screen: Register }
//     },
//
// );



// const AppContainer = createAppContainer(NavigationApp);
//
// export default AppContainer;

const styles = StyleSheet.create({
  container: {

  },
});
