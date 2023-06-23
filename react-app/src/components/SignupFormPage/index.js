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
      errors.password = "Password must be 6 characters";
    if (password !== confirmPassword) errors.confirmPassword = "Password must match"
    if (!phone || phone.replace(/-/g, '').length !== 10) errors.phone = "Must be a valid US Number"
    if (!username) errors.username = "Username is required"
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

    if (!Object.values(errors).length) {
      if (password === confirmPassword) {
        await dispatch(signUp(firstName, lastName, email, password, username, gender, phone, birthday));
        closeModal()
        return history.push("/");
      }
    }
  };




  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        {errors.firstName && submitted && (
          <p className="sign-in-errors">{errors.firstName}</p>
        )}
        <label>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        {errors.lastName && submitted && (
          <p className="sign-in-errors">{errors.lastName}</p>
        )}
        <label>
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        {errors.email && submitted && (
          <p className="sign-in-errors">{errors.email}</p>
        )}
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.gender && submitted && (
          <p className="sign-in-errors">{errors.gender}</p>
        )}
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
        {errors.birthday && submitted && (
          <p className="sign-in-errors">{errors.birthday}</p>
        )}
        <label>
          Birthday
          <input
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            required
          />
        </label>
        {errors.phone && submitted && (
          <p className="sign-in-errors">{errors.phone}</p>
        )}
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
        {errors.username && submitted && (
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
        {errors.password && submitted && (
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
        {errors.confirmPassword && submitted && (
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
