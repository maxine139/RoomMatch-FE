import React, {Component} from 'react';
var t = require('tcomb-form-native');
import {StyleSheet,
        Platform,
        Image,
        Modal,
        Text,
        View,
        ScrollView,
        TextInput,
        TouchableOpacity,
        TouchableHighlight,
        CameraRoll,
        Alert
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

export default class Edit_Profile extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        photos: [],
        modalVisible: false
      };
  }

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
    if(Platform.OS==='android')
    {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message:
            'Roommatch would like to access your camera ' +
            'so you can upload a profile picture.',
            buttonNegative: 'No',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          this.openPhotos(true)
          console.log('Camera access ALLOWED');
        } else {
          console.log('Camera access DENIED');
        }
      } catch (err) {
        console.warn(err);
      }
    }
    else if (Platform.OS==='ios')
    {
      this.openPhotos(true)
    }
  }

  openPhotos(visible) {
    this.setState({modalVisible: visible});
    CameraRoll.getPhotos({
     first: 20,
     assetType: 'Photos',
   })
   .then(r => {
     this.setState({ photos: r.edges });
   })
   .catch((err) => {
      //Error Loading Images
   });
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
          <Form
            ref="form"
            type={Profile}
            options={options}
          />
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
              <ScrollView style = {styles.container}>
                {this.state.photos.map((p, i) => {
                  return (
                    <TouchableOpacity onPress={() => {
                      this.setState({modalVisible: false});
                    }}>
                      <Image
                        key={i}
                        style={{
                          width: 300,
                          height: 100,
                        }}
                        source={{ uri: p.node.image.uri }}
                      />
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          </Modal>
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
  wrapper: {
    flex: 1,
  },
  cancel: {
    alignSelf: 'flex-end',
    color: '#fff'
  },
  container: {
    flex: 1,
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#fff'
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
