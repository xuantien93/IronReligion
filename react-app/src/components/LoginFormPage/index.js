import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './LoginForm.css';
import { useHistory } from "react-router-dom";

function LoginFormPage() {
  const dispatch = useDispatch();
  const history = useHistory()
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data[0].split(":")[1]);
    }
  };

  const demoUser = (e) => {
    e.preventDefault()
    dispatch(login("demo@aa.io", "password"))
  }

  return (
    <div className="login-container">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <span id="login-error">

          <p style={{ color: "red" }}>{errors}</p>

        </span>
        <div className="txt_field">
          <label>
            Email
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="txt_field">
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="bottom-login">
          <button type="submit">Log In</button>
          <button onClick={demoUser} className="demo-button">Demo User</button>
          <span>Not a member? <span id="login-signup" onClick={() => history.push("/signup")}> Signup</span></span>
        </div>
      </form >
    </div >
  );
}

export default LoginFormPage;
