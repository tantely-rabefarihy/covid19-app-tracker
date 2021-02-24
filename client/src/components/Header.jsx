import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Container,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PublicIcon from "@material-ui/icons/Public";
import { useHistory } from "react-router-dom";
import { useFirestoreUser } from "../auth-pages/user-provider";
import styled from "styled-components";

const useStyles = makeStyles({
  navbarDisplayFlex: {
    display: `flex`,
    justifyContent: `space-between`,
  },
  navDisplayFlex: {
    display: `flex`,
    justifyContent: `space-between`,
  },
  linkText: {
    textDecoration: `none`,
    textTransform: `uppercase`,
    color: `white`,
    margin: `0 auto`,
    // padding: "0",
  },

  appBar: {
    backgroundColor: "#282828",
    display: "flex",
  },
});

const navLinks = [
  { title: `Sign Up`, path: `/sign-up` },
  { title: `Login`, path: `/sign-in` },
];

const Header = () => {
  const { fireStoreUser } = useFirestoreUser();

  const history = useHistory();
  const handleRedirection = () => {
    history.push("/");
  };
  const classes = useStyles();
  // console.log({ fireStoreUser });
  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <Container maxWidth="md" className={classes.navbarDisplayFlex}>
          <IconButton
            onClick={handleRedirection}
            edge="start"
            color="inherit"
            aria-label="home"
          >
            <PublicIcon fontSize="large" />
          </IconButton>
          <List
            component="nav"
            aria-labelledby="main navigation"
            className={classes.navDisplayFlex}
          >
            {navLinks.map(({ title, path }) => (
              <Link href={path} key={title} className={classes.linkText}>
                <ListItem button>
                  <ListItemText primary={title} />
                </ListItem>
              </Link>
            ))}
            {fireStoreUser !== null ? (
              <Link
                href={`/myPage/${fireStoreUser?.uid}`}
                className={classes.linkText}
              >
                <ListItem button>
                  <ListItemText primary="My Account" />
                </ListItem>
              </Link>
            ) : (
              <></>
            )}
          </List>
        </Container>
      </Toolbar>
    </AppBar>
  );
};
export default Header;

const Link = styled.a`
  text-transform: capitalize;
  display: inline-block;
  font-weight: 100;
  margin-right: 0.1rem;
  letter-spacing: 3px;
  font-size: 1.2rem;
  padding: 0.25rem 0.5rem;
  transition: all 0.3s linear;
  position: relative;

  &:after {
    background: none repeat scroll 0 0 transparent;
    bottom: 10px;
    content: "";
    display: block;
    height: 2px;
    left: 50%;
    position: absolute;
    background: rgb(255, 255, 255);
    transition: width 0.3s ease 0s, left 0.3s ease 0s;
    width: 0;
  }

  &:hover:after {
    color: whitesmoke;
    width: 100%;
    left: 0;
  }
`;
