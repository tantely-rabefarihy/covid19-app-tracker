import { Circle, Tooltip } from "react-leaflet";
import styled from "styled-components";
import "../helpers/helpers.css";

export const displayCountryNum = (data, casesType = "cases") => {
  const formatedNum = (num) => {
    return new Intl.NumberFormat("en").format(num);
  };

  return data.map((country, index) => {
    const dateUpdate = new Date(country.updated).toLocaleString();

    const cases = formatedNum(country.cases);
    const recovered = formatedNum(country.recovered);
    const deaths = formatedNum(country.deaths);
    const flag = country.countryInfo.flag;

    return (
      <Circle
        key={index}
        center={[country.countryInfo.lat, country.countryInfo.long]}
        radius={Math.floor((country.cases * 10) / 100)}
        color={"red"}
        fillColor={"red"}
      >
        <Tooltip className="TooltipContainer">
          <CountryName>
            <h2>{country.country}</h2>
            <Flag src={flag} />
          </CountryName>
          <NumContainers>
            <NumList>
              <strong>Confirmed:</strong> {cases}
            </NumList>
            <NumList>
              <strong>Deaths:</strong> {deaths}
            </NumList>
            <NumList>
              <strong>Recovered:</strong> {recovered}
            </NumList>
            <NumList>
              <strong>Last Update:</strong> {dateUpdate}
            </NumList>
            <NumList>
              <strong>New cases :</strong> +{formatedNum(country.todayCases)}
            </NumList>
          </NumContainers>
        </Tooltip>
      </Circle>
    );
  });
};

const CountryName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;

  h2 {
    padding: 0;
    margin: 0;
  }
`;

const Flag = styled.img`
  border-radius: 50%;
  height: 20px;
  width: 20px;
  margin-left: 10px;
`;
const NumContainers = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-left: 0;
`;

const NumList = styled.p`
  padding: 0;
  margin: 0;
`;
