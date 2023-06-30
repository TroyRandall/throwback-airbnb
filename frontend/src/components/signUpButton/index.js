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

const checkValues = () => {
  let values = [email, username, firstName, lastName, password, confirmPassword]
  let empty = false;
  for(let i = 0; i < values.length; i++) {
    console.log(values[i]);
    if(values[i] === "" ){
      empty = true;
    }
  }
  return 'sign-up-button' + (empty ? '-enabled' : '-disabled');
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

const checkErrors = () => {
  let newErrors;
  if(errors === {}) return null;
  Object.values(errors).forEach(error => {
    if(error.includes('Firstname')) errors.firstname = error;
    if(error.includes('Lastname')) errors.lastname = error;
    if(error.includes('Username' || 'username' )) errors.username = error;
    if(error.includes('Password')) errors.password = error;
    if(error.includes('email')) errors.email = error;
  })
  return newErrors
}



const buttonClassName = checkValues()
const checkSignUpModal = () => {
if(signUpModal === true) {
    return (
        <>
        <div className={SUClassName} >
          <div className="overlay"></div>
          <div className="modal-signup-content" ref={modalRef}>
        <h1 id='sign-up-title'>Sign Up</h1>
{errors.password && <p id='errors-errors'>{errors?.errors}</p>}


            <input
          id='email-input'
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder='Email required'
          />


          <input
          id='username-input'
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder='Username required'
          />


          <input
          id='firstname-input'
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            placeholder='First name required'
          />



          <input
          id='lastname-input'
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            placeholder='Last name required'
          />



          <input
          id='password-input-signup'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder='Password required'
            autoComplete='new-password'
          />



          <input
          id='confirm-password-input'
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder='Confirmed Password required'
            autoComplete='new-password'
          />


        <button className={buttonClassName} ref={signUpRef} id='sign-up-button'>Sign Up</button>
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
