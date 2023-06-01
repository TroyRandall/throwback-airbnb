import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/loginFormPage";
import SignupFormPage from "./components/signUpFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation"
import AllSpotsPage from "./components/Spots"
import SpotsById from "./components/SpotsById"


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    isLoaded && (
    <>
      <Navigation isLoaded={isLoaded}/>
    <Switch>
      <Route path='/login'>
        <LoginFormPage />
      </Route>
      <Route path="/signup">
          <SignupFormPage />
      </Route>
      <Route exact path="/">
        <AllSpotsPage />
      </Route>
      <Route path = "/spots/:id">
        <SpotsById />:
      </Route>
    </Switch>
    </>
    )
  );
}

export default App;
