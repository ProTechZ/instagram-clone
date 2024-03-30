import { useState } from 'react';
import Background from '../assets/Background.svg';
import { Link, useNavigate } from 'react-router-dom';
import signUp from '../serverFunctions/signup';
import useUserIdStore from '../store';

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPwrd, setConfirmPwrd] = useState('');

  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  const { setUserId } = useUserIdStore();

  return (
    <div
      style={{ backgroundImage: `url(${Background})` }}
      className="flex items-center justify-center h-screen"
    >
      {showModal && (
        <div
          onClick={() => setShowModal(false)}
          className="w-screen h-screen z-10 absolute top-0 left-0 flex justify-center items-center"
        >
          <div className="absolute top-0 left-0 opacity-50 bg-black w-screen h-screen" />
          <div className="flex justify-center flex-col items-center absolute bg-white rounded-3xl w-1/5 h-1/5 border-2 border-purple-300">
            <h1 className="text-lg text-red-500 font-bold italic">
              Not allowed to sign up
            </h1>
            <h1 className="text-sm">You are below 15 years old</h1>
          </div>
        </div>
      )}

      <div className="z-0 flex flex-col justify-evenly items-center bg-white rounded-3xl mb-24 w-1/4 h-4/5 border-2 border-purple-300">
        <h1
          style={{ WebkitTextStroke: '1px #b570fb' }}
          className="tracking-widest font-bold  text-white text-5xl "
        >
          INSTAHUB
        </h1>

        <form className="flex flex-col w-3/4">
          <label className="text-xs text-gray-400">First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="py-5 px-2 rounded-md border mb-2 h-8 border-purple-300"
          />

          <label className="text-xs text-gray-400">Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="py-5 px-2 rounded-md border mb-2 h-8 border-purple-300"
          />

          <label className="text-xs text-gray-400">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="py-5 px-2 rounded-md border mb-2 h-8 border-purple-300"
          />

          <label className="text-xs text-gray-400">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="py-5 px-2 rounded-md border mb-2 h-8 border-purple-300"
          />

          <label className="text-xs text-gray-400">Birthday</label>
          <input
            id="bdayInput"
            type="text"
            onFocus={() => {
              (document.getElementById('bdayInput') as HTMLInputElement).type =
                'date';
            }}
            onBlur={() => {
              (document.getElementById('bdayInput') as HTMLInputElement).type =
                'text';
            }}
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            className="py-5 px-2 rounded-md border mb-2 h-8 border-purple-300"
          />

          <label className="text-xs text-gray-400">Password</label>
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="py-5 px-2 rounded-md border mb-2 h-8 border-purple-300"
          />

          <label className="text-xs text-gray-400">Confirm Password</label>
          <input
            type="text"
            value={confirmPwrd}
            onChange={(e) => setConfirmPwrd(e.target.value)}
            className="py-5 px-2 rounded-md border h-8 border-purple-300"
          />

          {error && <p className="text-red-600 text-sm italic mt-1">{error}</p>}

          <button
            className="font-bold rounded-full bg-white border-2 border-purple-300 mt-8 mb-2 py-3 px-20 "
            type="button"
            onClick={() =>
              signUp(
                firstName,
                lastName,
                username,
                email,
                birthday,
                password,
                confirmPwrd,
                setError,
                setShowModal,
                () => navigate('/'),
                setUserId
              )
            }
          >
            SIGN UP
          </button>
          <Link to="/login">
            <p className="text-center text-blue-600 text-sm hover:underline ">
              Already have an account?
            </p>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
