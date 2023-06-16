import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import RoutinePage from "./components/RoutinePage";
import SingleRoutinePage from "./components/SingleRoutinePage";
import CreateRoutine from "./components/RoutinePage/CreateRoutine";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/routines/create">
            <CreateRoutine />
          </Route>
          <Route path="/routines/:id">
            <SingleRoutinePage />
          </Route>
          <Route path="/routines">
            <RoutinePage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
