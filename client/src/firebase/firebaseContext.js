import React, { createContext } from "react";
import firebase from "firebase/app";
import "firebase/firebase-auth";
import "firebase/firestore";
import { firebaseConfig } from "./firebase-config";
import { db } from "./firebase";

export const FirebaseContext = createContext(null);

export const FirebaseProvider = ({ children }) => {
  //   firebase.initializeApp(firebaseConfig);
  //   const db = firebase.firestore();

  return (
    <FirebaseContext.Provider value={(db, firebase)}>
      {children}
    </FirebaseContext.Provider>
  );
};
