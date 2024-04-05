import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useEffect, useState } from 'react';
import { getPosts, getUser } from '../serverFunctions/getUserProfile';
import getAllFollowed from '../serverFunctions/getAllFollowed';
import getAllFollowers from '../serverFunctions/getAllFollowers';

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

  const [numOfFollowed, setNumOfFollowed] = useState(0);
  const [numOfFollowers, setNumOfFollowers] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const id = parseInt(userId!);

      const posts = await getPosts(id);
      setPosts(posts);
      setNumOfPosts(posts.length);

      const { first_name, last_name, username, avatar } = (await getUser(
        id
      )) as UserType;
      setFirstName(first_name);
      setLastName(last_name);
      setUsername(username);
      setAvatar(avatar);

      setNumOfFollowed((await getAllFollowed(id)).length);
      setNumOfFollowers((await getAllFollowers(id)).length);
    };

    fetchData();
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
            <h1>{numOfFollowed} followed</h1>
            <h1>
              {numOfFollowers} {numOfFollowers <= 1 ? 'follower' : 'followers'}
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {posts.map((post: PostType) => {
            return (
              <div>
                <img
                  src={post.image}
                  alt={post.caption}
                  className="border border-black"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
