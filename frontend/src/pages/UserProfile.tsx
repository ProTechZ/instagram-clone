import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { useEffect, useState } from 'react';

export type User = {
  user_id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  avatar: string;
  birthday: Date;
  password: string;
};

export type Post = {
  post_id: number;
  user_id: number;
  image: string;
  data_posted: string;
  caption: string;
  num_likes: string;
};

const getUser = (
  userId: number,
  setFirstName: any,
  setLastName: any,
  setUsername: any,
  setAvatar: any,
  setPosts: any
) => {
  axios
    .get(`http://localhost/users/${userId}`)
    .then((results) => {
      const { posts, user } = results.data;
      setFirstName(user.first_name);
      setLastName(user.last_name);
      setUsername(user.username);
      setAvatar(user.avatar);

      const postsArray = [];

      for (const [key, val] of Object.entries(posts)) {
        postsArray.push(val);
      }

      setPosts(postsArray);
    })
    .catch((err) => {
      console.error(err);
    });
};

const UserProfile = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState('');
  const [posts, setPosts] = useState([]);

  const [numOfPosts, setNumOfPosts] = useState(0);

  const { userId } = useParams();

  useEffect(() => {
    getUser(
      parseInt(userId!),
      setFirstName,
      setLastName,
      setUsername,
      setAvatar,
      setPosts
    );

    setNumOfPosts(posts.length);
  }, []);
  return (
    <div className="flex">
      <Navbar />
      <div>
        <div className="flex">
          <img
            src={avatar}
            alt="hi"
            className="w-44 h-44 rounded-full border-4 border-black"
          />
          <div>
            <h1>{firstName}</h1>
            <h1>{lastName}</h1>
            <h1>{username}</h1>
            <h1>{numOfPosts}</h1>
          </div>
        </div>
        {posts.map((post: Post) => {
          console.log(post.post_id, post.image);
          return (
            <div>
              <img src={post.image} alt="" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserProfile;
