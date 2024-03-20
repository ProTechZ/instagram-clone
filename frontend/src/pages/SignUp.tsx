import axios from 'axios';
import { useState } from 'react';
import Background from '../assets/Background.svg';
import { Link } from 'react-router-dom';

const signUp = (
  firstName: string,
  lastName: string,
  username: string,
  email: string,
  birthday: string,
  password: string,
  confirmPwrd: string
) => {
  if (
    !firstName ||
    !lastName ||
    !username ||
    !email ||
    !birthday ||
    !password ||
    !confirmPwrd
  ) {
    alert('invalid values');
  } else if (password !== confirmPwrd) {
    alert('passwords dont match');
  }

  axios
    .post('http://localhost/account/signup', {
      first_name: firstName,
      last_name: lastName,
      username,
      email,
      birthday,
      password,
    })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.error(err);
    });
};

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPwrd, setConfirmPwrd] = useState('');

  return (
    <div
      style={{ backgroundImage: `url(${Background})` }}
      className="flex items-center justify-center h-screen"
    >
      <div className="flex flex-col justify-evenly items-center bg-white rounded-3xl mb-24 w-1/4 h-3/4 border-2 border-purple-300">
        <h1
          style={{ WebkitTextStroke: '1px #b570fb' }}
          className="tracking-widest font-bold  text-white text-5xl "
        >
          INSTAHUB
        </h1>

        <form className="flex flex-col w-3/4">
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="py-5 px-2 rounded-md border mb-2 h-8 border-purple-300"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="py-5 px-2 rounded-md border mb-2 h-8 border-purple-300"
          />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="py-5 px-2 rounded-md border mb-2 h-8 border-purple-300"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="py-5 px-2 rounded-md border mb-2 h-8 border-purple-300"
          />
          <input
            id="bdayInput"
            type="text"
            placeholder="Birthday"
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
          <input
            type="text"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="py-5 px-2 rounded-md border mb-2 h-8 border-purple-300"
          />
          <input
            type="text"
            placeholder="Confirm Password"
            value={confirmPwrd}
            onChange={(e) => setConfirmPwrd(e.target.value)}
            className="py-5 px-2 rounded-md border h-8 border-purple-300"
          />

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
                confirmPwrd
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
