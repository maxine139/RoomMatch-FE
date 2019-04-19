import React, { Component } from 'react';
import { View,
         StyleSheet
} from 'react-native';
export default class Chat_Screen extends Component {
  constructor(props){
    super(props)

    this.state = {
      id: 0,
      name: 'null',
    }
  }

  static navigationOptions = ({navigation, navigationOptions}) => {
    return {
      headerTitle: navigation.getParam('name', 'null'),
      headerTitleStyle: {
        flex: 1,
        color: '#fff',
        textAlign: 'center',
        alignSelf: 'center',
        fontWeight: 'normal',
      },

      headerStyle: {
        backgroundColor: '#2b5876',
        marginLeft:10
      },
    }
  };

  render() {
    // const { navigation } = this.props;
    // const itemId = navigation.getParam('id', '0');
    // const otherParam = navigation.getParam('name', 'null');

    return <View />;
  }
}
const styles = StyleSheet.create({});
