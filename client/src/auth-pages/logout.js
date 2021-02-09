import React, { useState, useEffect } from "react";
import "../auth-pages/logout.css";
import firebase from "../firebase";
import { useFirestoreUser } from "../auth-pages/user-provider";
import styled from "styled-components";

const Logout = () => {
  const [checked, setChecked] = useState(false);
  const { setFireStoreUser } = useFirestoreUser();
  // Handling page redirection once user is logged out

  useEffect(() => {
    if (checked) {
      console.log("Logged Out! ✅");
      setFireStoreUser(null);
      setTimeout(() => {
        firebase.auth().signOut();
      }, 1000);
    }
  }, [checked]);

  const handleChange = (e) => {
    setChecked(e.target.checked);
  };

  return (
    <Slider>
      <p>LOG OUT</p>
      <label className="switch">
        <input onChange={handleChange} type="checkbox" checked={checked} />
        <span className="slider round"></span>
      </label>
    </Slider>
  );
};

const Slider = styled.div`
  align-self: flex-end;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-right: 30px;
  p {
    margin-right: 10px;
  }
`;

export default Logout;
