import axios from 'axios';
import { useState } from 'react';
import Navbar from '../components/Navbar';

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPwrd, setConfirmPwrd] = useState('');

  const submit = async () => {
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
    try {
      const results = await axios.post('http://localhost/account/signup', {
        first_name: firstName,
        last_name: lastName,
        username,
        email,
        birthday,
        password,
      });

      console.log(results);
    } catch (err: any) {
      console.error(err.response.data);
    }
  };

  return (
    <div>
      <Navbar/>
      <h1>Sign Up</h1>

      <form>
        <label>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <label>
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Birthday
          <input
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
          />
        </label>
        <label>
          Password
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label>
          Confirm Password
          <input
            type="text"
            value={confirmPwrd}
            onChange={(e) => setConfirmPwrd(e.target.value)}
          />
        </label>
        <button type="button" onClick={submit}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
