import React from "react";
import styled from "styled-components";
import HomePage from "./components/HomePage";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Country from "./components/Country";
import { SignUp } from "./auth-pages/signup";
import LogIn from "./auth-pages/login";
import UserPage from "./components/UserPage";
import Header from "./components/Header";
import GlobalStyles from "./constants/GlobalStyles";

function App() {
  return (
    <BrowserRouter>
      <Wrapper>
        <GlobalStyles />
        <Header />
        <Switch>
          <Route path="/sign-in">
            <LogIn />
          </Route>
          <Route path="/sign-up">
            <SignUp />
          </Route>
          <Route path="/myPage/:userId">
            <UserPage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
          <Route path="/:country/:days">
            <Country />
          </Route>
        </Switch>
      </Wrapper>
    </BrowserRouter>
  );
}

export default App;

const Wrapper = styled.div`
  font-size: 16px;
  text-align: center;
  width: 100%;
  margin: 0 auto;
  max-width: 960px;
`;
