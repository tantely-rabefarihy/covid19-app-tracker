import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { WorldDataProvider } from "./components/WorldDataContext";
import { FirebaseProvider } from "./firebase/";
import { UserProvider } from "./auth-pages/user-provider";
ReactDOM.render(
  <React.StrictMode>
    <WorldDataProvider>
      <FirebaseProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </FirebaseProvider>
    </WorldDataProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
