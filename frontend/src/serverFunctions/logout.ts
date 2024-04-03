import { headers } from "../App";

const logout = async (goToHome: any) => {
  try {
    await fetch('http://localhost/account/logout', {
      method: 'GET',
      credentials: 'include',
      headers,
    });

    localStorage.setItem('userId', '');

    window.location.reload();
    goToHome();
  } catch (err) {
    console.error(err);
  }
};

export default logout;
