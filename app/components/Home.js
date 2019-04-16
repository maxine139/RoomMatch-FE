import React, {Component} from 'react';
import {Platform,
        Modal,
        Button,
        StyleSheet,
        Image,
        Text,
        View,
        TextInput,
        KeyboardAvoidingView,
        TouchableOpacity,
        TouchableHighlight,
        AsyncStorage
} from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import SwipeCards from 'react-native-swipe-cards';
import Logo from '../img/roommatch_logo.svg';
import Icon from 'react-native-vector-icons/FontAwesome5'

class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <View style={styles.card}>
          <Image style={styles.thumbnail} source={{uri: this.props.image}} />
          <Text>
              <Text style={styles.nameText}>{this.props.name}</Text> {'\n'}
              <Text style={styles.text}> {this.props.profile} </Text>{'\n'}
              <Text style={styles.text}> {this.props.bio} </Text>
          </Text>
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

const cards = [
  {
    name: 'Gimme my shoe Lyle',
    image: 'https://media.giphy.com/media/xUOxfbuK9qc61NGiaI/giphy.gif',
    profile: 'walks bearfoot',
    bio: 'i need me a smexy roommate. a dtf girl. down to fart'
  },
    {name: 'Maxine Lien',
        image: 'https://media.giphy.com/media/GfXFVHUzjlbOg/giphy.gif',
        profile: 'profile things here... blah blah blah',
        bio: 'insert catchy bio here'
    },
    {name: 'Pranav Thirunavukkarasu',
        image: 'https://media.giphy.com/media/irTuv1L1T34TC/giphy.gif',
        profile: 'loves crypto shit. high key nerd',
        bio: 'im a cool bitch and youre not',
    },
    {name: 'Cynthia Phan',
        image: 'https://media.giphy.com/media/LkLL0HJerdXMI/giphy.gif',
        profile: 'neat clean',
        bio: 'if you messy and dirty i keel you while you sleep'
    },
    {name: 'Brendan Ahdoot',
        image: 'https://media4.giphy.com/media/6csVEPEmHWhWg/200.gif',
        profile: 'loves paintball',
        bio: 'dis how you spell my name: blennndin addot c:'
    }
]

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        cards: cards,
        outOfCards: false
    };
  }

  static navigationOptions = ({navigation, navigationOptions}) => {
    return {
      headerTitle: <Logo width={165} style={styles.headerLogo}/>,
      headerLeft: (
        <Icon onPress = {navigation.toggleDrawer}
        name="bars"
        color="#fff"
        size={25}/>
      ),
      headerRight: (
        <Icon onPress={() => navigation.navigate("Chat_Main")}
        name="comment-alt"
        color="#fff"
        size={25}/>
      ),
      headerStyle: {
        backgroundColor: '#2b5876',
        //height: '30%',
        //width: '100%',
        marginLeft: 10,
        marginRight: 10
      },
    }

  };

  handleYup (card) {
    console.log(`Yup for ${card.name}`)
  }
  handleNope (card) {
    console.log(`Nope for ${card.name}`)
  }
  render() {
    return (
      <SwipeCards
        style={styles.wrapper}
        cards={this.state.cards}
        showYup={false}
        showNope={false}
        renderCard={(cardData) => <Card {...cardData} />}
        renderNoMoreCards={() => <NoMoreCards />}

        handleYup={this.handleYup}
        handleNope={this.handleNope}
      />
    )
  }
}


const styles = StyleSheet.create({
    headerLogo: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    card: {
        justifyContent: 'center',
        alignItems: 'center',
        height:'60%',
        width: '100%',
        backgroundColor: '#FF89FF',
    },
    noMoreCardsText: {
        fontSize: 22,
        fontFamily: 'Avenir'
    },
    thumbnail: {
        width: '100%',
        height: '100%',
    },
    nameText: {
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'Avenir',
    },
    text: {
        fontSize: 20,
        paddingTop: 10,
        paddingBottom: 10,
        fontFamily: 'Avenir'
    },
    wrapper: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center'
    },
});
