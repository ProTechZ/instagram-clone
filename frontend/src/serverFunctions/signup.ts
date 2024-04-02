import { headers } from '../App';
import calculateDateDiff from '../utils/calculateDateDiff';

const signUp = async (
  firstName: string,
  lastName: string,
  username: string,
  email: string,
  birthday: string,
  password: string,
  confirmPwrd: string,
  setError: any,
  setShowModal: any,
  goToHome: any
) => {
  const ref = [
    { val: firstName, input: document.getElementsByTagName('input')[0] },
    { val: lastName, input: document.getElementsByTagName('input')[1] },
    { val: username, input: document.getElementsByTagName('input')[2] },
    { val: email, input: document.getElementsByTagName('input')[3] },
    { val: birthday, input: document.getElementsByTagName('input')[4] },
    { val: password, input: document.getElementsByTagName('input')[5] },
    { val: confirmPwrd, input: document.getElementsByTagName('input')[6] },
  ];

  if (password !== confirmPwrd) {
    setError("Passwords don't match");
  }

  for (const entry of ref) {
    const { val, input } = entry;

    if (!val) {
      input.style.borderColor = 'red';
      setError('Field is required');
    } else if (val) {
      input.style.borderColor = '#D8B4FD';
    }
  }

  const bdaySplit = birthday.split('-');
  const bdayAsDate = new Date(
    parseInt(bdaySplit[0]),
    parseInt(bdaySplit[1]) - 1,
    parseInt(bdaySplit[2])
  );

  const userAgeInDays = calculateDateDiff(bdayAsDate);

  // 15 years old
  if (userAgeInDays < 5479) {
    setShowModal(true);
    return;
  }

  if (
    firstName &&
    lastName &&
    username &&
    email &&
    birthday &&
    password &&
    confirmPwrd &&
    password === confirmPwrd
  ) {
    setError('');

    try {
      const results = await fetch('http://localhost/account/signup', {
        method: 'POST',
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          username,
          email,
          birthday,
          password,
        }),
        credentials: 'include',
        headers,
      });
      const { loggedIn, user, err } = await results.json();

      if (!loggedIn) {
        setError(err);
      } else {
        setError('');
        // setUserId(user.user_id);

        goToHome();
      }
    } catch (err) {
      setError(err);
    }
  }
};

export default signUp;
