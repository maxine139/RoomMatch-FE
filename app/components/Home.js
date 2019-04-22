import React, {Component} from 'react';
import {StyleSheet,
        Image,
        Text,
        View,
} from 'react-native';
import SwipeCards from 'react-native-swipe-cards';
import Logo from '../img/roommatch_logo.svg';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { TagSelect } from 'react-native-tag-select';

class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const data1 = [
      { id: 1, label: 'Introvert' },
      { id: 2, label: 'Clean/Tidy' },
      { id: 3, label: 'Drinks Alcohol' },
    ];

    const data2 = [
      { id: 4, label: 'Smokes Weed' },
      { id: 5, label: 'Night Owl' },
    ];

    return (
        <View style={styles.card}>
          <Image style={styles.thumbnail} source={{uri: this.props.image}} />
          <View style={styles.infoText}>
            <Text>
              <Text style={styles.nameText}> {this.props.name}, {this.props.age}</Text> {'\n'}
              <Text style={styles.schoolText}> {this.props.major} - {this.props.year} </Text>{'\n'}
              <Text style={styles.text}> {this.props.bio} </Text>
            </Text>
          </View>
          <View style={styles.tagStyles}>
            <TagSelect
              data={data1}
              ref={(tag) => {
                this.tag = tag;
              }}
             />
            <TagSelect
              data={data2}
              ref={(tag) => {
                this.tag = tag;
              }}
            />
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

const cards = [
    {name: 'Gimme my shoe Lyle',
        image: 'https://media.giphy.com/media/xUOxfbuK9qc61NGiaI/giphy.gif',
        bio: 'I am the bestest boy.',
        age: 19,
        major: 'Business',
        year: 'Sophomore',
        tags: ['Introvert', 'Messy', 'Drinks Alcohol', 'Smokes Weed', 'Night Owl']
    },
    {name: 'Maxine Lien',
        image: 'https://media.giphy.com/media/GfXFVHUzjlbOg/giphy.gif',
        bio: 'insert catchy bio here',
        age: 21,
        major: 'Computer Science',
        year: 'Senior',
        tags: ['Extrovert', 'Clean/Tidy', 'Drinks Alcohol', 'Night Owl']
    },
    {name: 'Pranav Thirunavukkarasu',
        image: 'https://media.giphy.com/media/irTuv1L1T34TC/giphy.gif',
        bio: 'im a cool bitch and youre not',
        age: 21,
        major: 'Computer Science',
        year: 'Senior',
        tags: ['Introvert', 'Clean/Tidy', 'Drinks Alcohol', 'Smokes Weed', 'Night Owl']
    },
    {name: 'Cynthia Phan',
        image: 'https://media.giphy.com/media/LkLL0HJerdXMI/giphy.gif',
        bio: 'if you messy and dirty i keel you while you sleep',
        age: 21,
        major: 'Computer Science',
        year: 'Senior',
        tags: ['Introvert', 'Clean/Tidy', 'Drinks Alcohol', 'Night Owl']
    },
    {name: 'Brendan Ahdoot',
        image: 'https://media4.giphy.com/media/6csVEPEmHWhWg/200.gif',
        bio: 'dis how you spell my name: blennndin addot c:',
        age: 21,
        major: 'Computer Science',
        year: 'Senior',
        tags: ['Introvert', 'Messy', 'Drinks Alcohol','Night Owl']

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
        width: '100%',
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
        marginTop: 0,
        paddingTop: 0,
        //alignItems: 'center',
        height:'100%',
        width: '100%',
        backgroundColor: 'white',
        borderColor: 'grey',
        borderRadius: 10,
        borderWidth: 2,
        elevation: 1,
    },
    noMoreCardsText: {
        fontSize: 22,
        fontFamily: 'Avenir'
    },
    thumbnail: {
        height: 300,
        width: undefined,
        aspectRatio: 1.5,
        borderTopWidth: 3,
        borderBottomWidth: 3,
        borderColor: 'red',
        overflow: 'hidden'
    },
    nameText: {
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'Avenir',
    },
    schoolText: {
      fontSize: 20,
      fontStyle: 'italic',
      fontFamily: 'Avenir',
    },
    text: {
      fontSize: 20,
      fontFamily: 'Avenir',
    },
    wrapper: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center'
    },
    tagStyles: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center'
    },
    infoText: {
      flex: 1,
      paddingLeft: 25,
      paddingRight: 20,
      alignItems: 'flex-start',
      flexDirection: 'row',
    },
});
