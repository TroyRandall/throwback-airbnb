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
const [errors, setErrors] = useState([]);


const toggleSignUpModal = (e) => {
    e.preventDefault();
    setSignUpModal(true);
}



useEffect(() => {

    const closeSignUpModal = (e) => {
      console.log(errors);
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
                setUsername('');
                setEmail('');
                setFirstName('');
                setLastName('');
                setPassword('');
                setConfirmPassword('');
                setErrors({});
            }
        };

        if(signUpModal) {
            document.addEventListener('click', closeSignUpModal);

            return () => document.removeEventListener('click', closeSignUpModal);
    }});


if(sessionUser) history.push('/');
const SUClassName = "overlay" + (signUpModal ? "" : "hidden");


const checkInputs = () => {
  if(email.length === 0) return false;
  if(username.length < 4) return false;
  if(firstName.length === 0) return false;
  if(lastName.length === 0) return false;
  if(password.length < 6) return false;
  if(confirmPassword < 6) return false;
  return true;
}


const checkSignUpModal = () => {
if(signUpModal === true) {
    return (
        <>
        <div className={SUClassName} >
          <div className="overlay"></div>
          <div className="modal-signup-content" ref={modalRef}>
        <h1 id='sign-up-title'>Sign Up</h1>
{<p id='errors-errors'>{Object.values(errors).map(error => <li>{error}</li>)}</p>}

            <label>Email
            <input
          id='email-input'
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder='Email required'
          /></label>

          <label>Username
          <input
          id='username-input'
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder='Username required'
          /></label>

          <label>First Name
          <input
          id='firstname-input'
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            placeholder='First name required'
          /></label>


          <label>Last Name
          <input
          id='lastname-input'
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            placeholder='Last name required'
          /></label>


          <label>Password
          <input
          id='password-input-signup'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder='Password required'
            autoComplete='new-password'
          /></label>


          <label>Confirm Password
          <input
          id='confirm-password-input'
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder='Confirmed Password required'
            autoComplete='new-password'
          /></label>


        <button className={checkInputs() ? 'btn' : ''} id={checkInputs() ? 'sign-up-button-enabled' : 'sign-up-button-disabled'} disabled = {checkInputs() ? false : true} ref={signUpRef} >Sign Up</button>
      </div>
      </div>
      </>
    )
}
}
    return (
        <>
           <button type="submit" id='sign-up-button' className='btn' onClick={toggleSignUpModal}>Sign Up</button>
            <div>{checkSignUpModal()}</div>
        </>
    )
}

export default SignUpButton;
