import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector,  } from "react-redux";

import CreateSpotButton from "../createSpotButton";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import logo from '../../assets/images.png';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const [titleToggle, setTitleToggle] = useState(true);


  useEffect(() => {


    // const btn = document.getElementById('darkMode');
    // const inputs = document.getElementsByClassName('darkModeTexts');
    // btn.addEventListener('click', (e) => {
    //   e.stopPropagation();
    //   console.log(document.body.classList.contains('darkMode'))
    //   if(document.body.classList.contains('darkMode')){
    //     console.log('removing')
    //     document.body.classList.remove('darkMode');
    //     Array.prototype.forEach.call(inputs, (input) => {
    //       input.classList.remove('darkModeInput')
    //     })
    //   } else {
    //     console.log('adding');
    //     document.body.classList.add('darkMode');
    //     Array.prototype.forEach.call(inputs, (input) => {
    //       input.classList.add('darkModeInput')
    //     })
    //   }
    // })


  })
  const toggleTitleAnimation = (e) => {
    e.stopPropagation();
    setTitleToggle(!titleToggle);
  }


const titleClass = (titleToggle ? 'transform-title' : 'regular-title')
     return  isLoaded && (
    <ul className="nav">
        <NavLink exact to="/" id='nav-link'>
          <img src={logo} alt="home-button" href="" className="logo"></img>
        </NavLink>
        {/* <label  className='darkModeButton' >
        <input id='darkMode' type='checkbox'></input>
        <span className='style-check'></span></label>
        <div></div> */}

        <h3 id={titleClass} onClick={toggleTitleAnimation} >Throwback-BnB</h3>
        {(sessionUser && <CreateSpotButton />)}
        {isLoaded && (<ProfileButton user={sessionUser}/>)}
    </ul>
  );
}

export default Navigation;
