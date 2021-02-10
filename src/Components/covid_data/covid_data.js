import React from "react";
import "./covid_data.css";

const url = "https://api.covidindiatracker.com/state_data.json";
const urltotal = "https://api.covidindiatracker.com/total.json";
export default class CovidData extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      districtData: [],
      active: [],
      confirmed: [],
      deaths: [],
      recovered: [],
      rChanges: [],
      dChanges: [],
      cChanges: [],
      count: 0,
      getData: true,
    };
  }
  componentDidMount() {
    fetch(url)
      .then((response) => {
        response.json().then((result) => {
          this.setState({
            data: result,
            active: result.map((i) => i.active),
            confirmed: result.map((i) => i.confirmed),
            deaths: result.map((i) => i.deaths),
            recovered: result.map((i) => i.recovered),
            states: result.map((i) => i.state),
          });
        });
      })
      .catch((err) => this.setState({ getData: false }));
    fetch(urltotal)
      .then((resp) => {
        resp.json().then((res) => {
          this.setState({
            dChanges: res.dChanges,
            rChanges: res.rChanges,
            cChanges: res.cChanges,
          });
        });
      })
      .catch((err) => this.setState({ getData: false }));
  }
  render() {
    let states, active, deaths, recovered, confirmed;

    let nfObject = new Intl.NumberFormat("en-US");

    if (this.state.states) {
      states = this.state.states.map((item) => {
        return (
          <li value={item} key={item}>
            {item}
          </li>
        );
      });
    }
    if (this.state.active) {
      active = this.state.active.map((item4) => {
        return <li key={item4 + Math.random()}>{nfObject.format(item4)}</li>;
      });
    }
    if (this.state.deaths) {
      deaths = this.state.deaths.map((item1) => {
        return <li key={item1 + Math.random()}>{nfObject.format(item1)}</li>;
      });
    }
    if (this.state.recovered) {
      recovered = this.state.recovered.map((item2) => {
        return (
          <li className="ch" key={item2 + Math.random()}>
            {nfObject.format(item2)}
          </li>
        );
      });
    }
    if (this.state.confirmed) {
      confirmed = this.state.confirmed.map((item3) => {
        return (
          <li className="cn" key={item3 + Math.random()}>
            {nfObject.format(item3)}
          </li>
        );
      });
    }

    return this.state.getData !== false ? (
      <div className="data_container">
        <div className="titles">
          <h2 className="title-main">Total Cases In India</h2>
        </div>
        <div className="data_cards">
          <div className="confirmed_card">
            <h4>Confirmed</h4>
            <div className="dataset">
              <h6>+{this.state.cChanges}</h6>
              <h2 id="_conf">
                {nfObject.format(
                  this.state.confirmed.reduce((a, b) => a + b, 0)
                )}
              </h2>
            </div>
          </div>
          <div className="active_card">
            <h4>Active</h4>
            <div className="dataset">
              <h6> </h6>
              <h2 id="_active">
                {nfObject.format(this.state.active.reduce((a, b) => a + b, 0))}
              </h2>
            </div>
          </div>

          <div className="recovered_card">
            <h4>Recovered</h4>
            <div className="dataset">
              <h6>+{this.state.rChanges}</h6>
              <h2 id="_recovered">
                {nfObject.format(
                  this.state.recovered.reduce((a, b) => a + b, 0)
                )}
              </h2>
            </div>
          </div>
          <div className="deaths_card">
            <h4>Deaths</h4>
            <div className="dataset">
              <h6>+{this.state.dChanges}</h6>
              <h2 id="_deaths">
                {nfObject.format(this.state.deaths.reduce((a, b) => a + b, 0))}
              </h2>
            </div>
          </div>
        </div>

        <div className="data">
          <div className="list">
            <ul className="states">
              <li>States/UT</li>
              {states}
            </ul>
            <ul className="confirmed">
              <li>Confirmed</li>
              {confirmed}
            </ul>
            <ul className="active">
              <li>Active</li>
              {active}
            </ul>
            <ul className="deaths">
              <li>Deaths</li>
              {deaths}
            </ul>
            <ul className="recovered">
              <li>Recovered</li>
              {recovered}
            </ul>
          </div>
        </div>
      </div>
    ) : null;
  }
}
