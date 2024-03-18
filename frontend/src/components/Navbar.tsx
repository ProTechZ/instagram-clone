import { Link } from 'react-router-dom';
import axios from 'axios';
import isLoggedIn from '../utils/isLoggedIn';
import homeIcon from '../assets/home.svg';
import logoutIcon from '../assets/logout.svg';
import profileIcon from '../assets/profile.svg';

const logout = () => {
  console.log('hi');
  axios
    .post('http://localhost/account/logout', {})
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.error(err.response.data);
    });
};

const Navbar = () => {
  let nav;

  <Link to="/login">
    <button type="button" onClick={logout}>
      Log Out
    </button>
  </Link>;

  return (
    <div className="flex">
      <div>
        <h1
          style={{ WebkitTextStroke: '1px #F87171' }}
          className="tracking-widest font-bold text-white text-4xl p-8 pl-4 pb-12"
        >
          INSTAHUB
        </h1>
        <Link
          to="/"
          className="flex items-center border-y border-black w-full py-2 px-4 text-left"
        >
          <img src={homeIcon} alt="home icon" className="w-5 h-5" />
          <button className='text-lg pl-3' type="button">Home</button>
        </Link>
        
        <Link
          to="/"
          className="flex items-center border-black w-full py-2 px-4 text-left"
        >
          <img src={profileIcon} alt="profile icon" className="w-5 h-5" />
          <button className='text-lg pl-3' type="button">Home</button>
        </Link>

        <div
          className="flex items-center border-y border-black w-full py-2 px-4 text-left"
        >
          <img src={logoutIcon} alt="logout icon" className="w-5 h-5" />
          <button onClick={logout} className='text-lg pl-3' type="button">Log Out</button>
        </div>


        {nav}
      </div>
      <div className="w-1 h-screen bg-black"></div>
    </div>
  );
};

export default Navbar;
