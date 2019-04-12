import React, {Component} from 'react';
import {StyleSheet,
        Image,
        Text,
        FlatList,
        View,
        TextInput,
        KeyboardAvoidingView,
        TouchableOpacity,
        TouchableHighlight,
        AsyncStorage,
        Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { ListItem } from 'react-native-elements'


export default class Chat_Main extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        loading: false,
        data: [{
            key: '1',
            name: "chica",
            subtitle: "person who lives in pranavs house"
        },
        {
            key: '200000',
            name: "yo mama",
            subtitle: "literally yo momma. what you gunna do"
        }],
        page: 1,
        seed: 1,
        error: null,
        refreshing: false,
      };
    }

    // const list = [
    //     {
    //         name: "chica",
    //         subtitle: "person who lives in pranavs house"
    //     },
    //     {
    //         name: "yo mama",
    //         subtitle: "literally yo momma. what you gunna do"
    //     }
    // ]

  static navigationOptions = ({navigation, navigationOptions}) => {
    return {
      headerTitle: 'Chats',
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


    FlatListItemSeparator = () => {
        return (
          <View
            style={{
              height: 1,
              width: "100%",
              backgroundColor: "#607D8B",
            }}
          />
        );
      }
    GetItem (item) {

  Alert.alert(item);

  }

  render() {
    return (
      <View style={styles.wrapper}>
      <FlatList

          data={ this.state.data }

          ItemSeparatorComponent = {this.FlatListItemSeparator}
          ListFooterComponent = {this.FlatListItemSeparator}

          renderItem={({item}) => {
            return (
              <View>
                <TouchableOpacity style={styles.item}
                  onPress={this.GetItem.bind(this, item.key)}>
                  <Text>
                    <Text style={styles.name}> {item.name} </Text> {'\n'}
                    <Text> {item.subtitle} </Text>
                  </Text>
                </TouchableOpacity>
              </View>
            )}}
        />
      </View>
    )
  }
}


const styles = StyleSheet.create({
    wrapper: {
      flex: 1,
      justifyContent: 'center'
    },

    item: {
        padding: 10,
        height: 100,
    },
    name: {
      fontSize: 20,
    }
});
