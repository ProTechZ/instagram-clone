import axios from 'axios';

const isLoggedIn = () => {
  const results = axios.get('http://localhost/isLoggedIn').then().catch();
  // console.log( results.data.loggedIn)
  // return results.data.loggedIn;
  return false;
};

export default isLoggedIn;
