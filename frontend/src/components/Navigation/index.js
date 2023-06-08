import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import CreateSpotButton from "../createSpotButton";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
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
        <div>
          <ProfileButton user={sessionUser}/>
        </div>

      </div>
    );
  } else {
    sessionLinks = (
      <div >
      <ProfileButton />
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
