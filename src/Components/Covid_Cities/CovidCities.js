import React from "react";
import "./Covid_Cities.css";
import { CityTable } from "../index";
import Chart from "./City_Chart_Data/CityChart";

const url = "https://api.covid19india.org/state_district_wise.json";

let stateName;
let currentStateName = "";

export default class CovidCities extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      show: 0,
      value: "India",
      stateName: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.searchState = this.searchState.bind(this);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value,
    });
  }

  searchState(event) {
    event.preventDefault();
    if (this.state.value) {
      if (this.state.value !== "India") {
        currentStateName = this.state.value;
        this.setState({
          show: 1,
        });
      } else {
        this.setState({
          show: 0,
        });
      }
    }
  }

  componentDidMount() {
    fetch(url)
      .then((response) => {
        response.json().then((result) => {
          this.setState({
            data: result,
            stateName: Object.keys(result),
          });
        });
      })
      .catch((err) => console.log("error in fetching city data."));
  }

  render() {
    if (this.state.stateName) {
      stateName = this.state.stateName.map((item, index) => {
        return (
          <option key={index} value={item}>
            {item}
          </option>
        );
      });
    }

    return (
      <div className="covidCities">
        <main>
          <form id="searchState" onSubmit={this.searchState}>
            <label className="inputArea">Select State</label>
            <select
              value={this.state.value}
              onChange={this.handleChange}
              onClick={this.searchState}
            >
              <option value="India">India</option>
              {stateName}
            </select>
            <button id="searchBtn" onClick={this.searchState}>
              Search
            </button>
          </form>
          {this.state.show === 1 && this.state.value !== "" ? (
            <div id="cityData">
              <div className="titles">
                <h2 id="city_title">Total Cases In {currentStateName}</h2>
              </div>
              {this.state.data && (
                <table>
                  <tbody>{CityTable(this.state.data[currentStateName])}</tbody>
                </table>
              )}
              <div className="cityCharts">
                <Chart
                  data={this.state.data[currentStateName]}
                  currentStateName={currentStateName}
                />
              </div>
            </div>
          ) : null}
        </main>
      </div>
    );
  }
}
