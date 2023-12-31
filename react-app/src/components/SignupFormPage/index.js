import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { signUp } from "../../store/session";
import { useModal } from "../../context/Modal";
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal()
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [gender, setGender] = useState("")
  const [phone, setPhone] = useState("")
  const [birthday, setBirthday] = useState("")
  const [status, setStatus] = useState("")
  const [enrolled, setEnrolled] = useState("")
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});


  const emailValidation = (email) => {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
  };

  useEffect(() => {
    const errors = {};
    if (!emailValidation(email)) errors.email = "Not a valid email address";
    if (!firstName || firstName.trim().length > 50 || firstName.trim().length < 2)
      errors.firstName = "First name must be between 2 characters and 50 characters";
    if (!lastName || lastName.trim().length > 50 || lastName.trim().length < 2)
      errors.lastName = "Last name must be between 2 characters and 50 characters";
    if (!password || password.length < 6)
      errors.password = "Password must be at least 6 characters";
    if (password !== confirmPassword) errors.confirmPassword = "Password must match"
    if (!phone || phone.replace(/-/g, '').length !== 10) errors.phone = "Must be a valid US Number"
    if (!username) errors.username = "Username is required"
    if (username.trim().length < 6) errors.username = "Username must at least 6 characters"
    const today = new Date();
    const selectedDate = new Date(birthday);

    const todayUTC = new Date(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate());
    const selectedDateUTC = new Date(selectedDate.getUTCFullYear(), selectedDate.getUTCMonth(), selectedDate.getUTCDate());


    // console.log("this is today", todayUTC)
    // console.log("this is birthday", selectedDateUTC)
    if (selectedDateUTC >= todayUTC) {
      errors.birthday = "Birthday cannot be today or in the future";
    }
    setErrors(errors)
  }, [username, email, password, confirmPassword, firstName, lastName, gender, phone, birthday]);

  if (sessionUser) return <Redirect to="/" />;



  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitted(true);

    let formErrors = {};
    if (!emailValidation(email)) formErrors.email = "Not a valid email address";
    if (!firstName || firstName.trim().length > 50 || firstName.trim().length < 2)
      formErrors.firstName = "First name must be between 2 characters and 50 characters";
    if (!lastName || lastName.trim().length > 50 || lastName.trim().length < 2)
      formErrors.lastName = "Last name must be between 2 characters and 50 characters";
    if (!password || password.length < 6)
      formErrors.password = "Password must be at least 6 characters";
    if (password !== confirmPassword) formErrors.confirmPassword = "Password must match";
    if (!phone || phone.replace(/-/g, '').length !== 10) formErrors.phone = "Must be a valid US Number";
    if (!username) formErrors.username = "Username is required";
    if (username.trim().length < 6) formErrors.username = "Username must be at least 6 characters";

    // If there are any errors in the form fields, do not proceed with form submission
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    // If there are no errors in the form fields, proceed with the form submission
    const data = await dispatch(signUp(firstName, lastName, email, password, username, gender, phone, birthday));
    if (data) {
      const serverErrors = {};
      data.forEach(error => {
        if (error.startsWith("email")) {
          serverErrors.email = error.split(":")[1];
        }
        if (error.startsWith("username")) {
          serverErrors.username = error.split(":  ")[1];
        }
      });
      setErrors(serverErrors);
    } else {
      return history.push("/");
    }
  };




  return (
    <div className="login-container-2">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        {errors.firstName && submitted && (
          <p className="sign-in-errors" style={{ marginTop: "10px" }}>{errors.firstName}</p>
        )}
        <div className="txt_field">
          <label>
            First Name
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </label>
        </div>
        {errors.lastName && submitted && (
          <p className="sign-in-errors">{errors.lastName}</p>
        )}
        <div className="txt_field">
          <label>
            Last Name
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </label>
        </div>
        {errors.email && submitted && (
          <p className="sign-in-errors">{errors.email}</p>
        )}
        <div className="txt_field">
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
        </div>
        {errors.gender && submitted && (
          <p className="sign-in-errors">{errors.gender}</p>
        )}
        <div className="txt_field">
          <label>
            Gender
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="">Select</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="O">Others</option>
            </select>
          </label>
        </div>
        {errors.birthday && submitted && (
          <p className="sign-in-errors">{errors.birthday}</p>
        )}
        <div className="txt_field">
          <label>
            Birthday
            <input
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              required
            />
          </label>
        </div>
        {errors.phone && submitted && (
          <p className="sign-in-errors">{errors.phone}</p>
        )}
        <div className="txt_field">
          <label>
            Phone
            <input
              type="text"
              value={phone}
              onChange={(e) => {
                const input = e.target.value;
                const formattedInput = input
                  .replace(/\D/g, "")
                  .slice(0, 10)
                  .replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
                setPhone(formattedInput);
              }}
              required
            />
          </label>
        </div>
        {errors.username && submitted && (
          <p className="sign-in-errors">{errors.username}</p>
        )}
        <div className="txt_field">
          <label>
            Username
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
        </div>
        {errors.password && submitted && (
          <p className="sign-in-errors">{errors.password}</p>
        )}
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
        {errors.confirmPassword && submitted && (
          <p className="sign-in-errors">{errors.confirmPassword}</p>
        )}
        <div className="txt_field">
          <label>
            Confirm Password
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="bottom-login">
          <button id="signup-btn" type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  );
}

export default SignupFormPage;
