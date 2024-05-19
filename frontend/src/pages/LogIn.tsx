import Background from "../assets/Background.svg";
import { Link } from "react-router-dom";
import login from "../serverFunctions/user/login";
import { useState } from "react";

const LogIn = () => {
  const [usernameEmail, setUsernameEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  return (
    <div
      style={{ backgroundImage: `url(${Background})` }}
      className="flex items-center justify-center h-screen"
    >
      <div className="flex flex-col justify-evenly items-center bg-white rounded-3xl mb-24 w-1/4 h-1/2 border-2 border-purple-300">
        <h1
          style={{ WebkitTextStroke: "1px #b570fb" }}
          className="tracking-widest font-bold  text-white text-5xl "
        >
          INSTAHUB
        </h1>

        <form className="flex flex-col w-3/4">
          <input
            id="usernameEmailInput"
            type="text"
            placeholder="Username/Email"
            value={usernameEmail}
            onChange={(e) => setUsernameEmail(e.target.value)}
            className="py-5 px-2 rounded-md border mb-1 h-8 border-purple-300"
          />

          <input
            id="passwordInput"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="py-5 px-2 rounded-md border mb-2 h-8 border-purple-300"
          />

          {/* change from dots to text on password field */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              onClick={() => {
                const x = document.getElementById(
                  "passwordInput"
                ) as HTMLInputElement;
                x.type = x.type === "password" ? "text" : "password";
              }}
            />
            <h1 className="text-s">Show Password</h1>
          </div>

          {error && <p className="text-red-600 text-sm italic mt-1">{error}</p>}
          <button
            className="font-bold rounded-full border-2 border-purple-300 mt-8 mb-2 py-3 px-20 hover:bg-purple-100"
            type="button"
            onClick={() => login(usernameEmail, password, setError)}
          >
            LOG IN
          </button>
          <Link to="/signup">
            <p className="text-center text-blue-600 text-sm hover:underline ">
              Don't have an account?
            </p>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
