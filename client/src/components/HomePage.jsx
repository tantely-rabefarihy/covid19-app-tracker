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

  React.useEffect(() => {
    console.log(wrapperRef.current.focus());
  });
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
                <div>{country?.country}</div>
              </ImgWrapper>

              <InfoBoxes>
                <p>Last update : {dateUpdate}</p>
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
            <div>👆🏼 Select a country 👆🏼 </div>
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
      </Wrapper>
      <Footer />
    </Fragment>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`;

const CountryContainer = styled.div`
  padding: 10px 10px;
  height: auto;
  display: flex;
  flex-direction: column;
`;

const Flag = styled.img`
  border-radius: 50%;
  height: 30px;
  width: 30px;
  margin-right: 10px;
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
  margin-bottom: 20px;
`;
const InfoBoxes = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
`;

const CountryStats = styled.div`
  border: 2px solid white;
  background-color: white;
  height: 100%;
  border-radius: 8px;
  margin: 10px 0;
  h3 {
    color: black;
  }
`;

const Stats = styled.span`
  font-weight: bolder;
  font-size: 1.5rem;
`;

const WorldContainer = styled.div`
  margin: 0 auto;
  width: 100%;
  height: 100%;
`;

export default HomePage;
