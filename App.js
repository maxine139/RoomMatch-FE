import { createSwitchNavigator, createStackNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import Login from './app/components/Login';
import Edit_Profile from './app/components/Edit_Profile';
import Home from './app/components/Home';
import Register from './app/components/Register';
import Chat_List from './app/components/Chat_List';
import Chat_Screen from './app/components/Chat_Screen';

const AppStack = createStackNavigator({ Home: Home, Chat_List: Chat_List, Chat_Screen: Chat_Screen });
const AuthStack = createStackNavigator({ Login: Login, Register: Register });

const DrawerNav = createDrawerNavigator({
    Home: AppStack,
    Profile: Edit_Profile,
    Logout: AuthStack,
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
