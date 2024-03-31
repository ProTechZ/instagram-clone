const logout = async () => {
  try {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    const results = await fetch('http://localhost/account/login', {
      method: 'GET',
      credentials: 'include',
      headers,
    });
    const smthing = await results.json();
    console.log(smthing);
  } catch (err) {
    console.error(err);
  }
};

export default logout;
