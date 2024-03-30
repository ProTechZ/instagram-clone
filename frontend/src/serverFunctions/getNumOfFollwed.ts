import axios from 'axios';

const getNumOfFollowed = async (userId: number) => {
  try {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    const results = await fetch(
      'http://localhost/friends/get-followed/${userId}',
      {
        method: 'GET',
        credentials: 'include',
        headers,
      }
    );
    const smthing = await results.json();
    console.log(smthing);
  } catch (err) {
    console.log(err);
  }
};

export default getNumOfFollowed;
