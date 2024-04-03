import { useEffect, useState } from 'react';
import getTimeSincePosted from '../utils/getTimeSincePosted';
import heartIcon from '../assets/heart.png'
import redHeartIcon from '../assets/heart_red.png'

const Post = ({
  avatar,
  username,
  datePosted,
  numLikes,
  caption,
  image,
  comments,
}: {
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

  useEffect(() => {
    const { time, hours } = getTimeSincePosted(datePosted);

    setTime(time);
    setIsTimeInHours(hours);
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
      <div className="flex items-center border-y-2 border-purple-300 w-full py-2 px-4 hover:bg-purple-100">
        <img src={heartIcon} alt="logout icon" className="w-5 h-5" />
        <button
          // onClick={() => logout(goToHome)}
          className="text-lg pl-3 w-full text-left"
          type="button"
        >
          Log Out
        </button>
      </div>
      <h1 className="text-black">{numLikes}</h1>
      <h1 className="text-black"> {caption}</h1>
    </div>
  );
};

export default Post;
