const fetch = require("node-fetch");

const getAllCountriesData = async () => {
  const result = await fetch("https://disease.sh/v3/covid-19/countries");
  const data = await result.json();

  return data;
};

const getCountryInfo = async (specificCountry, numDays) => {
  const response = await fetch(
    `https://disease.sh/v3/covid-19/historical/${specificCountry}?lastdays=${numDays}`
  );
  const result = await response.json();

  return result;
};

const getWorldData = async (numDays) => {
  const response = await fetch(
    `https://disease.sh/v3/covid-19/historical/all?lastdays=${numDays}`
  );
  const result = await response.json();
  console.log(result);
  return result;
};

module.exports = { getCountryInfo, getAllCountriesData, getWorldData };
