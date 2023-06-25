import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import SignupFormPage from "../SignupFormPage";
import { useHistory } from "react-router-dom";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory()
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    closeMenu()
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <div className="my-account" onClick={openMenu}>
        My Account
      </div>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <div className="user-menu-content">
            <span>Hi {user.username}</span>
            <span>{user.email}</span>
            <span className="my-class-btn"
              onClick={() => {
                history.push("/bookings")
                closeMenu()
              }}
            >
              My Classes
            </span>
            <span className="my-class-btn"
              onClick={() => {
                history.push("/routines/me")
                closeMenu()
              }}
            >
              My Routines
            </span>

            <span id="logout-btn-cover">
              <button id="logout-btn" onClick={handleLogout}>Log Out</button>
            </span>
          </div>
        ) : (
          <div className="top-right-modal">
            <button onClick={() => {
              history.push("/login")
              closeMenu()
            }}>Login</button>

            <button onClick={() => {
              history.push("/signup")
              closeMenu()
            }}>Sign up</button>
          </div>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
