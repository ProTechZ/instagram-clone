import { headers } from "../App";

const getAllFollowed = async (userId: number) => {
  try {
    const results = await fetch(
      `http://localhost/friends/get-followed/${userId}`,
      {
        method: 'GET',
        credentials: 'include',
        headers,
      }
    );
    const { usersFollowed } = await results.json();
    console.log(usersFollowed)
    return usersFollowed;
  } catch (err) {
    console.error(err);
  }
};

export default getAllFollowed;
