/*
 * RoomMatch
 * File: Backend connections for Users
 *       Powered by Axios
 * */

// import axios instanceA
import Axios from './axios';

// Create User 
// NOTE: Only using the email to make users, no Passwd storing
export const createUser = (email) => {
  let body = {
    email: email
  };

  // Request
  Axios.post('/app/v1/users/create', body)
    .then((res) => {
      if(res.status === 200) {
        console.log("USER CREATE SUCCESS");
        console.log(JSON.stringify(res.data.data));
      }else{
        console.log("USER CREATE ERROR - " + res.status);
        console.log(res.data.error);
      }
    })
    .catch((err) => {
      console.log("USER CREATE ERROR");
      console.log(JSON.stringify(err));
    });
};
