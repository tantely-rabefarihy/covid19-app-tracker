import React, { useState } from "react";
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
import firebase from "../firebase";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

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

const LogIn = () => {
  const classes = useStyles();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errMsg, setErrMsg] = useState();
  //   userCredentials.user.uid = useParams();
  const history = useHistory();
  const handleRedirection = (userId) => {
    history.push(`/myPage/${userId}`);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredentials = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      // console.log(userCredentials.user.uid);
      // console.log("🎊 firestore found this user 🎊");
      handleRedirection(userCredentials.user.uid);
      //   history.push(`/myPage/${userCredentials.user.uid}`);
    } catch (error) {
      setErrMsg(error.message);
      console.log(error);
    }
  };

  return (
    <div className={classes.root}>
      <h2 className={classes.root}>Sign In</h2>
      <form className={classes.form} onSubmit={handleFormSubmit}>
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
        {errMsg ? <Error className={classes.root}>{errMsg}</Error> : <></>}

        <Button type="submit" variant="contained" color="primary">
          LOGIN
        </Button>
      </form>
    </div>
  );
};

const Error = styled.p`
  border: 2px solid red;
  color: red;
  padding: 20px;
`;

export default LogIn;
