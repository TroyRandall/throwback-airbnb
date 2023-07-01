
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";

import * as sessionActions from '../../store/session';
import './Navigation.css'
import LoginButton from '../loginButton';
import SignUpButton from '../signUpButton';

function ProfileButton({ user }) {

    const history = useHistory();
    const dispatch = useDispatch();
    const ulRef = useRef();
    const sessionUser = useSelector((state) => state.session.user)
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
      if (showMenu) return;
      setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!(ulRef.current.contains(e.target))) {
              setShowMenu(false);
            }
      };

        document.addEventListener('click', closeMenu);

        return () => {
          setShowMenu(false);
          document.removeEventListener("click", closeMenu);
        }
      }, [showMenu, sessionUser]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    return history.push('/');
  };

  const redirect = (e) => {
    e.preventDefault();
    history.push('/mycollection');
  }
  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <><div id='profile_button_container'>
      <button onClick={openMenu} className='profileButton'>
        <i className="fas fa-user-circle" />
      </button>
      {(sessionUser && (
      <ul className={ulClassName} ref={ulRef}>
        <li>Hello, {user.firstName}</li>
        <li>{user.email}</li>
        <li>
          <button onClick={redirect} id='manage-spots-button'>Manage Spots</button>
        </li>
        <li>
          <button onClick={logout} id='log-out-button'><span>Log Out</span><i></i></button>
        </li>
      </ul>))}{(!sessionUser && (
        <ul className={ulClassName} ref={ulRef}>
          <li>
            <LoginButton />
          </li>
          <li>
            <SignUpButton />
          </li>
        </ul>

      ))}
      </div>
    </>
  );
}

export default ProfileButton;
