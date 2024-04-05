import Navbar from '../components/Navbar';
import { useEffect, useState } from 'react';
import getAllfollowed from '../serverFunctions/getAllFollowed';
import { headers } from '../App';
import shuffleArray from '../utils/shuffleArray';
import { PostType, UserType } from './UserProfile';
import Post from '../components/Post';

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
      const modifiedPosts = posts.map((val: PostType) => {
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
    const fetchData = async () => {
      const followedIds = await getAllfollowed(userId);
      const friendsPosts = await getFriendsPost(followedIds);

      setFriendsPosts(friendsPosts);
    };

    fetchData();

  }, []);

  return (
    <div className="flex">
      <Navbar />
      <div className="ml-10">
        <h1 className="text-black">These are posts from your friends</h1>

        {friendsPosts.length >= 1 &&
          friendsPosts.map((post) => {
            return (
              <Post
                id={post.post_id}
                avatar={post.avatar}
                username={post.username}
                datePosted={post.date_posted}
                numLikes={post.num_likes}
                caption={post.caption}
                image={post.image}
                comments={['hi', 'pine me', 'bro tinks hes ihi']}
              />
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
