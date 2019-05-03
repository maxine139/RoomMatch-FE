/*
 * RoomMatch
 * File: Backend connections for Users
 *       Powered by Axios
 * */

// import axios instanceA
import { Platform } from 'react-native';
import Axios from './axios';
import FormData from 'form-data';

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

export async function getManyProfiles(user_ids) {
  let path = "/app/v1/profiles/getMany?user_ids=";

  for (let i = 0; i < user_ids.length; i ++) {
    path += user_ids[i];
    if (i != user_ids.length - 1) {
      path += ',';
    }
  }

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

export async function uploadImage(image) {
	if (!image) {
		return {
			data: {
				success: true,
				data: null
			}
		};
	}

  let path = '/app/v1/profiles/images';

  // FormData
  let form = new FormData();
  form.append('image', {
    name: image.name,
    type: image.type,
    uri: Platform.OS === "android" ? image.uri : image.uri.replace("file://", "")
  });

	let headers =  {
		'accept': 'application/json',
		'Accept-Language': 'en-US,en;q=0.8',
		'Content-Type': `multipart/form-data`,
  }

  try{
    return await Axios.post(path, form);
  } catch(err) {
    console.log("UPLOAD IMAGE Error");
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
