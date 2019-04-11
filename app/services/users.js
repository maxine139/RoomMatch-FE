/*
 * RoomMatch
 * File: Backend connections for Users
 *       Powered by Axios
 * */

// import axios instanceA
import Axios from './axios';

// Create User 
// NOTE: Only using the email to make users, no Passwd storing
export async function createUser(email) {
  let body = {
    email: email
  };

  let path = '/app/v1/users/create';

  try {
    return await Axios.post(path, body);
  } catch(err) {
    console.log("USER CREATE ERROR");
    console.log(JSON.stringify(err));
  }
};

export async function authUser(email) {
  
  let path = '/app/v1/users/auth?email=' + email;

  try {
    return await Axios.get(path);
  } catch(err) {
    console.log("USER AUTH ERROR");
    console.log(JSON.stringify(err));
  }
}
