import axios from 'axios';

const isLoggedIn = async () => {
  const results = await axios.get('http://localhost/isLoggedIn');
  // console.log( results.data.logged_in)
  // return results.data.logged_in;
  return false;
};

export default isLoggedIn;