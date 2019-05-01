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

// get profile from user_id
export async function getProfile(user_id) {

  let path = "/app/v1/profiles/getByUserId?user_id=" + user_id;

  try {
    return await Axios.get(path);
  } catch(err) {
    console.log("Profile Get Error");
    console.log(JSON.stringify(err));

    return {
      status: 408,
      data: {
        error: 'Cannot connect to server'
      }
    };
  }
}

// get next profile for swiping
export async function getNextProfile(user_id, n) {
  
  let path = '/app/v1/profiles/next'
    + '?user_id=' + user_id
    + '&n=' + n;

  try{
    return await Axios.get(path);
  } catch(err) {
    console.log("Next Profile Error");
    console.log(JSON.stringify(err));

    return {
      status: 408,
      data: {
        error: 'Cannot connect to server'
      }
    };
  }
}
