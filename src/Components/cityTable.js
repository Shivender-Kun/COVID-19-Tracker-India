import React from "react";
export default function CityTable(data) {
  let citiesData, cities, active, confirmed, deaths, recovered;

  const nfObject = new Intl.NumberFormat("en-US");
  const list = [
    <React.Fragment>
      <td>Cities</td>
      <td>Confirmed</td>
      <td>Active</td>
      <td>Recovered</td>
      <td>Deaths</td>
    </React.Fragment>,
  ];
  if (data !== undefined) {
    citiesData = Object.values(data.districtData);
    cities = Object.keys(data.districtData);
    confirmed = citiesData.map((i) => i.confirmed);
    active = citiesData.map((i) => i.active);
    deaths = citiesData.map((i) => i.deceased);
    recovered = citiesData.map((i) => i.recovered);

    const dataTable = () => {
      for (let i = 0; i < cities.length - 1; i++) {
        list.push(
          <React.Fragment>
            <td className="cities">{cities[i]}</td>
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
