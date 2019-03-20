/*
 * RoomMatch
 * File: Initialize axios
 * */

import Axios from 'axios';

// Init axios
const instance = Axios.create({
  baseURL: 'http://18.222.255.4:3000',
  timeout: 1000
});

export default instance;
