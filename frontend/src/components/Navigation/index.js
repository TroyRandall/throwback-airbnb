import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import CreateSpotButton from "../createSpotButton";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import logo from '../../assets/images.png';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);


     return (
    <ul className="nav">
        <NavLink exact to="/" id='nav-link'>
          <img src={logo} alt="home-button" href="" className="logo"></img>
        </NavLink>
        {(sessionUser && <CreateSpotButton />)}
        {isLoaded && (<ProfileButton user={sessionUser}/>)}
    </ul>
  );
}

export default Navigation;
