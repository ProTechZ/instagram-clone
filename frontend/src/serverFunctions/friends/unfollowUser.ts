import { headers } from '../../App';

const unFollowUser = async (userToUnFollow: number) => {
  const userId = localStorage.getItem('userId');

  try {
    const results = await fetch(
      `http://localhost/friends/unfollow/${userId}/${userToUnFollow}`,
      {
        method: 'GET',
        credentials: 'include',
        headers,
      }
    );

    const f = await results.json();
console.log(f);

    // return usersFollowed;
  } catch (err) {
    console.error(err);
  }
};

export default unFollowUser;
