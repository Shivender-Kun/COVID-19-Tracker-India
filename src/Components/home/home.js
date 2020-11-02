import React from "react";
import CovidData from "../covid_data/covid_data";
import "./home.css";
import CovidCities from "../covid_data/covid_cities/covid_cities";
function Home() {
    return (
        <div className="home">
            <div>
                <CovidCities />
            </div>
            <CovidData />
        </div>
    );
}

export default Home;
