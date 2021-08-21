import React, { Component } from "react";
import { Map, GeoJSON } from "react-leaflet";
import mapData from "./../data/australia.json";
import "leaflet/dist/leaflet.css";
import "./MyMap.css";

import Slider from '@material-ui/core/Slider';

export const MapTool = () => {

  const colourPicker = (feature) => {
    if (feature.properties.STE_NAME21 === "New South Wales") {
      return 'red';
    }
    else {
      return 'blue';
    }
  }

  const suburbStyle = (feature) => ({
    fillColor: colourPicker(feature),
    fillOpacity: 0.6,
    color: "black",
    weight: 1,
  });

  const onEachSuburb = (feature, layer) => {
    const country = feature.properties.AUS_NAME21;
    const state = feature.properties.STE_NAME21;
    const lga = feature.properties.SA3_NAME21;
    const suburb = feature.properties.SA2_NAME21;

    const popupText = `
    <div>Country: ${country}</div>
    <div>State: ${state}</div>
    <div>LGA: ${lga}</div>
    <div>Suburb: ${suburb}</div>
    `

    layer.bindPopup(popupText);
  }

  // const colorChange = (event) => {
  //   this.setState({ color: event.target.value });
  // };

  return (
    <div style={{ width: "80%", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center" }}>Emerging Populations Over Time: NSW</h1>
      <div style={{ width: "30%", margin: "0 auto", marginTop: "50px" }}>
        <Slider
          defaultValue={2016}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          step={1}
          marks
          min={2016}
          max={2021}
        />
      </div>
      <div>
        <Map style={{ height: "80vh" }} zoom={5}
          center={[-25.2744, 133.7751]}
        // center={[-35.2809, 149.13]}
        >
          <GeoJSON
            style={suburbStyle}
            data={mapData.features}
            onEachFeature={onEachSuburb}
          />
        </Map>
      </div>
    </div >
  );
}
