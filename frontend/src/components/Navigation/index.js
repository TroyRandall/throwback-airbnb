import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import CreateSpotButton from "../createSpotButton";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className="navLinks">
         <li >
          <CreateSpotButton />
        </li>
        <li className='profileButton'>
          <ProfileButton user={sessionUser}/>
        </li>

      </div>
    );
  } else {
    sessionLinks = (
      <li className="navLinks">
        <NavLink to="/login" className="login">
          Log In
        </NavLink>
        <NavLink to="/signup" className="signup">
          Sign Up
        </NavLink>
      </li>
    );
  }

  return (
    <ul className="nav">
      <li>
        <NavLink exact to="/">
          Home
        </NavLink>
      </li>
      {isLoaded && sessionLinks}
    </ul>
  );
}

export default Navigation;
