import { headers } from '../../App';

const isUserFollowing = async (followedUser: number, followingUser: number) => {
  try {
    const results = await fetch(
      `http://localhost/friends/is-following/${followedUser}/${followingUser}`,
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

export default isUserFollowing;
