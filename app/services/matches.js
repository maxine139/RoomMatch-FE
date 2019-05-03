/*
 * RoomMatch
 * File: Backend connections for Matches
 *       Powered by Axios
 * */

// import axios instanceA
import Axios from './axios';

export async function createSwipe(from_user_id, to_user_id, like) {
  let body = {
    from_user_id: from_user_id,
    to_user_id: to_user_id,
    like: like.toString()
  };
  
  let path = '/app/v1/matches/create';

  try {
    return await Axios.post(path, body);
  } catch(err) {
    console.log("Swipe Create ERROR");
    console.log(JSON.stringify(err));

    return {
      status: 408,
      data: {
        error: 'Cannot connect to server'
      }
    }
  }
}

export async function getMatches(user_id) {
  let path = '/app/v1/matches/get?user_id=' + user_id;

  try {
    return await Axios.get(path);
  } catch(err) {
    console.log("Get Matches ERROR");
    console.log(JSON.stringify(err));

    return {
      status: 408,
      data: {
        error: 'Cannot connect to server'
      }
    }
  }

}
