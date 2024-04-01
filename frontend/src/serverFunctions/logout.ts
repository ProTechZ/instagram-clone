const logout = async (goToHome: any) => {
  try {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    const results = await fetch('http://localhost/account/logout', {
      method: 'GET',
      credentials: 'include',
      headers,
    });
    const smthing = await results.json();
    localStorage.setItem('userId', '');

    window.location.reload();
    goToHome();
  } catch (err) {
    console.error(err);
  }
};

export default logout;
