import React from "react";
import { stateTable } from "../index";
import "./Covid_Data.css";
const CovidData = (data) => {
  return (
    data.data !== undefined && (
      <React.Fragment>
        <div className="home">
          <table id="simple-board">
            <tbody>{stateTable(data.data)}</tbody>
          </table>
        </div>
      </React.Fragment>
    )
  );
};

export default CovidData;
