import React, { createContext, useState } from "react";
import { daysCount } from "../helpers/userPageHelper";
import { ip } from "../constants/constants";
export const WorldDataContext = createContext(null);

export const WorldDataProvider = ({ children }) => {
  const [data, setData] = useState();
  const [country, setCountry] = useState();
  const [isLoading, SetIsLoading] = useState(true);
  const [coordinates, setCoordinates] = useState([0, 0]);
  const [zoomScale, setZoomScale] = useState(2);
  const [formValue, setFormValue] = useState("");
  const [countryData, setCountryData] = useState();
  const [countryChoice, setCountryChoice] = useState("Worldwide");

  const getCountryInfo = async (specificCountry) => {
    const numDays = daysCount();
    const response = await fetch(`${ip}/api/${specificCountry}/${numDays}`);
    const result = await response.json();
    setCountryChoice(result.data.country);
    setCountryData({
      cases: result?.data?.timeline?.cases,
      deaths: result?.data?.timeline?.deaths,
      recovered: result?.data?.timeline?.recovered,
    });
    return result;
  };

  const getCountriesData = async () => {
    try {
      let response = await fetch(`${ip}/api/home`);
      let data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const getSpecificCountry = (specificCountry) => {
    const chosenCountry = data?.find((item) => {
      return item.country.toLowerCase() === specificCountry.toLowerCase();
    });

    setCountry(chosenCountry);
    setFormValue(chosenCountry.country);
    setCoordinates([
      chosenCountry.countryInfo.lat,
      chosenCountry.countryInfo.long,
    ]);
    setZoomScale(5);
    return chosenCountry;
  };

  React.useEffect(() => {
    getCountriesData().then((countriesData) => {
      setData(countriesData.allCountriesData);
      SetIsLoading(false);
    });
  }, [country]);

  return (
    <WorldDataContext.Provider
      value={{
        data,
        isLoading,
        country,
        coordinates,
        zoomScale,
        formValue,
        countryData,
        countryChoice,
        getCountryInfo: getCountryInfo,
        getSpecificCountry: getSpecificCountry,
      }}
    >
      {children}
    </WorldDataContext.Provider>
  );
};
