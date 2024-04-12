import { useEffect, useState } from 'react';
import Background from '../assets/Background.svg';
import signUp from '../serverFunctions/user/signup';
import { UserType } from '../types';
import { getUser } from '../serverFunctions/user/getUserProfile';
import updateUser from '../serverFunctions/user/updateUser';

const EditProfile = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const [error, setError] = useState('');

  const userId = parseInt(localStorage.getItem('userId')!);

  useEffect(() => {
    const fetchData = async () => {
      const { first_name, last_name, username, email, birthday } =
        (await getUser(userId)) as UserType;

      setFirstName(first_name);
      setLastName(last_name);
      setUsername(username);
      setEmail(email);
      setBirthday(birthday.toString());
    };

    fetchData();
  }, []);

  return (
    <div
      style={{ backgroundImage: `url(${Background})` }}
      className="flex items-center justify-center h-screen"
    >
      <div className="flex flex-col justify-evenly items-center bg-white rounded-3xl mb-24 w-1/4 h-2/3 border-2 border-purple-300">
        <h1 className="font-bold text-purple-600 text-5xl ">
          Edit Your Profile
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

          {error && <p className="text-red-600 text-sm italic mt-1">{error}</p>}
          <div className="flex mt-4">
            <button
              className="hover:bg-purple-100 font-semibold rounded-full border-2 border-purple-300 w-1/2 py-2 mx-1"
              type="button"
              onClick={() =>
                updateUser(
                  firstName,
                  lastName,
                  username,
                  email,
                  birthday,
                  setError
                )
              }
            >
              Save
            </button>
            <button
              className="hover:bg-purple-100 rounded-full border-2 border-purple-300 w-1/2 py-2 mx-1 "
              type="button"
              onClick={() => window.history.back()}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
