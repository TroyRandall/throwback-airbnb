import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import CreateSpotButton from "../createSpotButton";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import logo from '../../assets/images.png';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const [titleToggle, setTitleToggle] = useState(true);

  const toggleTitleAnimation = () => {
    setTitleToggle(!titleToggle);
  }

const titleClass = (titleToggle ? 'transform-title' : 'regular-title')
     return  isLoaded && (
    <ul className="nav">
        <NavLink exact to="/" id='nav-link'>
          <img src={logo} alt="home-button" href="" className="logo"></img>
        </NavLink>
        <h3 id={titleClass} onClick={toggleTitleAnimation} >Throwback-BnB</h3>
        {(sessionUser && <CreateSpotButton />)}
        {isLoaded && (<ProfileButton user={sessionUser}/>)}
    </ul>
  );
}

export default Navigation;
