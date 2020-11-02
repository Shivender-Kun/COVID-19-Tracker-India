import React from "react";
import "./App.css";
import NavBar from "./Components/navbar/navbar";
import Home from "./Components/home/home";
import MapChartData from "./Components/map_chart_data/map_chart_data";
import Footer from "./Components/footer/footer";
import Header from "./Components/header/header";
class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <div className="App">
        <NavBar />
        <Header />
        <div className="home-map">
          <Home />
          <MapChartData />
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
