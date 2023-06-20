import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { signUp } from "../../store/session";
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});


  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (password === confirmPassword) {
  //     const data = await dispatch(signUp(username, email, password));
  //     if (data) {
  //       setErrors(data)
  //     }
  //   } else {
  //     setErrors(['Confirm Password field must be the same as the Password field']);
  //   }
  // };

  useEffect(() => {
    const errors = {};
    if (!emailValidation(email)) errors.email = "Not a valid email address";
    if (!password || password.length < 6)
      errors.password = "Password must be 6 characters";
    if (password !== confirmPassword) errors.confirmPassword = "Password must match"
    if (!username) errors.username = "Username is required"
    setErrors(errors)
  }, [username, email, password, confirmPassword]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitted(true);

    if (!Object.values(errors).length) {
      if (password === confirmPassword) {
        await dispatch(signUp(username, email, password));
        return history.push("/");
      }
    }
  };
  // const emailValidation = (email) => {
  //   return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
  // };

  // useEffect(() => {
  //   const errors = {};
  //   if (!firstName || firstName.trim().length > 50 || firstName.trim().length < 2)
  //     errors.firstName = "First name must be between 2 characters and 50 characters";
  //   if (!lastName || lastName.trim().length > 50 || lastName.trim().length < 2)
  //     errors.lastName = "Last name must be between 2 characters and 50 characters";
  //   if (!emailValidation(email)) errors.email = "Not a valid email address";
  //   if (!password || password.length < 6)
  //     errors.password = "Password must be 6 characters";
  //   if (password !== confirmPassword) errors.confirmPassword = "Password must match"
  //   if (!mobile || mobile.replace(/-/g, '').length !== 10) errors.mobile = "Must be a valid US Number"
  //   setErrors(errors);
  // }, [firstName, lastName, email, password, confirmPassword, mobile]);

  const emailValidation = (email) => {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
  };


  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        {errors.firstName && submitted && (
          <p className="sign-in-errors">{errors.email}</p>
        )}
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.firstName && submitted && (
          <p className="sign-in-errors">{errors.username}</p>
        )}
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {errors.firstName && submitted && (
          <p className="sign-in-errors">{errors.password}</p>
        )}
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.firstName && submitted && (
          <p className="sign-in-errors">{errors.confirmPassword}</p>
        )}
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
}

export default SignupFormPage;
