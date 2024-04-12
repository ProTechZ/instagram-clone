import { headers } from '../../App';

const updateUser = async (
  firstName: string,
  lastName: string,
  username: string,
  email: string,
  birthday: string,
  setError: any
) => {
  const ref = [
    { val: firstName, input: document.getElementsByTagName('input')[0] },
    { val: lastName, input: document.getElementsByTagName('input')[1] },
    { val: username, input: document.getElementsByTagName('input')[2] },
    { val: email, input: document.getElementsByTagName('input')[3] },
    { val: birthday, input: document.getElementsByTagName('input')[4] },
  ];

  for (const entry of ref) {
    const { val, input } = entry;

    if (!val) {
      input.style.borderColor = 'red';
      setError('Field is required');
    } else if (val) {
      input.style.borderColor = '#D8B4FD';
    }
  }

  const userId = localStorage.getItem('userId');

  if (firstName && lastName && username && email && birthday) {
    setError('');

    try {
      const results = await fetch(`http://localhost/users/${userId}`, {
        method: 'POST',
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          username,
          email,
          birthday,
        }),
        credentials: 'include',
        headers,
      });

      const { successful, err } = await results.json();

      if (!successful) {
        setError(err);
      } else {
        setError('');

        window.location.href = `http://localhost:3000/user/${userId}`;
      }
    } catch (err) {
      setError(err);
    }
  }
};

export default updateUser;
