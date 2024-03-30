const login = async (
  usernameEmail: string,
  password: string,
  setError: any,
  goToHome: any,
  setUserId: any
) => {
  const usernameEmailInput = document.getElementById(
    'usernameEmailInput'
  ) as HTMLInputElement;
  const passwordInput = <HTMLInputElement>(
    document.getElementById('passwordInput')
  );

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

    try {
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Accept', 'application/json');

      const results = await fetch('http://localhost/account/login', {
        method: 'POST',
        body: JSON.stringify({
          usernameEmail,
          password,
        }),
        credentials: 'include',
        headers,
      });
      const { loggedIn, user } = await results.json();

      setError('');
      setUserId(user.user_id);
      goToHome();
    } catch (err) {
      setError(err);
    }
  }
};

export default login;
