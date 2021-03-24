import "../components/Homepage.css";
import React, { useContext } from "react";
import styled from "styled-components";
import { WorldDataContext } from "./WorldDataContext";
import WorldMap from "./WorldMap";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { FormControl, InputLabel } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Fragment } from "react";
import { Footer } from "./Footer";

const rounded = (num) => {
  if (num > 1000000000) {
    return Math.round(num / 100000000) / 10 + "Bn";
  } else if (num > 1000000) {
    return Math.round(num / 100000) / 10 + "M";
  } else if (num > 999) {
    return Math.round(num / 100) / 10 + "K";
  } else {
    return num;
  }
};

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
    color: "black",
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

const HomePage = () => {
  const wrapperRef = React.useRef(null);

  const formatedNum = (num) => {
    return new Intl.NumberFormat("en").format(num);
  };

  const classes = useStyles();
  const {
    data,
    country,
    isLoading,
    getSpecificCountry,
    coordinates,
    zoomScale,
    formValue,
  } = useContext(WorldDataContext);
  const dateUpdate = new Date(country?.updated).toLocaleString();
  const todayCases = rounded(country?.todayCases);
  const todayDeaths = rounded(country?.todayDeaths);
  const todayRecovered = rounded(country?.todayRecovered);

  return (
    <Fragment>
      <Wrapper>
        <CountryContainer>
          <FormControl className={classes.formControl}>
            <InputLabel className={classes.CountryLabel}>Country</InputLabel>
            <Select
              ref={wrapperRef}
              className={classes.formControl}
              value={formValue}
              onChange={(e) => {
                getSpecificCountry(e.target.value);
              }}
            >
              {isLoading ? (
                <MenuItem value=""></MenuItem>
              ) : (
                data?.map((item, index) => {
                  return (
                    <MenuItem
                      className={classes.MenuItem}
                      key={index}
                      value={item.country}
                    >
                      <Flag
                        style={{ marginRight: "10px" }}
                        src={item.countryInfo.flag}
                        alt="flag"
                      />
                      {item.country}
                    </MenuItem>
                  );
                })
              )}
            </Select>
          </FormControl>

          {country ? (
            <CountryWrapper>
              <ImgWrapper>
                <Flag src={country?.countryInfo.flag} />
                <div style={{ "padding-left": "1rem" }}>{country?.country}</div>
              </ImgWrapper>

              <p>Last update : {dateUpdate}</p>
              <InfoBoxes>
                <CountryStats>
                  <h3>
                    Total cases :<br></br> {formatedNum(country?.cases)}
                  </h3>
                  <Stats className={country?.todayCases > 0 ? "red" : "green"}>
                    +{todayCases}
                  </Stats>
                </CountryStats>
                <CountryStats>
                  <h3>
                    Total deaths :<br></br> {formatedNum(country?.deaths)}
                  </h3>
                  <Stats className={country?.todayDeaths > 0 ? "red" : "green"}>
                    +{todayDeaths}
                  </Stats>
                </CountryStats>
                <CountryStats>
                  <h3>
                    Total recovered :<br></br> {formatedNum(country?.recovered)}
                  </h3>
                  <Stats
                    className={country?.todayRecovered > 0 ? "green" : "red"}
                  >
                    +{todayRecovered}
                  </Stats>
                </CountryStats>
              </InfoBoxes>
            </CountryWrapper>
          ) : (
            <div>👆🏼 Select a Country 👆🏼 </div>
          )}
        </CountryContainer>
        <WorldContainer>
          <WorldMap
            data={data}
            country={country}
            coordinates={coordinates}
            zoomScale={zoomScale}
          />
        </WorldContainer>
        <Footer />
      </Wrapper>
    </Fragment>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: row;
  height: 70vh;
  padding: 2rem;
  @media (max-width: 768px) {
    flex-direction: column;
    height: 100%;
  }
`;

const CountryContainer = styled.div`
  padding: 0 1rem;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Flag = styled.img`
  border-radius: 50%;
  height: 1rem;
  width: 1rem;
`;

const CountryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const ImgWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-self: center;
  align-items: center;
`;

const InfoBoxes = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
`;

const CountryStats = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 0.5rem 0;

  h3 {
    color: black;
  }
  @media (max-width: 768px) {
    margin: 0.5rem 0;
  }
`;

const Stats = styled.span`
  font-weight: bolder;
  font-size: 1.2rem;
`;

const WorldContainer = styled.div`
  margin: 0 auto;
  width: 100%;

  @media (max-width: 768px) {
    margin-top: 1rem;
    height: 600px;
  }
`;

export default HomePage;
