import { createSwitchNavigator, createStackNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import Login from './app/components/Login';
import Edit_Profile from './app/components/Edit_Profile';
import Home from './app/components/Home';
import Register from './app/components/Register';
import Chat_Main from './app/components/Chat_Main';

const AppStack = createStackNavigator({ Home: Home, Chat_Main: Chat_Main });
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
