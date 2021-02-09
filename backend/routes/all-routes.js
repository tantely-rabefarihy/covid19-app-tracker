const router = require("express").Router();

const {
  getCountryInfo,
  getAllCountriesData,
  getWorldData,
} = require("./handlers");

router.get("/api/home", async (req, res) => {
  let allCountriesData;
  try {
    allCountriesData = await getAllCountriesData();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: 400, message: error });
  }

  return res.json({ allCountriesData });
});

router.get("/api/:country/:days", async (req, res) => {
  let data;
  try {
    data = await getCountryInfo(req.params.country, req.params.days);
  } catch (error) {
    return res.status(400).json({ status: 400, message: error });
  }

  return res.json({ data });
});

router.get("/api/historical/all/:days", async (req, res) => {
  let data;
  try {
    data = await getWorldData(req.params.days);
  } catch (error) {
    return res.status(400).json({ status: 400, message: error });
  }

  return res.json({ data });
});

module.exports = router;
