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
    like: like
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
