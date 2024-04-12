import { headers } from '../../App';

const followUser = async (userToFollow: number) => {
  const userId = localStorage.getItem('userId');

  try {
    await fetch(
      `http://localhost/friends//follow/${userId}/${userToFollow}`,
      {
        method: 'GET',
        credentials: 'include',
        headers,
      }
    );
  } catch (err) {
    console.error(err);
  }
};

export default followUser;
