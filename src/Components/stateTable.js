import React from "react";
export default function stateTable(data) {
  let stateData, states, active, confirmed, deaths, recovered;
  const nfObject = new Intl.NumberFormat("en-US");
  const list = [
    <React.Fragment>
      <td>States</td>
      <td>Confirmed</td>
      <td>Active</td>
      <td>Recovered</td>
      <td>Deaths</td>
    </React.Fragment>,
  ];
  if (data !== undefined) {
    stateData = Object.values(data);

    states = Object.keys(data);
    confirmed = stateData.map((i) => i.confirmed);
    active = stateData.map((i) => i.active);
    deaths = stateData.map((i) => i.deaths);
    recovered = stateData.map((i) => i.recovered);

    const dataTable = () => {
      for (let i = 0; i < states.length - 1; i++) {
        list.push(
          <React.Fragment>
            <td className="states">{states[i]}</td>
            <td className="confirmed">{nfObject.format(confirmed[i])}</td>
            <td className="active">{nfObject.format(active[i])}</td>
            <td className="recovered">{nfObject.format(recovered[i])}</td>
            <td className="deaths">{nfObject.format(deaths[i])}</td>
          </React.Fragment>
        );
      }
    };

    dataTable();
  }

  const tableData = list.map((i, index) => {
    return <tr key={index}>{i}</tr>;
  });

  return tableData;
}
