import axios from 'axios';

const logout = () => {
  axios
    .post('http://localhost/account/logout', {})
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.error(err.response.data);
    });
};

export default logout;