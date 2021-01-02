import React from "react";
import "./chart_data.css";
import { Line } from "react-chartjs-2";

const url = "https://api.covid19india.org/data.json";

export default class ChartData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      date: [],
      dailyConfirmed: [],
      dailyTests: [],
      dailyDeaths: [],
      dailyRecovered: [],
      totalConfirmed: [],
      totalDeaths: [],
      totalRecovered: [],
      totalTests: [],
      daily: false,
    };
    this.switchBtn = this.switchBtn.bind(this);
  }

  switchBtn() {
    this.setState({
      daily: !this.state.daily,
    });
  }

  componentDidMount() {
    fetch(url).then((response) => {
      response.json().then((result) => {
        this.setState({
          data: result,
          date: result.cases_time_series.map((i) => i.dateymd),
          dailyConfirmed: result.cases_time_series.map((i) => i.dailyconfirmed),
          dailyDeaths: result.cases_time_series.map((i) => i.dailydeceased),
          dailyRecovered: result.cases_time_series.map((i) => i.dailyrecovered),
          totalConfirmed: result.cases_time_series.map((i) => i.totalconfirmed),
          totalDeaths: result.cases_time_series.map((i) => i.totaldeceased),
          totalRecovered: result.cases_time_series.map((i) => i.totalrecovered),
          totalTests: result.tested.map((i) => i.totalsamplestested),
          dailyTests: result.tested.map((i) => i.samplereportedtoday)
        });
        // console.log(this.state.totalConfirmed);
      });
    });
  }
  render() {
    const testedCaseDates = this.state.daily ? this.state.date.slice(43) : this.state.date.slice(43);

    const finalValue = this.state.daily;

    const confirmedCases = {
      labels: this.state.date,
      datasets: [
        {
          label: "Confirmed",
          fill: false,
          lineTension: 0.4,
          backgroundColor: "red",
          borderColor: "red",
          borderWidth: 1.5,
          data: this.state.daily ? this.state.dailyConfirmed : this.state.totalConfirmed,
          pointRadius: 0.1,
          pointHoverRadius: 7,
          hoverBackgroundColor: "white",
        },
      ],
    };

    const recoveredCases = {
      labels: this.state.date,
      datasets: [
        {
          label: "Recovered",
          fill: false,
          lineTension: 0.4,
          backgroundColor: "lightgreen",
          borderColor: "lightgreen",
          borderWidth: 1.5,
          data: this.state.daily ? this.state.dailyRecovered : this.state.totalRecovered,
          pointRadius: 0.1,
          pointHoverRadius: 7,
          hoverBackgroundColor: "white",
        },
      ],
    };

    const deathCases = {
      labels: this.state.date,
      datasets: [
        {
          label: "Deaths",
          fill: false,
          lineTension: 1,
          backgroundColor: "lightgrey",
          borderColor: "lightgrey",
          borderWidth: 1.5,
          data: this.state.daily ? this.state.dailyDeaths : this.state.totalDeaths,
          pointRadius: 0.1,
          pointHoverRadius: 7,
          hoverBackgroundColor: "white",
        },
      ],
    };

    const testedCases = {
      labels: testedCaseDates,
      datasets: [
        {
          label: "Tests",
          fill: false,
          lineTension: 0,
          backgroundColor: "pink",
          borderColor: "pink",
          borderWidth: 1.5,
          data: this.state.daily ? this.state.dailyTests : this.state.totalTests,
          pointRadius: 0.1,
          pointHoverRadius: 7,
          hoverBackgroundColor: "white",
          fillColor: "white",
        },
      ],
    };

    const latestDate = this.state.date.slice(this.state.date.length - 1);

    let nfObject = new Intl.NumberFormat("en-US");

    return (
      <div className="charts">
        <h2 className="title-main">
          Graphical Representation of Increase in Covid Cases in India
        </h2>
        <div className='change_btn'>
          <button id={this.state.daily ? "daily" : "total"} onClick={this.switchBtn}>
            {this.state.daily ? "Show Total Cases" : "Show Daily Cases"}
          </button>
        </div>
        <main className="all_charts">
          <div>
            <p>
              Total Confirmed Cases as of {latestDate} are{" "}
              {nfObject.format(
                this.state.totalConfirmed.slice(
                  this.state.totalConfirmed.length - 1
                )
              )}{" "}
              people.
            </p>
            <div id="confirmed">
              <Line
                data={confirmedCases}
                options={{
                  maintainAspectRatio: false,
                  title: {
                    display: true,
                    text: "Confirmed Cases In India",
                    fontSize: 18,
                    fontColor: "white",
                  },
                  legend: {
                    display: false,
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
                          stepSize: finalValue? 20000 : 2000000,
                          fontColor: "red",
                          fontSize: 13,
                          callback: function (value) {
                            return (finalValue ? value / 1000 + ' K' : value / 100000 + " L");
                          },
                        },
                      },
                    ],
                    xAxes: [
                      {
                        gridLines: {
                          display: false,
                        },
                        type: "time",
                        time: {
                          displayFormats: {
                            month: 'MMM'
                          },
                        },
                        ticks: {
                          fontColor: "red",
                          fontSize: 13,
                          stepSize: 30,
                          padding: 20,
                        },
                      },
                    ],
                  },
                }}
              />
            </div>
          </div>
          <div>
            <p>
              Total Recovered Cases as of {latestDate} are{" "}
              {nfObject.format(
                this.state.totalRecovered.slice(
                  this.state.totalRecovered.length - 1
                )
              )}{" "}
              people.
            </p>
            <div id="recovered">
              <Line
                data={recoveredCases}
                options={{
                  maintainAspectRatio: false,
                  title: {
                    display: true,
                    text: "Recovered Cases In India",
                    fontSize: 18,
                    fontColor: "white",
                  },
                  legend: {
                    display: false,
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
                          stepSize: finalValue? 30000 : 2000000,
                          fontColor: "lightgreen",
                          fontSize: 13,
                          callback: function (value) {
                            return (finalValue ? value / 1000 + ' K' : value / 100000 + " L");
                          },
                        },
                      },
                    ],
                    xAxes: [
                      {
                        gridLines: {
                          display: false,
                        },
                        type: "time",
                        time: {
                          displayFormats: {
                            month: "MMM",
                          },
                        },
                        ticks: {
                          fontColor: "lightgreen",
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
          <div>
            <p>
              Total Death Cases as of {latestDate} are{" "}
              {nfObject.format(
                this.state.totalDeaths.slice(this.state.totalDeaths.length - 1)
              )}{" "}
              people.
            </p>
            <div id="deaths">
              <Line
                data={deathCases}
                options={{
                  maintainAspectRatio: false,
                  title: {
                    display: true,
                    text: "Deaths In India",
                    fontSize: 18,
                    fontColor: "white",
                  },
                  legend: {
                    display: false,
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
                          stepSize: finalValue? 1000 : 30000,
                          fontColor: "lightgrey",
                          fontSize: 13,
                          callback: function (value) {
                            return value / 1000 + " K";
                          },
                        },
                      },
                    ],
                    xAxes: [
                      {
                        gridLines: {
                          display: false,
                        },
                        type: "time",
                        time: {
                          displayFormats: {
                            month: "MMM",
                          },
                        },
                        ticks: {
                          fontColor: "lightgrey",
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
          <div>
            <p>
              Total Tests as of {latestDate} are{" "}
              {nfObject.format(
                this.state.totalTests.slice(this.state.totalTests.length - 1)
              )}{" "}
              people.
            </p>
            <div id="tests">
              <Line
                data={testedCases}
                options={{
                  maintainAspectRatio: false,
                  title: {
                    display: true,
                    text: "Tests In India",
                    fontSize: 18,
                    fontColor: "white",
                  },
                  legend: {
                    display: false,
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
                          stepSize: finalValue? 400000 : 40000000,
                          fontColor: "pink",
                          fontSize: 13,
                          callback: function (value) {
                            return (finalValue ? value / 100000 + ' L' : value / 10000000 + ' Cr');
                            
                          },
                        },
                      },
                    ],
                    xAxes: [
                      {
                        gridLines: {
                          display: false,
                        },
                        type: "time",
                        time: {
                          displayFormats: {
                            month: "MMM",
                          },
                        },
                        ticks: {
                          fontColor: "pink",
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
        </main>
      </div>
    );
  }
}
