import Navbar from '../components/Navbar';
import { useEffect, useState } from 'react';
import getNumOfFollowed from '../serverFunctions/getNumOfFollwed';
import isLoggedIn from '../utils/isLoggedIn';

const getFriendsPost = async (userId: number, setFriendsPosts: any) => {
  try {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    const results = await fetch(`http://localhost/users/${userId}`, {
      method: 'GET',
      credentials: 'include',
      headers,
    });
    const smthing = await results.json();
    console.log(smthing);
  } catch (err) {
    console.error(err);
  }
};

const Home = () => {
  const [friendsPosts, setFriendsPosts] = useState([]);

  // useEffect(() => {
  //   console.log(isLoggedIn())
    // if (isLoggedIn()) {
      // getFriendsPost(userId, setFriendsPosts);
    //   console.log(friendsPosts);
    //   setFriendsPosts(friendsPosts);
    // }
  // }, [userId]);

  return (
    <div className="flex">
      <Navbar />
      <div>
        <h2>Home View</h2>
        <p>Lorem ipsum dolor sit amet, consctetur adip.</p>

        {friendsPosts.map((val) => {
          return <h1 className="text-black">{val}</h1>;
        })}
        <button onClick={isLoggedIn}>hi</button>
      </div>
    </div>
  );
};

export default Home;
