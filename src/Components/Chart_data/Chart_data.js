import React from "react";
import "./Chart_data.css";
import { fetchHistory } from "../index";
import { Line } from "react-chartjs-2";

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
      daily: true,
    };
  }

  componentDidMount() {
    const fetch = async () => {
      const apidata = await fetchHistory();

      this.setState({
        data: apidata.cases_time_series,
        totalTests: apidata.tested.map((i) => i.totalsamplestested),
        dailyTests: apidata.tested.map((i) => i.samplereportedtoday),
      });
      this.setState({
        date: this.state.data.map((i) => i.dateymd),
        dailyConfirmed: this.state.data.map((i) => i.dailyconfirmed),
        dailyDeaths: this.state.data.map((i) => i.dailydeceased),
        dailyRecovered: this.state.data.map((i) => i.dailyrecovered),
        totalConfirmed: this.state.data.map((i) => i.totalconfirmed),
        totalDeaths: this.state.data.map((i) => i.totaldeceased),
        totalRecovered: this.state.data.map((i) => i.totalrecovered),
      });
    };
    fetch();
  }
  render() {
    const testedCaseDates = this.state.daily && this.state.date.slice(43);

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
          data: this.state.dailyConfirmed,
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
          data: this.state.dailyRecovered,
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
          data: this.state.dailyDeaths,
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
          data: this.state.dailyTests,
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
      this.state.data && (
        <div className="charts">
          <h2 className="chart-title">
            Graphical Representation of Increase in Covid Cases in India
          </h2>

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
                {this.state.dailyConfirmed.length > 1 &&
                this.state.date.length > 1 ? (
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
                              stepSize: finalValue ? 20000 : 2000000,
                              fontColor: "red",
                              fontSize: 13,
                              callback: function (value) {
                                return finalValue
                                  ? value / 1000 + " K"
                                  : value / 100000 + " L";
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
                ) : null}
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
                            stepSize: finalValue ? 30000 : 2000000,
                            fontColor: "lightgreen",
                            fontSize: 13,
                            callback: function (value) {
                              return finalValue
                                ? value / 1000 + " K"
                                : value / 100000 + " L";
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
                  this.state.totalDeaths.slice(
                    this.state.totalDeaths.length - 1
                  )
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
                            stepSize: finalValue ? 1000 : 30000,
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
                            stepSize: finalValue ? 400000 : 40000000,
                            fontColor: "pink",
                            fontSize: 13,
                            callback: function (value) {
                              return finalValue
                                ? value / 100000 + " L"
                                : value / 10000000 + " Cr";
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
      )
    );
  }
}
