import axios from "axios";

const stateData = {
  method: "GET",
  url: "https://corona-virus-world-and-india-data.p.rapidapi.com/api_india",
  headers: {
    "x-rapidapi-key": "172bbfb57cmshaa3cdbeca67f3a0p10ba02jsnc0679e79efda",
    "x-rapidapi-host": "corona-virus-world-and-india-data.p.rapidapi.com",
  },
};

const historyData = {
  method: "get",
  url: "https://api.covid19india.org/data.json",
  headers: {},
};

const fetchData = async () => {
  try {
    const response = await axios.request(stateData);
    return response.data;
  } catch (error) {
    console.error("Error occurred while fetching data");
  }
};

export const fetchHistory = async () => {
  try {
    const response = await axios.request(historyData);
    return response.data;
  } catch (error) {
    console.error("Error occurred while fetching data");
  }
};

export default fetchData;
