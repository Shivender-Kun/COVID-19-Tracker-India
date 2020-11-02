import React from "react";
import "./covid_cities.css";
import { Line } from "react-chartjs-2";

const url = "https://api.covid19india.org/state_district_wise.json";

let states = [];
let stateName;
let currentStateName = "";

export default class CovidCities extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      cities: [],
      active: [],
      deaths: [],
      recovered: [],
      confirmed: [],
      show: 0,
      value: "India",
      stateName: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.searchState = this.searchState.bind(this);
  }
  searchState(event) {
    event.preventDefault();
    if (this.state.value) {
      if (this.state.value !== "India") {
        this.setState({
          cities: [],
          active: [],
          deaths: [],
          recovered: [],
          confirmed: [],
          show: 1,
        });

        for (let k in this.state.data[this.state.value].districtData)
          this.state.cities.push(k);

        states = Object.values(this.state.data[this.state.value].districtData);

        this.setState({
          active: states.map((i) => i.active),
          deceased: states.map((i) => i.deceased),
          recovered: states.map((i) => i.recovered),
          confirmed: states.map((i) => i.confirmed),
          cities: Object.keys(this.state.data[this.state.value].districtData),
        });
        currentStateName = this.state.value;
      } else {
        this.setState({
          show: 0,
        });
      }
    }
  }

  handleChange(event) {
    this.setState({
      value: event.target.value,
    });
    if (event.target.value === "India") {
      this.setState({
        show: 0,
      });
    }
  }

  componentDidMount() {
    fetch(url).then((response) => {
      response.json().then((result) => {
        this.setState({
          data: result,
          stateName: Object.keys(result),
        });
        // console.log(this.state.stateName);
      });
    });
  }

  render() {
    // console.log(this.state.deceased.reduce((a, b) => a + b, 0))
    const totalCases = {
      labels: [0, "Total", 0],
      datasets: [
        {
          label: "Confirmed",
          fill: false,
          lineTension: 1,
          backgroundColor: "red",
          borderColor: "red",
          borderWidth: 2.5,
          data: [0, this.state.confirmed.reduce((a, b) => a + b, 0), 0],
          pointRadius: 0.1,
          pointHoverRadius: 7,
          hoverBackgroundColor: "white",
        },
        {
          label: "Active",
          fill: false,
          lineTension: 0.5,
          backgroundColor: "blue",
          borderColor: "blue",
          borderWidth: 2.5,
          data: [0, this.state.active.reduce((a, b) => a + b, 0), 0],
          pointRadius: 0.1,
          pointHoverRadius: 7,
          hoverBackgroundColor: "white",
        },
        {
          label: "Recovered",
          fill: false,
          lineTension: 0,
          backgroundColor: "lightgreen",
          borderColor: "lightgreen",
          borderWidth: 2.5,
          data: [0, this.state.recovered.reduce((a, b) => a + b, 0), 0],
          pointRadius: 0.1,
          pointHoverRadius: 7,
          hoverBackgroundColor: "white",
        },
        {
          label: "Deaths",
          fill: false,
          lineTension: 0.4,
          backgroundColor: "lightgrey",
          borderColor: "lightgrey",
          borderWidth: 2.5,
          data: [
            0,
            this.state.deceased
              ? this.state.deceased.reduce((a, b) => a + b, 0)
              : null,
            0,
          ],
          pointRadius: 0.1,
          pointHoverRadius: 7,
          hoverBackgroundColor: "white",
        },
      ],
    };

    let cities, active, deaths, recovered, confirmed;

    let nfObject = new Intl.NumberFormat("en-US");

    if (this.state.cities) {
      cities = this.state.cities.map((item) => {
        return (
          <li value={item} key={item}>
            {item}
          </li>
        );
      });
    }
    if (this.state.active) {
      active = this.state.active.map((item4) => {
        return <li key={item4 + Math.random()}>{nfObject.format(item4)}</li>;
      });
    }
    if (this.state.deceased) {
      deaths = this.state.deceased.map((item1) => {
        return <li key={item1 + Math.random()}>{nfObject.format(item1)}</li>;
      });
    }
    if (this.state.recovered) {
      recovered = this.state.recovered.map((item2) => {
        return (
          <li className="ch" key={item2 + Math.random()}>
            {nfObject.format(item2)}
          </li>
        );
      });
    }
    if (this.state.confirmed) {
      confirmed = this.state.confirmed.map((item3) => {
        return (
          <li className="cn" key={item3 + Math.random()}>
            {nfObject.format(item3)}
          </li>
        );
      });
    }
    if (this.state.stateName) {
      stateName = this.state.stateName.map((item6) => {
        return <option value={item6}>{item6}</option>;
      });
    }

    return (
      <div className="covidCities">
        <main>
          {this.state.show === 1 && this.state.value !== "" ? (
            <div>
              <form id="searchState" onSubmit={this.searchState}>
                <label className="inputArea">Select Place</label>
                <select value={this.state.value} onChange={this.handleChange}>
                  <option value="India">India</option>
                  {stateName}
                </select>

                <button id="searchBtn" onClick={this.searchState}>
                  Search
                </button>
              </form>
              <div className="title">
                <h2 id="title-main">Total Cases In {currentStateName}</h2>
              </div>
              <div className="data">
                <ul className="cities">
                  <li>Cities</li>
                  {cities}
                </ul>
                <ul className="confirmed">
                  <li>Confirmed</li>
                  {confirmed}
                </ul>
                <ul className="active">
                  <li>Active</li>
                  {active}
                </ul>
                <ul className="deaths">
                  <li>Deaths</li>
                  {deaths}
                </ul>
                <ul className="recovered">
                  <li>Recovered</li>
                  {recovered}
                </ul>
              </div>
              <div className="cityCharts">
                <Line
                  data={totalCases}
                  options={{
                    title: {
                      display: true,
                      text: "Total Cases In " + currentStateName,
                      fontSize: 18,
                      fontColor: "white",
                    },
                    legend: {
                      labels: {
                        fontColor: "lightgreen",
                      },
                    },
                    tooltips: {
                      mode: "nearest",
                      intersect: false,
                    },
                    hover: {
                      mode: "nearest",
                      intersect: true,
                    },
                    scales: {
                      yAxes: [
                        {
                          gridLines: {
                            display: false,
                          },
                          ticks: {
                            fontColor: "lightblue",
                            fontSize: 13,
                            callback: function (value) {
                              return value > 9999
                                ? value > 99999
                                  ? value / 100000 + " L"
                                  : value / 1000 + " K"
                                : value;
                            },
                          },
                        },
                      ],
                      xAxes: [
                        {
                          gridLines: {
                            display: false,
                          },
                          ticks: {
                            fontColor: "red",
                            fontSize: 13,
                            padding: 20,
                          },
                        },
                      ],
                    },
                  }}
                />
              </div>
            </div>
          ) : (
            <form id="searchState" onSubmit={this.searchState}>
              <label className="inputArea">Select Place</label>
              <select value={this.state.value} onChange={this.handleChange}>
                <option value="India">India</option>
                {stateName}
              </select>

              <button id="searchBtn" onClick={this.searchState}>
                Search
              </button>
            </form>
          )}
        </main>
      </div>
    );
  }
}
