import { headers } from '../../App';

const isPostLiked = async (postId: number) => {
  const userId = localStorage.getItem('userId');

  try {
    const results = await fetch(
      `http://localhost/posts/is-post-liked/post${postId}/user${userId}`,
      {
        method: 'GET',
        credentials: 'include',
        headers,
      }
    );

    const liked = await results.json();
    console.log(postId, userId, liked);
    return liked;
  } catch (err) {
    console.error(err);
  }
};

export default isPostLiked;
