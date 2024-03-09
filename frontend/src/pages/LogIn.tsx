import axios from 'axios';
import { useState } from 'react';
import Navbar from '../components/Navbar';

const LogIn = () => {
  const [usernameOrEmail, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submit = async () => {
    if (!usernameOrEmail || !password) {
      alert('invalid values');
    }

    try {
      const results = await axios.post('http://localhost/account/login', {
        usernameEmail: usernameOrEmail,
        password,
      });

      console.log(results);
    } catch (err: any) {
      console.error(err.response.data);
    }
  };
  const c = () => {
    console.log(document.cookie);
  };

  return (
    <div>
      <Navbar />
      <h1>Sign Up</h1>

      <button onClick={c}>cookie</button>

      <form>
        <label>
          Username/Email
          <input
            type="text"
            value={usernameOrEmail}
            onChange={(e) => setUsername(e.target.value)}
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

        <button type="button" onClick={submit}>
          Log In
        </button>
      </form>
    </div>
  );
};

export default LogIn;
