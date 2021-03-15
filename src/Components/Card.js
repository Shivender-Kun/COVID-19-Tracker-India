import React from "react";
import CountUp from "react-countup";

export default function Card(props) {
  const { id, title, data, deltaData } = props;

  return (
    <div id={id}>
      <div>
        <h4>{title}</h4>
        <div className="dataset">
          <h5 id="_conf">
            {data !== "undefined" && (
              <CountUp
                start={0}
                end={parseInt(data)}
                duration={1.5}
                separator=","
              />
            )}
          </h5>
          {deltaData && (
            <h6>
              ▲
              <CountUp
                start={0}
                end={parseInt(deltaData)}
                duration={1.5}
                separator=","
              />
            </h6>
          )}
        </div>
      </div>
      <div id="empty"></div>
    </div>
  );
}
