const login = async (
  usernameEmail: string,
  password: string,
  setError: any,
  goToHome: any
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
      const headers = new Headers();
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
      const { successful, user, err } = await results.json();

      if (!successful) {
        setError(err);
      } else {
        setError('');
        localStorage.setItem('userId', user.user_id.toString());
        
        window.location.reload();
        goToHome();
      }
    } catch (err) {
      setError(err);
    }
  }
};

export default login;
