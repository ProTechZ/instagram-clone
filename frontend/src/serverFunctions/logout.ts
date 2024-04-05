import { headers } from "../App";

const logout = async (goToLogin: any) => {
  try {
    await fetch('http://localhost/account/logout', {
      method: 'GET',
      credentials: 'include',
      headers,
    });

    localStorage.setItem('userId', '');

    window.location.reload();
    goToLogin();
  } catch (err) {
    console.error(err);
  }
};

export default logout;
