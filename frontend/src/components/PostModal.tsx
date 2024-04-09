import { useEffect, useState } from 'react';
import getTimeSincePosted from '../utils/getTimeSincePosted';
import heartIcon from '../assets/heart.png';
import redHeartIcon from '../assets/heart_red.png';
import toggleLike from '../serverFunctions/toggleLike';
import isPostLiked from '../serverFunctions/isPostLiked';
import { Link } from 'react-router-dom';

const Post = ({
  id,
  avatar,
  username,
  datePosted,
  numLikes,
  caption,
  image,
  comments,
}: {
  id: number;
  avatar: string;
  username: string;
  datePosted: string;
  numLikes: number;
  caption: string;
  image: string;
  comments: string[];
}) => {
  const [time, setTime] = useState(0);
  const [isTimeInHours, setIsTimeInHours] = useState(false);
  const [isLikedByUser, setIsLikedByUser] = useState(false);

  useEffect(() => {
    const { time, hours } = getTimeSincePosted(datePosted);
    setTime(time);
    setIsTimeInHours(hours);
  }, []);

  useEffect(() => {
    isPostLiked(id).then((isLiked) => {
      setIsLikedByUser(isLiked);
    });
    console.log(isLikedByUser, id);
  }, []);

  return (
    <div className="w-1/2  border border-purple-800 rounded-lg mb-10">
      <div className="p-5 pb-2 flex items-center space-x-2">
        <Link to={`/user/${localStorage.getItem('userId')}`}>
          <img
            src={avatar}
            alt="hi"
            className="w-16 h-16 rounded-full border-2 border-purple-300"
          />
        </Link>

        <div className="flex flex-col ">
          <Link to={`/user/${localStorage.getItem('userId')}`}>
            <h1 className="text-xl">{username}</h1>
          </Link>
          <h4 className="text-purple-700 text-xs">
            {time} {isTimeInHours ? 'hrs' : 'days'} ago
          </h4>
        </div>
      </div>
      <img
        src={image}
        className=" border border-y-purple-800 hover:cursor-pointer"
      />

      <div className="flex px-5 py-2 space-x-2">
        <button
          onClick={() => toggleLike(id, isLikedByUser, setIsLikedByUser)}
          className="w-fit text-left flex "
          type="button"
        >
          <img
            src={isLikedByUser ? redHeartIcon : heartIcon}
            alt="logout icon"
            className="w-6 h-6"
          ></img>
        </button>
        <h1>
          {numLikes} {numLikes === 1 ? 'person' : 'people'} liked this
        </h1>
      </div>

      <div className="hover:cursor-pointer flex px-5 space-x-2">
        <h1 className="font-bold"> {username}</h1>
        <h1> {caption}</h1>
      </div>
      <button className="px-5 text-gray-600"> View all comments</button>
    </div>
  );
};

export default Post;
