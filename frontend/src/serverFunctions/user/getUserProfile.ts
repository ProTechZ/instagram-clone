import { headers } from '../../App';
import { UserType } from '../../types';

export const getUser = async (userId: number) => {
  try {
    const results = await fetch(`http://localhost/users/${userId}`, {
      method: 'GET',
      credentials: 'include',
      headers,
    });

    const { user } = await results.json();

    return user;
  } catch (err) {
    console.error(err);
  }
};

export const getPosts = async (userId: number) => {
  try {
    const results = await fetch(`http://localhost/users/${userId}`, {
      method: 'GET',
      credentials: 'include',
      headers,
    });

    const { posts } = await results.json();

    return posts;
  } catch (err) {
    console.error(err);
  }
};
