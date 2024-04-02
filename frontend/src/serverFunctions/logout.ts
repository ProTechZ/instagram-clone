import { headers } from "../App";

const logout = async (goToHome: any) => {
  try {
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
