import axios from 'axios';

const login = (
  usernameEmail: string,
  password: string,
  setError: any,
  goToHome: any
) => {
  const usernameEmailInput = document.getElementById(
    'usernameEmail'
  ) as HTMLInputElement;
  const passwordInput = document.getElementById('password') as HTMLInputElement;

  if (!usernameEmail) {
    usernameEmailInput.style.borderColor = 'red';
    setError('Field is required');
  } else if (usernameEmail) {
    usernameEmailInput.style.borderColor = '#D8B4FD';
  }

  if (!password) {
    passwordInput.style.borderColor = 'red';
    setError('Field is required');
  } else if (password) {
    passwordInput.style.borderColor = '#D8B4FD';
  }

  if (usernameEmail && password) {
    setError('');

    axios
      .post('http://localhost/account/login', {
        usernameEmail: usernameEmail,
        password,
      })
      .then((results) => {
        console.log(results);
        const { loggedIn, err, user } = results.data;

        if (!loggedIn) {
          setError(err);
        } else {
          setError('');
          goToHome();
        }
      })
      .catch((err) => console.error(err));
  }
};

export default login;
