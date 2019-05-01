import React, {Component} from 'react';
var t = require('tcomb-form-native');
import {StyleSheet,
        Image,
        Modal,
        Text,
        View,
        ScrollView,
        TextInput,
        TouchableOpacity,
        TouchableHighlight,
        CameraRoll,
        Alert,
        PermissionsAndroid,
        Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { TagSelect } from 'react-native-tag-select';
import theme from '../theme';
import * as profilesServices from '../services/profiles.js';

var Form = t.form.Form;

var Gender = t.enums({
  M: 'Male',
  F: 'Female'
});

var Class = t.enums({
    'F': 'Freshman',
    'So': 'Sophomore',
    'J': 'Junior',
    'Sr': 'Senior',
    'G': 'Graduate'
});

var Campus = t.enums({
    'On': 'On-Campus',
    'Off': 'Off-Campus'
})

const tags=['Extrovert', 'Introvert', 'Clean/Tidy', 'Messy', 'Drinks Alcohol', 'Smokes Weed', 'Smokes cigs', 'Night Owl', 'Early Bird']

// Form fields
var Profile = t.struct({
  'First Name': t.String,               // a required string
  'Last Name': t.maybe(t.String),       // an optional string
  Age: t.Number,                        // a required number
  gender: Gender,
  class: Class,
  major: t.String,
  'Im looking for housing...': Campus,
  'Short Bio': t.String
});

var options = {
    fields: {
        'Short Bio': {
            multiline: true
        }
    }
};

export default class Edit_Profile extends Component {
  constructor(props){
      super(props);
      this.state = {
        photos: [],
        modalVisible: false,
        formDefaultValues: {},
        selectedUri: 'https://support.plymouth.edu/kb_images/Yammer/default.jpeg'
      };
  }

  componentDidMount() {
    // update form values
    this.updateFormDefaultValues();

    // add navigation listener
    const didFocusSubscription = this.props.navigation.addListener(
      'didFocus',
      payload => {
        this.updateFormDefaultValues();
      }
    );
  }

  updateFormDefaultValues = () => {
    profilesServices.getProfile(global.user._id).then((res) => {
      const profile = res.data.data;

      if (profile === null) {
        // no profile yet
        return;
      }

      const defaultVal = {
        'First Name': profile.firstname,
        'Last Name': profile.lastname,
        'Age': Number(profile.age),
        'gender': profile.gender,
        'class': profile.class,
        'major': profile.major,
        'Im looking for housing...': profile.location,
        'Short Bio': profile.bio
      };

      this.setState({
        formDefaultValues: defaultVal
      });
    }).catch((err) => {
      console.log("ERROR: Cannot get profile");

      Alert.alert(
        'Error: cannot get profile',
        err,
        [
          {text: 'OK'},
        ],
        {cancelable: false},
      );
    });
  };

  handlePress(){
    const tagRef = this.tag.itemsSelected;
    const value = this.refs.form.getValue();

    if (value) {
      // backend call

      // collect tags
      let tags = [];
      for (let i = 0; i < tagRef.length; i ++) {
        tags.push(tagRef[i]["label"]);
      }

      const profile = {
        user_id: global.user._id,
        firstname: value["First Name"] || "",
        lastname: value["Last Name"] || "",
        age: value["Age"] || "",
        gender: value["gender"] || "",
        class: value["class"] || "",
        major: value["major"] || "",
        location: value["Im looking for housing..."] || "",
        tags: tags,
        image: "https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1" || "",
        bio: value["Short Bio"] || ""
      };

      profilesServices.createProfile(profile)
        .then((res) => {
          console.log("SUCCESS: Profile created");
          console.log(JSON.stringify(res));

          const success = res.data.success;
          if (success) {
            //succes
            this.props.navigation.navigate("Home");
          } else {
            //failure
            const err = this.res.error;
            throw err;
          }
        }).catch((err) => {
          console.log("ERROR: Cannot create profile");

          Alert.alert(
            'Error: cannot create profile',
            err,
            [
              {text: 'OK'},
            ],
            {cancelable: false},
          );
        });
    }
  }

  async requestCameraPermission() {
    if (Platform.OS === 'ios') {
      this.openPhotos(true);
    }
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          'title': 'Roommatch Camera Permission',
          'message': 'Roommatch needs access to your camera ' +
                     'so you can upload a profile pic.'
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("GRANTED")
        this.openPhotos(true);
      } else {
        console.log("REJECC")
      }
    } catch (err) {
      console.warn(err)
    }
  }

  openPhotos(visible) {
    this.setState({modalVisible: visible});
    CameraRoll.getPhotos({
     first: 20,
     assetType: 'Photos',
   })
   .then(assets => {
     const images = assets.edges.map((asset) => asset.node.image);
     this.setState({ photos: images });
   })
   .catch((err) => {
      //Error Loading Images
   });
  }

  selectImage(uri) {
    this.setState({modalVisible: false});
    this.setState({selectedUri: uri})
  }

  static navigationOptions = ({navigation, navigationOptions}) => {
    return {
      headerTitle: 'Profile',
      headerStyle: {
        backgroundColor: '#2b5876',
      },
    }
  }

  render() {
    const data = [
      { id: 1, label: 'Extrovert' },
      { id: 2, label: 'Introvert' },
      { id: 3, label: 'Clean/Tidy' },
      { id: 4, label: 'Messy' },
      { id: 5, label: 'Drinks Alcohol' },
      { id: 6, label: 'Smokes Weed' },
      { id: 7, label: 'Smokes cigs' },
      { id: 8, label: 'Night Owl' },
      { id: 9, label: 'Early Bird' }
    ];

    return (
      <View style={styles.wrapper}>
        <LinearGradient colors={['#2b5876', '#4e4376']}
        locations={[0,0.8]} style={styles.header}>
          <Text style={styles.text}> Profile </Text>
        </LinearGradient>
        <ScrollView style={styles.container}>
          {/* display */}
          <Image style={{width: 150, height: 150, alignSelf: 'center', marginBottom: 10}} source={{uri: this.state.selectedUri}}/>
          <TouchableHighlight style={styles.upload_button} onPress={() => this.requestCameraPermission()}>
            <Text style={styles.text}> Upload Picture </Text>
          </TouchableHighlight>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
          }}>
            <View style = {styles.wrapper}>
              <LinearGradient colors={['#2b5876', '#4e4376']}
              locations={[0,0.8]} style={styles.header}>
                <Text style={styles.text}> Choose Profile Photo </Text>
                <Text
                  style={styles.cancel}
                  onPress={() => {this.setState({modalVisible: false});}}>
                    x
                </Text>
              </LinearGradient>
              <ScrollView style={styles.container}>
                <View style={styles.imageGrid}>
                  { this.state.photos.map((image) =>
                    <TouchableOpacity onPress={() => this.selectImage(image.uri)}>
                    <Image style={styles.image} source={{ uri: image.uri }} />
                    </TouchableOpacity>) }
                </View>
              </ScrollView>
            </View>
          </Modal>
          <Form
            ref="form"
            type={Profile}
            options={options}
            value={this.state.formDefaultValues}/>
          <Text style={{fontSize: 18, fontWeight: 'bold', padding: 10}}>Select Tags</Text>
          <TagSelect
            data={data}
            ref={(tag) => {
              this.tag = tag;
            }}
          />
          <TouchableHighlight style={styles.button} onPress={() => this.handlePress()} underlayColor='#99d9f4'>
            <Text style={styles.text}>Save</Text>
          </TouchableHighlight>
        </ScrollView>
      </View>
    );
  }


};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#fff'
  },
  imageGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  image: {
    width: 150,
    height: 150,
    margin: 10,
  },
  wrapper: {
    flex: 1,
  },
  cancel: {
    alignSelf: 'flex-end',
    color: '#fff'
  },
  header: {
    backgroundColor: '#6a7a94',
    justifyContent: 'flex-end',
    padding: 10,
    height: '10%',
  },
  text: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  button: {
    alignSelf: 'stretch',
    backgroundColor: theme.primaryColor,
    height: 48,
    marginBottom: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  upload_button: {
    alignSelf: 'center',
    padding: 10,
    backgroundColor: theme.primaryColor,
    height: 48,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  }
})
