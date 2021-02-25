import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Logout from "../auth-pages/logout";
import { useFirestoreUser } from "../auth-pages/user-provider";
import Country from "./Country";
import UserChart from "./UserChart";
import firebase, { db } from "../firebase/";

const UserPage = () => {
  const [userSession, setUserSession] = useState();
  const { fireStoreUser } = useFirestoreUser();

  const history = useHistory();
  const homeRedirect = () => {
    history.push("/");
  };

  useEffect(() => {
    let userListener = firebase.auth().onAuthStateChanged((user) => {
      user ? setUserSession(user) : homeRedirect();
    });

    return () => {
      userListener();
    };
  }, [fireStoreUser]);

  // console.log({ userSession });

  return (
    <Wrapper>
      {!userSession === undefined ? (
        <></>
      ) : (
        <>
          <Logout />
          <Country />
          <UserChart fireStoreUser={fireStoreUser} />
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 20px auto;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export default UserPage;
