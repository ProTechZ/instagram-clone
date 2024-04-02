import { useEffect, useState } from 'react';

const hi = (datePosted: string) => {
  const diff = Date.now() - Date.parse(datePosted.split('T')[0]);
  const timeSincePostedHrs = Math.round(diff / (1000 * 60 * 60));
  let time;

  if (timeSincePostedHrs < 24) {
    time = timeSincePostedHrs;
  } else {
    time = Math.round(timeSincePostedHrs / 24); // in days
  }

  return time;
};

const Post = ({
  avatar,
  username,
  datePosted,
  numLikes,
  caption,
  image,
}: {
  avatar: string;
  username: string;
  datePosted: string;
  numLikes: number;
  caption: string;
  image: string;
  }) => {
  console.log(datePosted)
  const [time, setTime] = useState(0);

  useEffect(() => {
    setTime(hi(datePosted));
  }, []);

  return (
    <div className="p-5 border border-black">
      <div className="flex items-center space-x-2">
        <img
          src={avatar}
          alt="hi"
          className="w-16 h-16 rounded-full border-2 border-purple-300"
        />
        <div className="flex flex-col ">
          <h1 className="text-black text-xl">{username}</h1>

          <h4 className="text-purple-700 text-xs">{time} days ago</h4>
        </div>
      </div>
      <h1 className="text-black">{datePosted}</h1>
      <h1 className="text-black">{numLikes}</h1>
      <h1 className="text-black">{caption}</h1>

      <img src={image} />
    </div>
  );
};

export default Post;
