import { headers } from '../../App';

const userExists = async (userId: number) => {
  try {
    const results = await fetch(`http://localhost/userexists/${userId}`, {
      method: 'GET',
      credentials: 'include',
      headers,
    });

    const exists = await results.json();

    return exists;
  } catch (err) {
    console.error(err);
  }
};

export default userExists;
