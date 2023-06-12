import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import * as sessionActions from "../../store/session";
import './loginButton.css';

function LoginButton() {
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const overlayRef = useRef();
  const logInRef = useRef();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const sessionUser = useSelector((state) => state.session.user);

  if (sessionUser)  history.push("/");

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  useEffect(() => {
    const closeModal = (e) => {
      if (logInRef.current.contains(e.target)) {
        setErrors({});
        return dispatch(sessionActions.login({ credential, password })).catch(
          async (res) => {
            const data = await res.json();
            if (data) setErrors(data);
          }
        );
      } else if (!overlayRef.current.contains(e.target)) {
        setCredential('')
        setPassword('')
        setErrors({})
        setModal(false);
      }
    };
    if (modal) {
      document.addEventListener("click", closeModal);

      return () => document.removeEventListener("click", closeModal);
    }
  }, [modal, credential, dispatch, password]);

  const checkInputs = () => {
    if((password.length > 5) && (credential.length > 3)) return true;
    else return false;
  }

  const toggleModal = (e) => {
    e.preventDefault();
    setModal(true);
  };

  const demoUserSignin = () => {
    return dispatch(sessionActions.login({
      credential: 'Demo-lition',
      password: 'password'
    }))
  }

  const checkErrors = () => {
    console.log(errors)
     let newErrors = {};
    newErrors=errors.message;
    return (newErrors && (newErrors));
 }



  const submitId = 'submit-button' + (checkInputs() ? '' : '-disabled')

  const allErrors = checkErrors();

  const UlClassName = "overlay" + (modal ? "" : "hidden");
  const checkModal = () => {
    if (modal === true) {
      return (
        <div className={UlClassName} onClick={toggleModal}>
          <div className="overlay"></div>
          <div className="modal-content" ref={overlayRef}>
            <h2 id="header">Log In</h2><label id='errors-login'>{allErrors}</label>
            <form onSubmit={handleSubmit} id='login-form'>
                <label id="credential-label">
                  <input
                    id="credential-input"
                    type="text"
                    value={credential}
                    onChange={(e) => setCredential(e.target.value)}
                    required
                    placeholder='Username or Email'
                  />
                </label>
                <label id="password-label">
                  <input
                    id="password-input"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder='Password'
                  />
                </label>

              {errors.credential && <p>{errors.credential}</p>}
            </form>
       <button type="submit" id={submitId} ref={logInRef}>
            Log In
          </button>
          <label id='demo-user-sign-in' onClick={demoUserSignin}>Demo User</label>
          </div>

        </div>
      );
    }
  };

  return (
    <>
      <button onClick={toggleModal} id='login-button'>Log In</button>
      <div>{checkModal()}</div>
    </>
  );
}

export default LoginButton;
