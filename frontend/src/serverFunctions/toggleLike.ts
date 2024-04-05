import { headers } from '../App';

const toggleLike = async (
  postId: number,
  isLikedByUser: boolean,
  setIsLikedByUser: any
) => {
  const userId = localStorage.getItem('userId');

  try {
    if (isLikedByUser) {
      await fetch(
        `http://localhost/posts/unlike-post/post${postId}/user${userId}`,
        {
          method: 'GET',
          credentials: 'include',
          headers,
        }
      );

      setIsLikedByUser(false);
    } else {
      await fetch(
        `http://localhost/posts/like-post/post${postId}/user${userId}`,
        {
          method: 'GET',
          credentials: 'include',
          headers,
        }
      );

      setIsLikedByUser(true);
    }
  } catch (err) {
    console.error(err);
  }
};

export default toggleLike;
