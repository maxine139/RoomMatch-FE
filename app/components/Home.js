import React, {Component} from 'react';
import {StyleSheet,
        Image,
        Text,
        View,
        Dimensions,
  TouchableOpacity,
  Alert,
  Platform
} from 'react-native';
import SwipeCards from 'react-native-swipe-cards';
import Logo from '../img/roommatch_logo.svg';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import * as profilesServices from '../services/profiles';
import * as matchesServices from '../services/matches';

import * as socketServices from '../services/sockets';

const cards = []

class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const name = this.props.firstname + ' ' + this.props.lastname;
    const gender = this.props.gender;
    const age = this.props.age;
    const major = this.props.major;
    const year = this.props.class;
    const bio = this.props.bio;

    // parse tags
    const tags = this.props.tags.split(',');

    return (
        <View style={styles.card}>
          <View style={styles.thumbnail}>
          <Image style={{height: '100%'}} source={{uri: this.props.image}} />
          </View>
          <View style={styles.infoText}>
            <View>
              <Text style={styles.nameText}>{name}</Text>
            </View>
            <View>
              <Text style={styles.genderText}>{gender} - {age}</Text>
            </View>
            <View>
              <Text style={styles.schoolText}>{major} - {year} </Text>
            </View>
            <View>
              <Text style={styles.text}>{bio} </Text>
            </View>
          </View>
          <View style={styles.tagStyles}>
            {
              tags.map(tag => {
                return (
                  <View style={styles.tagWrapper}>
                    <Text> {tag} </Text>
                  </View>
                )
              })
            }
          </View>
        </View>
    )
  }
}

class NoMoreCards extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text style={styles.noMoreCardsText}>No more people</Text>
      </View>
    )
  }
}

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      numCards: 0,
      outOfProfiles: false,   // backend
      notif: false,
    };
    props.navigation.setParams({notif: this.state.notif});

  }

  static navigationOptions = ({navigation, navigationOptions}) => {
    var icon_name;
    if (navigation.getParam('notif', true))
    {
      icon_name = "comment-alert"
    }
    else {
      icon_name = "comment"
    }
    return {
      headerTitle: <Logo width={165} style={styles.headerLogo}/>,
      headerLeft: (
        <TouchableOpacity
          style={{padding: 10}}
          onPress={navigation.toggleDrawer}>
        <Icon
          name="bars"
          color="#fff"
          size={25}/>
        </TouchableOpacity>
      ),
      headerRight: (
        <TouchableOpacity
          style={{padding: 10}}
          onPress={() => navigation.navigate("Chat_List")}>
          <Icon2
            name={icon_name}
            color="#fff"
            size={25} />
        </TouchableOpacity>
      ),
      headerStyle: {
        backgroundColor: '#2b5876',
        width: '100%',
      },
    }
  };

  componentDidMount() {

    // add navigation event
    const didFocus = this.props.navigation.addListener(
      'didFocus',
      () => {
        this.getProfiles();

        // socket events
        if (global.socket) {
          global.socket.on('match', (msg) => {
            console.log("MATCH");
            console.log(JSON.stringify(msg));

            Alert.alert('You got a match!', '', [
              {
                text: 'Back', onPress: () => {}, style: 'cancel'
              },
              {
                text: 'See Match', onPress: () => {this.props.navigation.navigate('Chat_List')}
              }
            ])
          });
        }
      }
    );
  }

  componentDidUpdate(oldProps, oldState) {

    console.log("UPDATE");
    if (this.state.numCards === 0 && !this.state.outOfProfiles) {
      this.getProfiles();
    }
  }

  getProfiles() {
    profilesServices.getNextProfile(global.user._id, 5).then((res) => {
      // add cards
      this.setState({
        cards: res.data.data,
        numCards: res.data.data.length,
        outOfProfiles: res.data.data.length === 0 // if no profiles came, out of profiles
      });

    }).catch((err) => {
       console.log("ERROR: Cannot get profile");

      Alert.alert(
        'Error: cannot connect to server',
        err,
        [
          {text: 'OK'},
        ],
        {cancelable: false},
      );

    });
  }

  handleSwipe (card, like) {
    this.setState({
      numCards: this.state.numCards - 1
    });

    // create swipe
    matchesServices.createSwipe(global.user._id, card.user_id, like)
      .then((res) => {
      }).catch((err) => {
        console.log("ERROR: Cannot get profile");

        Alert.alert(
          'Error: cannot swipe',
          err,
          [
            {text: 'OK'},
          ],
          {cancelable: false},
        );
      });
  }

  render() {
    return (
      <SwipeCards
        cards={this.state.cards}
        stack={true}
        showYup={true}
        yupText='Like!'
        showNope={true}
        noText='No!'
        onClickHandler={() => {}}
        renderCard={(cardData) => <Card {...cardData} handleSwipe={this.handleSwipe.bind(this)} card={cardData}/>}
        renderNoMoreCards={() => <NoMoreCards />}

        handleYup={(card) => this.handleSwipe(card, true)}
        handleNope={(card) => this.handleSwipe(card, false)}
      />
    )
  }
}


const styles = StyleSheet.create({
    headerLogo: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    card: {
      flex: 1,
      width: Dimensions.get('window').width-50,
      height: Dimensions.get('window').height-100,
      borderColor: 'grey',
      backgroundColor: 'white',
      borderWidth: 1,
      elevation: 5,
      borderRadius: 20,
    },
    noMoreCardsText: {
        fontSize: 22,
        fontFamily: 'Avenir'
    },
    thumbnail: {
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      height: '40%',
      overflow: Platform.OS == "ios" ? "hidden": "visible"
    },
    nameText: {
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'Avenir',
        paddingBottom: 3,
        width: 400,
    },
    genderText: {
        fontSize: 24,
        fontFamily: 'Avenir',
    },
    schoolText: {
      fontSize: 20,
      fontFamily: 'Avenir',
    },
    text: {
      paddingTop: 15,
      fontSize: 20,
      fontFamily: 'Avenir',
    },
    tagStyles: {
      justifyContent: 'center',
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      padding: 20
    },
    infoText: {
      flexDirection: 'column',
      padding: 10
    },
    buttonSpacing: {
      flex: 1,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    buttonStyles: {
      borderColor: 'grey',
    },
    tagWrapper: {
      padding: 10,
      margin: 5,
      borderWidth: 2,
      borderRadius: 6,
      borderColor: '#2b5876',
    }

});
