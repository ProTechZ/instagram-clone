import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useEffect, useState } from 'react';
import { getPosts, getUser } from '../serverFunctions/getUserProfile';

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
  date_posted: string;
  caption: string;
  num_likes: string;
};

const UserProfile = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState('');
  const [posts, setPosts] = useState([] as PostType[]);

  const { userId } = useParams();
  const [numOfPosts, setNumOfPosts] = useState(0);
  // const numOfFollowed = getNumOfFollowed(parseInt(userId!));

  useEffect(() => {
    getPosts(parseInt(userId!)).then((posts) => {
      setPosts(posts);
      setNumOfPosts(posts.length);
    });
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
          console.log(post);
          return (
            <div>
              {/* <img src={post.image} alt="" /> */}
              <h1>{post.caption} </h1>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserProfile;
