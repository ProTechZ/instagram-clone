import { headers } from '../../App';

const getAllFollowers = async (userId: number) => {
  try {
    const results = await fetch(
      `http://localhost/friends/get-followers/${userId}`,
      {
        method: 'GET',
        credentials: 'include',
        headers,
      }
    );

    const { followers } = await results.json();

    return followers;
  } catch (err) {
    console.error(err);
  }
};

export default getAllFollowers;
