import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom'
import * as sessionActions from "../../store/session";
import './signUpButton.css';

function SignUpButton () {
const history = useHistory();
const dispatch = useDispatch();
const signUpRef = useRef('');
const modalRef = useRef('')

const [signUpModal, setSignUpModal] = useState(false);
const sessionUser = useSelector((state) => state.session.user);
const [email, setEmail] = useState("");
const [username, setUsername] = useState("");
const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [errors, setErrors] = useState({});


const toggleSignUpModal = (e) => {
    e.preventDefault();
    setSignUpModal(true);
}

const checkValues = () => {
  const values = [email, username, firstName, lastName, password, confirmPassword]
  for(let i = 0; i < values.length; i++) {
    if(values[i] === "" ){
      return 'sign-up-button-disabled'
    }
  }
  return 'sign-up-button-enabled';
}

useEffect(() => {

    const closeSignUpModal = (e) => {
        if(signUpRef.current.contains(e.target)) {
            if (password === confirmPassword) {
                setErrors({});
                return dispatch(
                  sessionActions.signup({
                    email,
                    username,
                    firstName,
                    lastName,
                    password,
                  })
                ).catch(async (res) => {
                  const data = await res.json();
                  if (data && data.errors) {
                    setErrors(data.errors);
                  }
                });
              }
              return setErrors({
                confirmPassword: "Confirm Password field must be the same as the Password field"
              });
            } else if(!(modalRef.current.contains(e.target))) {
                setSignUpModal(false);
            }
        };

        if(signUpModal) {
            document.addEventListener('click', closeSignUpModal);

            return () => document.removeEventListener('click', closeSignUpModal);
    }});


if(sessionUser) history.push('/');
const SUClassName = "overlay" + (signUpModal ? "" : "hidden");

const buttonClassName = checkValues()
const checkSignUpModal = () => {
if(signUpModal === true) {
    return (
        <>
        <div className={SUClassName} >
          <div className="overlay"></div>
          <div className="modal-signup-content" ref={modalRef}>
        <h1>Sign Up</h1>
      <form id='sign_up_form'>
        <label>
          Email
          </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder='Email required'
          />

        {errors.email && <p>{errors.email}</p>}
        <label>
          Username
           </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder='Username required'
          />

        {errors.username && <p>{errors.username}</p>}
        <label>
          First Name
          </label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            placeholder='First name required'
          />

        {errors.firstName && <p>{errors.firstName}</p>}
        <label>
          Last Name
          </label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            placeholder='Last name required'
          />

        {errors.lastName && <p>{errors.lastName}</p>}
        <label>
          Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder='Password required'
            autoComplete='new-password'
          />

        {errors.password && <p>{errors.password}</p>}
        <label>
          Confirm Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder='Confirmed Password required'
            autoComplete='new-password'
          />

        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        <button className={buttonClassName} ref={signUpRef}>Sign Up</button>
      </form>
      </div>
      </div>
      </>
    )
}
}
    return (
        <>
           <button type="submit" className='sign-up-button' onClick={toggleSignUpModal}>Sign Up</button>
            <div>{checkSignUpModal()}</div>
        </>
    )
}

export default SignUpButton;
