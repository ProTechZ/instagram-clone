import { headers } from "../../App";

const login = async (
  usernameEmail: string,
  password: string,
  setError: any
) => {
  const usernameEmailInput = document.getElementById(
    "usernameEmailInput"
  ) as HTMLInputElement;

  const passwordInput = document.getElementById(
    "passwordInput"
  ) as HTMLInputElement;

  if (!usernameEmail) {
    usernameEmailInput.style.borderColor = "red";
    setError("Field is required");
  } else if (usernameEmail) {
    usernameEmailInput.style.borderColor = "#D8B4FD";
  }

  if (!password) {
    passwordInput.style.borderColor = "red";
    setError("Field is required");
  } else if (password) {
    passwordInput.style.borderColor = "#D8B4FD";
  }

  if (usernameEmail && password) {
    setError("");

    try {
      const results = await fetch("http://localhost/account/login", {
        method: "POST",
        body: JSON.stringify({
            password,
          usernameEmail,
        }),
        credentials: "include",
        headers,
      });
      const { successful, user, err } = await results.json();

      if (!successful) {
        setError(err);
      } else {
        setError("");
        localStorage.setItem("userId", user.user_id.toString());

        window.location.href = "http://localhost:3000/";
      }
    } catch (err) {
      setError(err);
    }
  }
};

export default login;
