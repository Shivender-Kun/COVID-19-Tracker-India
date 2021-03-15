import React, { useState } from "react";
import { Line } from "react-chartjs-2";
export default function Chart(chartData) {
  const [state, setstate] = useState([]);
  const [currentStateName, setcurrentStateName] = useState("");
  React.useMemo(() => {
    if (chartData !== "undefined") {
      setstate(Object.values(chartData.data.districtData));
      setcurrentStateName(chartData.currentStateName);
    }
  }, [chartData]);
  const getData = (array, property) => {
    const newArr = array.map((i) => i[property]);
    return newArr;
  };

  const data = {
    labels: [0, "Total", 0],
    datasets: [
      {
        label: "Confirmed",
        fill: false,
        lineTension: 1,
        backgroundColor: "red",
        borderColor: "red",
        borderWidth: 2.5,
        data: [0, getData(state, "confirmed").reduce((a, b) => a + b, 0), 0],
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
        data: [0, getData(state, "active").reduce((a, b) => a + b, 0), 0],
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
        data: [0, getData(state, "recovered").reduce((a, b) => a + b, 0), 0],
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
        data: [0, getData(state, "deceased").reduce((a, b) => a + b, 0), 0],
        pointRadius: 0.1,
        pointHoverRadius: 7,
        hoverBackgroundColor: "white",
      },
    ],
  };

  return (
    <Line
      data={data}
      options={{
        title: {
          display: true,
          text: "Total Cases In " + currentStateName,
          fontSize: 15,
          fontColor: "white",
        },
        legend: {
          labels: {
            fontColor: "lightgreen",
            fontSize: 11,
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
                fontSize: 12,
                callback: function (value) {
                  return value > 9999
                    ? value > 99999
                      ? value / 100000 + " L"
                      : value / 1000 + " K"
                    : value;
                },
                padding: 20,
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
        maintainAspectRatio: false,
      }}
    />
  );
}
