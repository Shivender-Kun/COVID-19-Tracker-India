import React from "react";
import { Card } from "../index";
import "./Total_Data_Cards.css";

function TotalDataCards(data) {
  const [total, setTotal] = React.useState([]);

  React.useEffect(() => {
    if (data !== undefined) {
      setTotal(data.data);
    }
  }, [data, total]);

  return (
    <React.Fragment>
      <div className="cards">
        <h2 id="card_title">Total Cases In India</h2>

        {total && (
          <React.Fragment>
            <div id="totalDataCards">
              <Card
                id="confirmed_card"
                title="Confirmed"
                data={total.confirmed}
                deltaData={total.deltaconfirmed}
              />

              <Card id="active_card" title="Active" data={total.active} />

              <Card
                id="recovered_card"
                title="Recovered"
                data={total.recovered}
                deltaData={total.deltarecovered}
              />

              <Card
                id="deaths_card"
                title="Deaths"
                data={total.deaths}
                deltaData={total.deltadeaths}
              />
            </div>

            <h5 id="last_updated">Last Updated on {total.lastupdatedtime}</h5>
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
}

export default TotalDataCards;
