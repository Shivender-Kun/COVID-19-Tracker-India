import axios from "axios";

const options = {
  method: "GET",
  url: "https://corona-virus-world-and-india-data.p.rapidapi.com/api_india",
  headers: {
    "x-rapidapi-key": "172bbfb57cmshaa3cdbeca67f3a0p10ba02jsnc0679e79efda",
    "x-rapidapi-host": "corona-virus-world-and-india-data.p.rapidapi.com",
  },
};

const fetchData = async () => {
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error("Error occured while fetching data");
  }
};

export default fetchData;
