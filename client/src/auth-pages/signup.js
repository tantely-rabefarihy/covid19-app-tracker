import React, { useState } from "react";
import styled from "styled-components";
import {
  FormControl,
  makeStyles,
  TextField,
  IconButton,
  InputAdornment,
  Button,
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import clsx from "clsx";
import firebase, { db } from "../firebase";
import { Link, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    "& .MuiFormLabel-root": {
      color: "white",
    },
  },
  form: {
    width: "350px",
    marginTop: theme.spacing(6),
  },
  formControl: {
    width: "100%",
    marginBottom: theme.spacing(3),
  },
  input: {
    color: "white",
  },
}));

export const SignUp = () => {
  const classes = useStyles();
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errMsg, setErrMsg] = useState();

  const history = useHistory();
  const handleRedirection = (userId) => {
    history.push(`/myPage/${userId}`);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredentials = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      // console.log(userCredentials);

      await db.collection("users").doc(userCredentials.user.uid).set({
        displayName: userName,
        email: userCredentials.user.email,
        emailVerified: userCredentials.user.emailVerified,
        providerId: userCredentials.user.providerId,
      });
      handleRedirection(userCredentials.user.uid);
      // console.log("🎊 firestore doc written successfully 🎊");
    } catch (error) {
      setErrMsg(error.message);
      // console.log(error.message);
    }
  };

  // check if there is a new user, then redirect to their user page

  return (
    <div className={classes.root}>
      <h2 className={classes.root}>Welcome !</h2>
      <form className={classes.form} onSubmit={handleFormSubmit}>
        <FormControl className={clsx(classes.formControl)}>
          <TextField
            variant="filled"
            label="Username"
            type="text"
            value={userName}
            InputProps={{ className: classes.input }}
            onChange={(e) => setUserName(e.target.value)}
          />
        </FormControl>

        <FormControl className={clsx(classes.formControl)}>
          <TextField
            variant="filled"
            label="Email"
            type="text"
            value={email}
            InputProps={{ className: classes.input }}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl className={clsx(classes.formControl)}>
          <TextField
            variant="filled"
            label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputLabelProps={{ color: "white" }}
            InputProps={{
              className: classes.input,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </FormControl>

        <FormControl className={clsx(classes.formControl)}>
          <TextField
            variant="filled"
            label="Confirm Password"
            type={showPassword ? "text" : "password"}
            value={confPassword}
            onChange={(e) => setConfPassword(e.target.value)}
            InputProps={{
              className: classes.input,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </FormControl>

        {email === "" ||
        userName === "" ||
        password === "" ||
        confPassword === "" ||
        password !== confPassword ? (
          <Button type="submit" variant="contained" color="primary" disabled>
            SIGN UP
          </Button>
        ) : (
          <Button type="submit" variant="contained" color="primary">
            SIGN UP
          </Button>
        )}

        {errMsg ? <Error className={classes.root}>{errMsg}</Error> : <></>}

        <div className={classes.root}>
          <Link to="/sign-in">Already have an account ? Sign in here.</Link>
        </div>
      </form>
    </div>
  );
};

const Error = styled.p`
  border: 2px solid red;
  border-radius: 8px;
  color: red;
  padding: 20px;
`;
