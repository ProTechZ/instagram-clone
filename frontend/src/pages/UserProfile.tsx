import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useEffect, useState } from 'react';
import { headers } from '../App';

export type UserType = {
  user_id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  avatar: string;
  birthday: Date;
  password: string;
};

export type PostType = {
  post_id: number;
  user_id: number;
  image: string;
  data_posted: string;
  caption: string;
  num_likes: string;
};

const getUser = async (
  userId: number,
  setFirstName: any,
  setLastName: any,
  setUsername: any,
  setAvatar: any,
  setPosts: any
) => {
  try {
    const results = await fetch(`http://localhost/users/${userId}`, {
      method: 'GET',
      credentials: 'include',
      headers,
    });

    const { user, posts } = await results.json();
    setFirstName(user.first_name);
    setLastName(user.last_name);
    setUsername(user.username);
    setAvatar(user.avatar);

    const postsArray = [];

    for (const [key, val] of Object.entries(posts)) {
      postsArray.push(val);
    }

    setPosts(postsArray);
  } catch (err) {
    console.error(err);
  }
};

const UserProfile = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState('');
  const [posts, setPosts] = useState([]);

  const { userId } = useParams();
  const [numOfPosts, setNumOfPosts] = useState(0);
  // const numOfFollowed = getNumOfFollowed(parseInt(userId!));

  useEffect(() => {
    console.log('in the profile');
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
            <h1>{username}</h1>
            <h1>
              {firstName} {lastName}
            </h1>
            <h1>{numOfPosts}</h1>
            {/* <h1>{numOfFollowed}</h1> */}
          </div>
        </div>
        {posts.map((post: PostType) => {
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
