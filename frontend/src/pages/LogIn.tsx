import axios from 'axios';
import { useState } from 'react';
import Background from '../assets/Background.svg';

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

  return (
    <div
      style={{ backgroundImage: `url(${Background})` }}
      className="flex items-center justify-center h-screen"
    >
      <div className="flex justify-center items-center p-10 rounded-3xl mb-24 w-1/3 h-1/2 border-2 border-red-400">
        <h1
          style={{
            WebkitTextStroke: '1px #F87171',
          }}
          className="tracking-widest stroke-blue-400 font-bold h-1/3 w-1/2 transform -rotate-90 text-white text-5xl "
        >
          INSTAHUB
        </h1>

        <form className="flex flex-col w-1/2 ">
          <input
            type="text"
            placeholder="Username/Email"
            value={usernameOrEmail}
            onChange={(e) => setUsername(e.target.value)}
            className="py-5 px-2 rounded-md border mb-1 h-8 border-red-400"
          />

          <input
            type="text"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="py-5 px-2 rounded-md border  h-8 border-red-400"
          />

          <button
            className="font-bold rounded-full bg-white border-2 border-red-400 mt-6 py-3 px-20 "
            type="button"
            onClick={submit}
          >
            LOG IN
          </button>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
