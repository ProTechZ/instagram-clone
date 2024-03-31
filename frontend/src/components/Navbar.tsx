import { Link } from 'react-router-dom';
import homeIcon from '../assets/home.svg';
import logoutIcon from '../assets/logout.svg';
import profileIcon from '../assets/profile.svg';
import logout from '../serverFunctions/logout';

const Navbar = () => {

  <Link to="/login">
    <button type="button" onClick={logout}>
      Log Out
    </button>
  </Link>;

  
  return (
    <div className="flex">
      <div>
        <h1
          style={{ WebkitTextStroke: '1px #b570fb' }}
          className="tracking-widest font-bold text-white text-4xl p-8 pl-4 pb-12"
        >
          INSTAHUB
        </h1>
        <Link
          to="/"
          className="flex items-center border-y border-black w-full py-2 px-4 text-left"
        >
          <img src={homeIcon} alt="home icon" className="w-5 h-5" />
          <button className="text-lg pl-3" type="button">
            Home
          </button>
        </Link>

        <Link
          to={`/user/${3}`}
          className="flex items-center border-black w-full py-2 px-4 text-left"
        >
          <img src={profileIcon} alt="profile icon" className="w-5 h-5" />
          <button className="text-lg pl-3" type="button">
            Profile
          </button>
        </Link>

        

        <div className="flex items-center border-y border-black w-full py-2 px-4 text-left">
          <img src={logoutIcon} alt="logout icon" className="w-5 h-5" />
          <button onClick={logout} className="text-lg pl-3" type="button">
            Log Out
          </button>
        </div>

      </div>
      <div className="w-1 h-screen bg-black"></div>
    </div>
  );
};

export default Navbar;
