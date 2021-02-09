import React, { useContext } from "react";
import styled from "styled-components";
import { WorldDataContext } from "./WorldDataContext";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
    color: "white",
  },
  CountryLabel: {
    color: "white",
    fontWeight: "bold",
  },
  MenuItem: {
    color: "black",
    marginRight: "5px",
  },
}));

const Country = () => {
  const classes = useStyles();
  const { data, isLoading, getCountryInfo, countryChoice } = useContext(
    WorldDataContext
  );

  return (
    <Wrapper>
      <Choose>Choose a country</Choose>
      <Select
        className={classes.formControl}
        value={countryChoice}
        onChange={(e) => {
          getCountryInfo(e.target.value);
        }}
      >
        <MenuItem className={classes.MenuItem} value={countryChoice}>
          {countryChoice}
        </MenuItem>
        {isLoading ? (
          <MenuItem></MenuItem>
        ) : (
          data?.map((item, index) => {
            return (
              <MenuItem
                className={classes.MenuItem}
                key={index}
                value={item.country}
              >
                {item.country}
              </MenuItem>
            );
          })
        )}
      </Select>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 20px 0;
`;

const Choose = styled.div`
  margin-bottom: 10px;
`;

export default Country;
