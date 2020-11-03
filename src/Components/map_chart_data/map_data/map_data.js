import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import useSWR from "swr";
import "./map_data.css";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoidHJib3QiLCJhIjoiY2s3NmFscm1xMTV0MDNmcXFyOWp1dGhieSJ9.tR2IMHDqBPOf_AeGjHOKFA";

export default function MapData() {
  const mapboxElRef = useRef(null);

  const worldData = (url) =>
    fetch(url)
      .then((r) => r.json())
      .then((data) =>
        data.map((i, index) => ({
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [
              i.coordinates.longitude,
              i.coordinates.latitude,
            ],
          },
          properties: {
            id: index,
            country: i.country,
            province: i.province,
            cases: i.stats.confirmed,
            deaths: i.stats.deaths,
          },
        }))
      );

  const { data } = useSWR("https://corona.lmao.ninja/v2/jhucsse", worldData);

  let indiaData = [];

  if (data) {
    data.map((i) =>
      i.properties.country === "India" ? indiaData.push(i) : null
    );
  }

  // console.log(indiaData);

  useEffect(() => {
    if (indiaData) {
      const map = new mapboxgl.Map({
        container: mapboxElRef.current,
        style: "mapbox://styles/notalemesa/ck8dqwdum09ju1ioj65e3ql3k",
        center: [83, 22.5],
        zoom: 3.2,
      });

      // Add navigation controls to the top right of the canvas
      map.addControl(new mapboxgl.NavigationControl());

      map.once("load", function () {
        // Add our SOURCE
        map.addSource("points", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: indiaData,
          },
        });

        // Add our layer
        map.addLayer({
          id: "circles",
          source: "points",
          type: "circle",
          paint: {
            "circle-opacity": 0.3,

            "circle-radius": [
              "interpolate",
              ["linear"],
              ["get", "cases"],
              1,
              1,
              1000,
              5,
              4000,
              10,
              8000,
              15,
              12000,
              20,
              100000,
              25,
              1000000,
              30,
            ],
            "circle-color": [
              "interpolate",
              ["linear"],
              ["get", "cases"],
              1,
              "#CC0099",
              5000,
              "#CCFF00",
              10000,
              "#CCCC00",
              25000,
              "#6600FF",
              50000,
              "#3300FF",
              75000,
              "#0000FF",
              1000000,
              "#CC0000",
            ],
          },
        });

        const popup = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false,
        });

        map.on("mousemove", "circles", (e) => {
          const id = e.features[0].properties.id;

          if (id) {
            const { cases, deaths, province } = e.features[0].properties;

            const coordinates = e.features[0].geometry.coordinates.slice();

            const provinceHTML =
              province !== "null" ? `<p>State: ${province}</p>` : "";

            const mortalityRate = ((deaths / cases) * 100).toFixed(2);

            const HTML = `<div class='popup'>
                ${provinceHTML}
                <p>Cases: ${cases}</p>
                <p>Deaths: ${deaths}</p>
                <p>Mortality Rate: ${mortalityRate}%</p></div>
                `;

            popup.setLngLat(coordinates).setHTML(HTML).addTo(map);
          }
        });

        map.on("mouseleave", "circles", function () {
          map.getCanvas().style.cursor = "";
          popup.remove();
        });
      });
    }
  }, [indiaData]);

  return (
    <div className="map">
    <h2>Map Representation of COVID Cases in India</h2>
      <div className="mapContainer">
        {/* Mapbox Container */}
        <div className="mapBox" ref={mapboxElRef} />
      </div>
      <hr />
    </div>
  );
}