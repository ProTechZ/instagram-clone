import axios from 'axios';
import Navbar from '../components/Navbar';
import useUserIdStore from '../store';
import { useEffect, useState } from 'react';
import getNumOfFollowed from '../serverFunctions/getNumOfFollwed';

// const getFriendsPost = (userId: number, setFriendsPosts: any) => {
//   axios
//     .get(`http://localhost/users/${userId}`)
//     .then((results) => {
//       console.log(results);
//       const { posts, user, err } = results.data;

//       setFriendsPosts(posts);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

const Home = () => {
  const [friendsPosts, setFriendsPosts] = useState([]);

  const userId = useUserIdStore((state) => state.userId);
  useEffect(() => {
    getNumOfFollowed(3);

    // if (userId) {
    //   getFriendsPost(userId, setFriendsPosts);
    //   console.log(friendsPosts)
    //   setFriendsPosts(friendsPosts);
    // }
  }, [userId]);

  return (
    <div className="flex">
      <Navbar />
      <div>
        <h2>Home View</h2>
        <p>Lorem ipsum dolor sit amet, consctetur adip.</p>

        {friendsPosts.map((val) => {
          return <h1 className="text-black">{val}</h1>;
        })}
      </div>
    </div>
  );
};

export default Home;
