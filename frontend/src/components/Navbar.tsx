import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';

const Navbar = () => {
  const logout = async () => {
    const results = await axios.post('http://localhost:80/account/logout');
  };

  return (
    <div>
      <Link to="/">
        <button type="button">Home</button>
      </Link>

      <Link to="/signup">
        <button type="button">Sign Up</button>
      </Link>

      <Link to="/login">
        <button type="button">Log In</button>
      </Link>

      <button type="button" onChange={logout}>
        Log Out
      </button>
    </div>
  );
};

export default Navbar;
