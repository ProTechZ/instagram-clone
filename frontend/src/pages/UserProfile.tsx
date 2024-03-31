import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useEffect, useState } from 'react';
import getNumOfFollowed from '../serverFunctions/getNumOfFollwed';

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

const getUser = async (
  userId: number,
  setFirstName: any,
  setLastName: any,
  setUsername: any,
  setAvatar: any,
  setPosts: any
) => {
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
    // const { posts, user } = results.data;
    // setFirstName(user.first_name);
    // setLastName(user.last_name);
    // setUsername(user.username);
    // setAvatar(user.avatar);

    // const postsArray = [];

    // for (const [key, val] of Object.entries(posts)) {
    //   postsArray.push(val);
    // }

    // setPosts(postsArray);
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
    getNumOfFollowed(parseInt(userId!));

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
        {posts.map((post: Post) => {
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
