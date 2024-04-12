import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useEffect, useState } from 'react';
import { getPosts, getUser } from '../serverFunctions/user/getUserProfile';
import getAllFollowed from '../serverFunctions/friends/getAllFollowed';
import getAllFollowers from '../serverFunctions/friends/getAllFollowers';
import userExists from '../serverFunctions/user/userExist';
import { PostType, UserType } from '../types';
import isUserFollowing from '../serverFunctions/friends/isUserFollowing';
import followUser from '../serverFunctions/friends/followUser';
import unFollowUser from '../serverFunctions/friends/unfollowUser';

const Button = ({ text, onClick }: { text: string; onClick: any }) => (
  <button
    className="font-medium text-sm rounded-lg border-2 border-purple-300 px-3 hover:bg-pink-200"
    type="button"
    onClick={onClick}
  >
    {text}
  </button>
);

const showModal = () => {};

const UserProfile = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState('');
  const [posts, setPosts] = useState([] as PostType[]);

  const userId = parseInt(useParams().userId!);

  const [numOfPosts, setNumOfPosts] = useState(0);
  const [numOfFollowed, setNumOfFollowed] = useState(0);
  const [numOfFollowers, setNumOfFollowers] = useState(0);

  const isUser = userId.toString() === localStorage.getItem('userId');
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const posts = await getPosts(userId);
      setPosts(posts);
      setNumOfPosts(posts.length);

      const { first_name, last_name, username, avatar } = (await getUser(
        userId
      )) as UserType;
      setFirstName(first_name);
      setLastName(last_name);
      setUsername(username);
      setAvatar(avatar);

      setNumOfFollowed((await getAllFollowed(userId)).length);
      setNumOfFollowers((await getAllFollowers(userId)).length);

      setIsFollowing(
        await isUserFollowing(userId, parseInt(localStorage.getItem('userId')!))
      );
    };

    userExists(userId).then((exists) => {
      if (!exists) {
        window.location.href = 'http://localhost:3000/404';
      } else {
        fetchData();
      }
    });
  }, []);

  return (
    <div className="flex">
      <Navbar />
      <div className="my-10">
        <div className="flex ml-24">
          <img
            src={avatar}
            alt="avatar of user"
            className="w-52 h-52 rounded-full border-4 border-purple-700"
          />
          <div className="my-5 mx-20 space-y-1">
            <div className="flex py-1">
              <h1 className="text-2xl mr-5">{username}</h1>
              {isUser && (
                <Button
                  text="Edit Profile"
                  onClick={() => {
                    window.location.href = 'http://localhost:3000/edit-profile';
                  }}
                />
              )}
              {!isUser && isFollowing && (
                <Button
                  text="Unfollow"
                  onClick={() => {
                    unFollowUser(userId!);
                    window.location.reload();
                  }}
                />
              )}
              {!isUser && !isFollowing && (
                <Button
                  text="Follow"
                  onClick={() => {
                    followUser(userId!);
                    window.location.reload();
                  }}
                />
              )}
            </div>

            <div className="flex space-x-8 ">
              <h1>{numOfPosts} posts</h1>
              <h1>{numOfFollowed} following</h1>
              <h1>
                {numOfFollowers}{' '}
                {numOfFollowers <= 1 ? 'follower' : 'followers'}
              </h1>
            </div>

            <h1>{`${firstName} ${lastName}`} </h1>
          </div>
        </div>

        <hr className="h-10 mt-10" />

        <div className="grid grid-cols-3 gap-4 mx-10">
          {posts.map((post: PostType) => {
            return (
              <div>
                <img
                  src={post.image}
                  alt={post.caption}
                  className="border border-black hover:cursor-pointer"
                  onClick={() => console.log('hi')}
                />
              </div>
            );
          })}
        </div>
      </div>
      {/* <div className="z-0 flex w-screen h-screen bg-black opacity-50"></div> */}
    </div>
  );
};

export default UserProfile;
