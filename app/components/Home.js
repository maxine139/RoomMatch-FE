import React, {Component} from 'react';
import {StyleSheet,
        Image,
        Text,
        View,
  TouchableOpacity,
  Alert
} from 'react-native';
import SwipeCards from 'react-native-swipe-cards';
import Logo from '../img/roommatch_logo.svg';
import Icon from 'react-native-vector-icons/FontAwesome5'
import * as profilesServices from '../services/profiles';
import * as matchesServices from '../services/matches';

const cards = [
    {name: 'Gimme my shoe Lyle',
        image: 'https://media.giphy.com/media/xUOxfbuK9qc61NGiaI/giphy.gif',
        bio: 'I am the bestest boy.',
        age: 19,
        gender: 'Male',
        major: 'Business',
        year: 'Sophomore',
        tags: ['Introvert', 'Messy', 'Drinks Alcohol', 'Smokes Weed', 'Night Owl']
    },
    {name: 'Maxine Lien',
        image: 'https://media.giphy.com/media/GfXFVHUzjlbOg/giphy.gif',
        bio: 'insert catchy bio here',
        age: 21,
        gender: 'Female',
        major: 'Computer Science',
        year: 'Senior',
        tags: ['Extrovert', 'Clean/Tidy', 'Drinks Alcohol', 'Night Owl']
    },
    {name: 'Pranav Thirunavukkarasu',
        image: 'https://media.giphy.com/media/irTuv1L1T34TC/giphy.gif',
        bio: 'im a cool bitch and youre not',
        age: 21,
        gender: 'Male',
        major: 'Computer Science',
        year: 'Senior',
        tags: ['Introvert', 'Clean/Tidy', 'Drinks Alcohol', 'Smokes Weed', 'Night Owl']
    },
    {name: 'Cynthia Phan',
        image: 'https://scontent.fsac1-1.fna.fbcdn.net/v/t1.0-9/15697302_1424423867576258_3064531773151871852_n.jpg?_nc_cat=108&_nc_ht=scontent.fsac1-1.fna&oh=9e33b206afa29cb89ca34ca1e5e0b63a&oe=5D338AC2',
        bio: 'I like to keep things clean. I also like to cook. I want someone that is also clean and is respectful.',
        age: 21,
        gender: 'Female',
        major: 'Computer Science',
        year: 'Senior',
        tags: ['Introvert', 'Clean/Tidy', 'Drinks Alcohol', 'Night Owl']
    },
    {name: 'Brendan Ahdoot',
        image: 'https://scontent.fsac1-1.fna.fbcdn.net/v/t1.0-9/12670744_970236463012533_8314313561040706742_n.jpg?_nc_cat=111&_nc_ht=scontent.fsac1-1.fna&oh=5eb7fa2455e2351d5315490099cf1946&oe=5D2E57EC',
        bio: 'I like to game and I guess I would consider myself a bit on the messier side. If you dont mind those, room with me!',
        age: 21,
        gender: 'Male',
        major: 'Computer Science',
        year: 'Senior',
        tags: ['Introvert', 'Messy', 'Drinks Alcohol','Night Owl']

    }
]

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: cards
    }
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
          <Image style={styles.thumbnail} source={{uri: this.props.image}} />
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
          <View style={styles.buttonSpacing}>
            <View style={{width: 50, height: 50, justifyContent: 'center', alignItems:'center', marginRight: 40, elevation: 3}}>
              <Icon onPress={() => this.handleNope}
              name="times"
              color="red"
              size={50}
              />
            </View>
            <View style={{width: 50, height: 50, justifyContent: 'center', alignItems:'center', marginLeft:40, elevation: 3}}>
              <Icon onPress={() => this.handleYup}
              name="check"
              color="green"
              size={50}
              />
            </View>
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
      outOfProfiles: false   // backend
    };
  }

  static navigationOptions = ({navigation, navigationOptions}) => {
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
          <Icon
            name="comment-alt"
            color="#fff"
            size={25}/>
        </TouchableOpacity>
      ),
      headerStyle: {
        backgroundColor: '#2b5876',
        width: '100%',
      },
    }
  };

  componentDidMount() {
    this.getProfiles();
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
        showYup={false}
        showNope={false}
        renderCard={(cardData) => <Card {...cardData} />}
        renderNoMoreCards={() => <NoMoreCards />}

        handleYup={(card) => this.handleSwipe(card, true)}
        handleNope={(card) => this.handleSwipe(card, false)}
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
      height: '100%',
      borderRadius: 5,
      overflow: 'hidden',
      borderColor: 'grey',
      backgroundColor: 'white',
      borderWidth: 1,
      elevation: 1,
    },
    noMoreCardsText: {
        fontSize: 22,
        fontFamily: 'Avenir'
    },
    thumbnail: {
        height: 300,
        width: '100%',
    },
    nameText: {
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'Avenir',
        paddingBottom: 3,
    },
    genderText: {
        fontSize: 24,
        fontFamily: 'Avenir',
    },
    schoolText: {
      fontSize: 20,
      //fontStyle: 'italic',
      fontFamily: 'Avenir',
    },
    text: {
      paddingTop: 15,
      fontSize: 20,
      fontFamily: 'Avenir',
    },
    wrapper: {
      flex: 1,
      width:'100%',
      backgroundColor: '#fff',
      alignItems: 'center'
    },
    tagStyles: {
      //flex: 1,
      justifyContent: 'center',
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      padding: 20
    },
    infoText: {
      //alignItems: 'flex-start',
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
    roundify: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    tagWrapper: {
      padding: 10,
      margin: 5,
      borderWidth: 1,
      borderRadius: 6,
      backgroundColor: '#989898',
      borderColor: '#989898'
    }

});
