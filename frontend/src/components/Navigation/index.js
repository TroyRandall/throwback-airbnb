import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import CreateSpotButton from "../createSpotButton";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import LoginButton from '../loginButton';
import logo from '../../assets/images.png';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className="navLinks">
         <div>
          <CreateSpotButton />
         </div>
        <div className='profileButton'>
          <ProfileButton user={sessionUser}/>
        </div>

      </div>
    );
  } else {
    sessionLinks = (
      <div className="navLinks">
      <LoginButton />
        <NavLink to="/signup" className="signup">
          Sign Up
        </NavLink>
      </div>
    );
  }

  return (
    <ul className="nav">
      <div>
        <NavLink exact to="/">
          <img src={logo} alt='home-button' href='' className='logo'></img>
        </NavLink>
      </div>


      {isLoaded && sessionLinks}
    </ul>
  );
}

export default Navigation;
