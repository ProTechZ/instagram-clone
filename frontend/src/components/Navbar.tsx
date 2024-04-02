import { Link, useNavigate } from 'react-router-dom';
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

  const navigate = useNavigate();
  const goToHome = () => navigate('/')

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
          className="flex items-center border-y border-black w-full py-2 px-4 text-left hover:bg-purple-100"
        >
          <img src={homeIcon} alt="home icon" className="w-5 h-5" />
          <button className="text-lg pl-3" type="button">
            Home
          </button>
        </Link>

        <Link
          to={`/user/${localStorage.getItem('userId')}`}
          className="flex items-center border-black w-full py-2 px-4 text-left hover:bg-purple-100"
        >
          <img src={profileIcon} alt="profile icon" className="w-5 h-5" />
          <button className="text-lg pl-3" type="button">
            Profile
          </button>
        </Link>

        {localStorage.getItem('userId') !== '' && (
          <div className="flex items-center border-y border-black w-full py-2 px-4 hover:bg-purple-100">
            <img src={logoutIcon} alt="logout icon" className="w-5 h-5" />
            <button
              onClick={() => logout(goToHome)}
              className="text-lg pl-3 w-full text-left"
              type="button"
            >
              Log Out
            </button>
          </div>
        )}
      </div>
      <div className="w-1 h-screen bg-black"></div>
    </div>
  );
};

export default Navbar;
