import { useEffect, useState } from 'react';
import getTimeSincePosted from '../utils/getTimeSincePosted';
import heartIcon from '../assets/heart.png';
import redHeartIcon from '../assets/heart_red.png';
import toggleLike from '../serverFunctions/toggleLike';
import isPostLiked from '../serverFunctions/isPostLiked';

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
    console.log(isLikedByUser, id)
  }, []);

  return (
    <div className="w-1/2  border border-black rounded-lg">
      <div className="p-5 pb-2 flex items-center space-x-2">
        <img
          src={avatar}
          alt="hi"
          className="w-16 h-16 rounded-full border-2 border-purple-300"
        />
        <div className="flex flex-col ">
          <h1 className="text-black text-xl">{username}</h1>
          <h1 className="text-black text-xl">{datePosted}</h1>
          <h4 className="text-purple-700 text-xs">
            {time} {isTimeInHours ? 'hrs' : 'days'} ago
          </h4>
        </div>
      </div>
      <img src={image} className=" border border-y-black" />

      <button
        onClick={() => toggleLike(id, isLikedByUser, setIsLikedByUser)}
        className="text-lg w-fit text-left "
        type="button"
      >
        <img
          src={isLikedByUser ? redHeartIcon : heartIcon}
          alt="logout icon"
          className="w-6 h-6"
        ></img>
      </button>
      {/* </div> */}
      <h1 className="text-black">{numLikes}</h1>
      <h1 className="text-black"> {caption}</h1>
    </div>
  );
};

export default Post;
