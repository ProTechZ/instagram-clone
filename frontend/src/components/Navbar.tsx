import { Link, useNavigate } from 'react-router-dom';
import homeIcon from '../assets/home.svg';
import logoutIcon from '../assets/logout.svg';
import profileIcon from '../assets/profile.svg';
import plusIcon from '../assets/plus.svg';
import logout from '../serverFunctions/logout';

const Navbar = () => {
  <Link to="/login">
    <button type="button" onClick={logout}>
      Log Out
    </button>
  </Link>;

  const navigate = useNavigate();
  const goToLogin = () => navigate('/login');

  return (
    <div className="flex">
      <div className="flex flex-col items-center">
        <h1 className="tracking-widest font-bold text-black text-4xl px-8 py-10 text-center ">
          INSTAHUB
        </h1>
        <Link
          to="/"
          className="flex items-center border-t-2 border-purple-300 w-full py-2 pl-4 text-left hover:bg-purple-100"
        >
          <img src={homeIcon} alt="home icon" className="w-5 h-5" />
          <button className="text-lg pl-3" type="button">
            Home
          </button>
        </Link>

        <Link
          to={`/user/${localStorage.getItem('userId')}`}
          className="flex items-center border-t-2 border-purple-300 w-full py-2 pl-4 text-left hover:bg-purple-100"
        >
          <img src={profileIcon} alt="profile icon" className="w-5 h-5" />
          <button className="text-lg pl-3" type="button">
            Profile
          </button>
        </Link>

        <Link
          to={`/user/${localStorage.getItem('userId')}`}
          className="flex items-center border-t-2 border-purple-300 w-full py-2 pl-3 text-left hover:bg-purple-100"
        >
          <img src={plusIcon} alt="profile icon" className="w-6 h-6" />
          <button className="text-lg pl-3" type="button">
            Create Post
          </button>
        </Link>

        {localStorage.getItem('userId') !== '' && (
          <div className="flex items-center border-y-2 border-purple-300 w-full py-2 pl-4 hover:bg-purple-100">
            <img src={logoutIcon} alt="logout icon" className="w-5 h-5" />
            <button
              onClick={() => logout(goToLogin)}
              className="text-lg pl-3 w-full text-left"
              type="button"
            >
              Log Out
            </button>
          </div>
        )}
      </div>
      <div className="w-1 min-h-screen max-h-full bg-purple-500" />
    </div>
  );
};

export default Navbar;
