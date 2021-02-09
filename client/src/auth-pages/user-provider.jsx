import React, { createContext, useState, useEffect, useContext } from "react";
import firebase, { db } from "../firebase";

const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [fireStoreUser, setFireStoreUser] = useState(null);

  //   GET A SNAPSHOT OF USER FROM FIRESTORE
  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (authState) => {
      if (authState) {
        const usersCollection = db.collection("users");
        const userSnapshot = await usersCollection.doc(authState.uid).get();
        const user = userSnapshot.data();
        setFireStoreUser({ ...user, uid: authState.uid });
      }
    });
  }, []);

  //   CHECK IF THERE IS A CURRENT USER
  //   useEffect(() => {
  //     let userListener = firebase.auth().onAuthStateChanged((user) => {
  //       user ? setUserSession(user) : homeRedirect();
  //     });

  //     return () => {
  //       userListener();
  //     };
  //   }, [userSession]);

  console.log({ fireStoreUser });
  return (
    <UserContext.Provider
      value={{
        fireStoreUser,
        setFireStoreUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useFirestoreUser = () => {
  return useContext(UserContext);
};
