/*
 * RoomMatch
 * File: Backend connections for Users
 *       Powered by Axios
 * */

// import axios instanceA
import Axios from './axios';

// Create User 
// NOTE: Only using the email to make users, no Passwd storing

// Create Profile
export async function createProfile(profile) {
  console.log("PP");
  console.log(JSON.stringify(profile));
  let body = {
    user_id: profile.user_id.toString(),
    firstname: profile.firstname.toString(),
    lastname: profile.lastname.toString(),
    age: profile.age.toString(),
    gender: profile.gender.toString(),
    class: profile.class.toString(),
    major: profile.major.toString(),
    location: profile.location.toString(),
    tags: profile.tags.toString(),
    image: profile.image.toString(),
    bio: profile.bio.toString()
  };
  console.log("BBB");
  console.log(JSON.stringify(body));

  let path = '/app/v1/profiles/create';

  try {
    return await Axios.post(path, body);
  } catch(err) {
    console.log("PROFILE CREATE ERROR");
    console.log(JSON.stringify(err));

    return {
      status: 408,
      data: {
        error: 'Cannot connect to server'
      }
    }
  }
};
