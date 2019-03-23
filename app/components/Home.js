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

/*
export default class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            modalVisible: false
        };
    }
    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    render() {
        return(
            <View style = {styles.wrapper}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.modalVisible}>
                <View style={styles.box}>
            <View>
              <Text>MATCHHHHH!</Text>

              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>Close</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
                <Image style={styles.profilePic} source={require('../img/test.png')}/>
                <Text style={styles.title}> Maxine Lien </Text>
                <Button
                    onPress={()=>this.setModalVisible(true)}
                    title="Like"/>

            </View>
        );
    }
};*/

class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <View style={styles.card}>
          <Image style={styles.thumbnail} source={{uri: this.props.image}} />
          <Text style={styles.text}>{this.props.name}</Text>
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
        <Text style={styles.noMoreCardsText}>No more cards</Text>
      </View>
    )
  }
}

const cards = [
    {name: 'Maxine Lien', image: 'https://media.giphy.com/media/GfXFVHUzjlbOg/giphy.gif'},
    {name: 'Pranav Thirunavukkarasu', image: 'https://media.giphy.com/media/irTuv1L1T34TC/giphy.gif'},
    {name: 'Cynthia Phan', image: 'https://media.giphy.com/media/LkLL0HJerdXMI/giphy.gif'},
    {name: 'Brendan Ahdoot', image: 'https://media4.giphy.com/media/6csVEPEmHWhWg/200.gif'}
]

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        cards: cards,
        outOfCards: false
    };
  }

  handleYup (card) {
    console.log(`Yup for ${card.text}`)
  }
  handleNope (card) {
    console.log(`Nope for ${card.text}`)
  }
  render() {
    // If you want a stack of cards instead of one-per-one view, activate stack mode
    // stack={true}
    return (
      <SwipeCards
        cards={this.state.cards}
        renderCard={(cardData) => <Card {...cardData} />}
        renderNoMoreCards={() => <NoMoreCards />}

        handleYup={this.handleYup}
        handleNope={this.handleNope}
      />
    )
  }
}


const styles = StyleSheet.create({

    card: {
    justifyContent: 'center',
    alignItems: 'center',
    height:'50%'
  },
  noMoreCardsText: {
    fontSize: 22,
},
thumbnail: {
    width: 500,
    height: '100%',
  },
  text: {
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10
  },
  wrapper: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center'

  },
  profilePic:{
      //flex: 1,
      //width: 400,
      display: 'flex',
      height: '50%',
      resizeMode: 'contain',
  },
  title: {
      paddingTop: 10,
      fontSize: 36,
      color: '#6a7a94',
      fontFamily: 'Avenir',
      letterSpacing: 8
  },
  box: {
      width: "85%",
      justifyContent: 'center',
      alignItems:'center',
      backgroundColor: '#6a7a94',
      paddingLeft:40,
      paddingRight:40,
      paddingTop: 70,
      paddingBottom: 70,
      borderRadius: 30
  },
  header: {
      fontSize: 24,
      marginBottom: 60,
      color: '#6a7a94',
      fontWeight: 'bold',
      fontFamily: 'Avenir',

  },
  textInput: {
      alignSelf: 'stretch',
      padding: 16,
      marginBottom: 20,
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: '#6a7a94',
      borderRadius: 30,
      fontFamily: 'Avenir',

  },
  button: {
      alignSelf: 'stretch',
      backgroundColor: '#6a7a94',
      padding: 20,
      alignItems: 'center',
      borderRadius: 30
  }
});
