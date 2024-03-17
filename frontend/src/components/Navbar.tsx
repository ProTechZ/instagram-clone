import { Link } from 'react-router-dom';
import axios from 'axios';
import isLoggedIn from '../utils/isLoggedIn';

const Navbar = () => {
  const logout = async () => {
    try {
      const results = await axios.post('http://localhost/account/logout', {});

      console.log(results);
    } catch (err: any) {
      console.error(err.response.data);
    }
  };


  return (
    <div>
      <Link to="/">
        <button type="button">Home</button>
      </Link>

      {/* {!!isLoggedIn() ? ( */}
        <button type="button" onClick={logout}>
          Log Out
        </button>
      {/* ) : ( */}
        <div>
          <Link to="/signup">
            <button type="button">Sign Up</button>
          </Link>

          <Link to="/login">
            <button type="button">Log In</button>
          </Link>
        </div>
      {/* )} */}
    
    <button onClick={() => {console.log(!!isLoggedIn())}}>hi</button>
    </div>
  );
};

export default Navbar;
