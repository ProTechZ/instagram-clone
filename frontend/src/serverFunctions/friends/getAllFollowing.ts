import { headers } from '../../App';

const getAllFollowing = async (userId: number) => {
  try {
    const results = await fetch(
      `http://localhost/friends/get-following/${userId}`,
      {
        method: 'GET',
        credentials: 'include',
        headers,
      }
    );

    
    const { following } = await results.json();

    return following;
  } catch (err) {
    console.error(err);
  }
};

export default getAllFollowing;
