import React, { useContext } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { WorldDataContext } from "./WorldDataContext";
import styled from "styled-components";

const UserChart = ({ fireStoreUser }) => {
  const { countryData } = useContext(WorldDataContext);

  // Setting up data for the chart
  let numCases;
  let numDeaths;
  let numRecovered;
  let dates;

  if (countryData !== undefined || countryData !== null) {
    numCases = countryData?.cases ? Object.values(countryData?.cases) : null;
    numDeaths = countryData?.deaths ? Object.values(countryData?.deaths) : null;
    numRecovered = countryData?.recovered
      ? Object.values(countryData?.recovered)
      : null;
    dates = countryData?.cases ? Object.keys(countryData?.cases) : null;
  }

  const covData = [];
  for (let i = 0; i < numCases?.length; i++) {
    let d = {
      date: dates[i],
      cases: numCases[i],
      deaths: numDeaths[i],
      recovered: numRecovered[i],
    };
    covData.push(d);
  }

  return (
    <>
      {!countryData ? (
        <div>
          Hi {fireStoreUser?.displayName} 👋 ! If you want to get historical
          data about a specific country, please select from the dropdow menu
          above. Enjoy!😉
        </div>
      ) : (
        <ChartContainer>
          <AreaChart
            width={800}
            height={400}
            data={covData}
            margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
            padding={"10px"}
          >
            <CartesianGrid strokeDasharray="4 4" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip contentStyle={{ backgroundColor: "black" }} />
            <Area
              type="monotone"
              dataKey="cases"
              stackId="cases"
              stroke="#eccb10"
              fill="#d8cd30"
            />
            <Area
              type="monotone"
              dataKey="deaths"
              stackId="deaths"
              stroke="#fd0000"
              fill="#f50303"
            />
            <Area
              type="monotone"
              dataKey="recovered"
              stackId="recovered"
              stroke="#18d100"
              fill="#49da25"
            />
          </AreaChart>

          {/* <FavButton>Add to my Favorites</FavButton> */}
        </ChartContainer>
      )}
    </>
  );
};

const ChartContainer = styled.div`
  align-self: center;
`;

// const FavButton = styled.button`
//   padding: 5px;
//   color: black;
//   background-color: white;
//   cursor: pointer;
// `;

export default UserChart;
