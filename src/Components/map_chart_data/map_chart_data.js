import React from "react";
import "./map_chart_data.css";
import ChartData from "./chart_data/chart_data";
import MapData from "./map_data/map_data";

class MapChartData extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <div className='mapping_chart'>
        <MapData />
        <div className="maps_charts">
          <ChartData />
        </div>
      </div>
    );
  }
}

export default MapChartData;
