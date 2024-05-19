import Navbar from '../components/Navbar';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { PostType, UserType } from '../types';

import userExists from '../serverFunctions/user/userExist';
import getAllFollowing from '../serverFunctions/friends/getAllFollowing';
import getAllFollowers from '../serverFunctions/friends/getAllFollowers';
import isUserFollowing from '../serverFunctions/friends/isUserFollowing';
import followUser from '../serverFunctions/friends/followUser';
import unFollowUser from '../serverFunctions/friends/unfollowUser';
import { getPosts, getUser } from '../serverFunctions/user/getUserProfile';

const Button = ({ text, onClick }: { text: string; onClick: any }) => (
  <button
    className="font-medium text-sm rounded-lg border-2 border-purple-300 px-3 hover:bg-pink-200"
    type="button"
    onClick={onClick}
  >
    {text}
  </button>
);

const UserProfile = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState('');
  const [posts, setPosts] = useState([] as PostType[]);

  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);

  const userId = parseInt(useParams().userId!);
  const isUser = userId.toString() === localStorage.getItem('userId');

  const [showModal, setShowModal] = useState(true);
  const [modalContent, setModalContent] = useState('followejrs');

  useEffect(() => {
    const fetchData = async () => {
      const posts = await getPosts(userId);
      setPosts(posts);

      const { first_name, last_name, username, avatar } = (await getUser(
        userId
      )) as UserType;
      setFirstName(first_name);
      setLastName(last_name);
      setUsername(username);
      setAvatar(avatar);

      setFollowing(await getAllFollowing(userId));
      setFollowers(await getAllFollowers(userId));

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
      {showModal && (
        <div
          onClick={() => setShowModal(false)}
          className="fixed insert-0 bg-black bg-opacity-25 h-full w-full flex items-center justify-center"
        >
          <div className="fixed bg-white w-1/4 h-2/3  bg-white border border-purple-700 rounded-3xl justify-center flex flex-col">
            <h1 className=" text-xl my-5 ">
              {modalContent[0].toUpperCase() + modalContent.slice(1)}
            </h1>
            <div className="overflow-y-scroll">
              {(modalContent === 'followers' ? followers : following).map(
                ({ avatar, username }) => {
                  return (
                    <div className="flex border-top border-gray-500">
                      <img
                        src={avatar}
                        className="w-[48] h-[48] rounded-full border-4 border-purple-700"
                      />
                      <h1>{username}</h1>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </div>
      )}

      <div className="my-10">
        <div className="flex ml-24 items-start">
          <img
            src={avatar}
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
              <h1>{posts.length} posts</h1>
              <h1
                onClick={() => {
                  setModalContent('following');
                  setShowModal(true);
                }}
              >
                {following.length} following
              </h1>
              <h1
                onClick={() => {
                  setModalContent('followers');
                  setShowModal(true);
                }}
              >
                {followers.length}
                {followers.length <= 1 ? ' follower' : ' followers'}
              </h1>
            </div>

            <h1>{`${firstName} ${lastName}`} </h1>
          </div>
        </div>

        <hr className="h-10 mt-10" />

        <div className="grid grid-cols-3 gap-6 mx-10">
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
    </div>
  );
};

export default UserProfile;
