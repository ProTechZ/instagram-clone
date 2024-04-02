import Navbar from '../components/Navbar';
import { useEffect, useState } from 'react';
import getAllfollowed from '../serverFunctions/getAllFollowed';
import { headers } from '../App';
import shuffleArray from '../utils/shuffleArray';
import { Post, User } from './UserProfile';

const getFriendsPost = async (followedIds: number[]) => {
  const friendsPosts = [];

  try {
    for (const friendId of followedIds) {
      const results = await fetch(`http://localhost/users/${friendId}`, {
        method: 'GET',
        credentials: 'include',
        headers,
      });
      const { user, posts } = await results.json();
      const modifiedPosts = posts.map((val: Post) => {
        return { ...val, ...user };
      });

      friendsPosts.push(...modifiedPosts);
    }
  } catch (err) {
    console.error(err);
  }

  return shuffleArray(friendsPosts);
};

const Home = () => {
  const [friendsPosts, setFriendsPosts] = useState([] as any[]);
  const userId = parseInt(localStorage.getItem('userId')!);

  useEffect(() => {
    getAllfollowed(userId).then((followedIds) => {
      getFriendsPost(followedIds).then((results) => {
        setFriendsPosts(results);
      });
    });
  }, [userId]);

  return (
    <div className="flex">
      <Navbar />
      <div className="ml-10">
        <h1 className="text-black">These arer posts from your friends</h1>

        {friendsPosts.length >= 1 &&
          friendsPosts.map((post) => {
            console.log(typeof post.date_posted);
            return (
              <div className="p-5 border border-black">
                <h1 className="text-black">{post.username}</h1>
                <img  src={post.avatar} />
                <h1 className="text-black">{post.date_posted}</h1>
                <h1 className="text-black">{post.num_likes}</h1>
                <h1 className="text-black">{post.caption}</h1>

                <img src={post.image} />
              </div>
            );
          })}

        {friendsPosts.length < 1 && (
          <h1>
            Looks like you have no posts! Let's start by making some friends!
          </h1>
        )}
      </div>
    </div>
  );
};

export default Home;
