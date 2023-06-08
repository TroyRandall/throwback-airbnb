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

const checkInputs = () => {
    if(!email) {
        <button onClick={toggleSignUpModal} disabled='disabled'>Sign Up</button>
    } else if (!username) {
        <button onClick={toggleSignUpModal} disabled='disabled'>Sign Up</button>
    } else if (!password) {
        <button onClick={toggleSignUpModal} disabled='disabled'>Sign Up</button>
    } else if (!firstName) {
        <button onClick={toggleSignUpModal} disabled='disabled'>Sign Up</button>
    } else if (!lastName) {
        <button onClick={toggleSignUpModal} disabled='disabled'>Sign Up</button>
    } else if (!email) {
        <button onClick={toggleSignUpModal} disabled='disabled'>Sign Up</button>
    } else if (!confirmPassword) {
        <button onClick={toggleSignUpModal} disabled='disabled'>Sign Up</button>
    } else {
        <button onClick={toggleSignUpModal}>Sign Up</button>
    }
}

const toggleSignUpModal = (e) => {
    e.preventDefault();
    setSignUpModal(true);
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
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {errors.username && <p>{errors.username}</p>}
        <label>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        {errors.firstName && <p>{errors.firstName}</p>}
        <label>
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        {errors.lastName && <p>{errors.lastName}</p>}
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        <button type="submit" ref={signUpRef} className='submit-button'>Sign Up</button>
      </form>
      </div>
      </div>
      </>
    )
}
}
    return (
        <>
            <>{checkInputs()}</>
            <div>{checkSignUpModal()}</div>
        </>
    )
}

export default SignUpButton;
