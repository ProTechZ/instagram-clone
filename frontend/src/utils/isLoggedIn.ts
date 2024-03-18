import axios from 'axios';

const isLoggedIn = () => {
  const results = axios.get('http://localhost/isLoggedIn').then().catch();
  // console.log( results.data.logged_in)
  // return results.data.logged_in;
  return false;
};

export default isLoggedIn;