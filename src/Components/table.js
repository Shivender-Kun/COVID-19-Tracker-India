const nfObject = new Intl.NumberFormat("en-US");

export default function table(data) {
  let stateData, states, active, confirmed, deaths, recovered;
  const list = [
    <tr>
      <td>States</td>
      <td>Confirmed</td>
      <td>Active</td>
      <td>Recovered</td>
      <td>Deaths</td>
    </tr>,
  ];
  if (data !== undefined && data["state_wise"] !== undefined) {
    stateData = Object.values(data["state_wise"]);
    states = Object.keys(data["state_wise"]);
    confirmed = stateData.map((i) => i.confirmed);
    active = stateData.map((i) => i.active);
    deaths = stateData.map((i) => i.deaths);
    recovered = stateData.map((i) => i.recovered);

    const dataTable = () => {
      for (let i = 0; i < states.length - 1; i++) {
        list.push(
          <tr key={i}>
            <td>{states[i]}</td>
            <td>{nfObject.format(confirmed[i])}</td>
            <td>{nfObject.format(active[i])}</td>
            <td>{nfObject.format(recovered[i])}</td>
            <td>{nfObject.format(deaths[i])}</td>
          </tr>
        );
      }
    };

    dataTable();
  }

  const tableData = list.map((i) => {
    return i;
  });

  return tableData;
}
