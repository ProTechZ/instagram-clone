import { headers } from '../App';

const toggleLike = async (
  postId: number,
  isPostLiked: boolean,
  setIsPostLiked: any
) => {
  const userId = localStorage.getItem('userId');

  try {
    if (isPostLiked) {
      await fetch(
        `http://localhost/posts/like-post/post${postId}/user${userId}`,
        {
          method: 'GET',
          credentials: 'include',
          headers,
        }
      );

      setIsPostLiked(true);
    } else {
      await fetch(
        `http://localhost/posts/unlike-post/post${postId}/user${userId}`,
        {
          method: 'GET',
          credentials: 'include',
          headers,
        }
      );

      setIsPostLiked(false);
    }
  } catch (err) {
    console.error(err);
  }
};

export default toggleLike;
