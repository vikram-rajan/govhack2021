import React, { Component } from "react";
import { Map, GeoJSON } from "react-leaflet";
import mapData from "./../data/australia.json";
import "leaflet/dist/leaflet.css";
import "./MyMap.css";

class MyMap extends Component {
  componentDidMount() {

  }

  colourPicker(feature) {
    if (feature.properties.STE_NAME21 === "New South Wales") {
      return 'red';
    }
    else {
      return 'blue';
    }
  }

  suburbStyle = (feature) => ({
    fillColor: this.colourPicker(feature),
    fillOpacity: 0.6,
    color: "black",
    weight: 1,
  });

  printMesssageToConsole = (event) => {
    console.log("Clicked");
  };


  onEachSuburb = (feature, layer) => {
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

  colorChange = (event) => {
    this.setState({ color: event.target.value });
  };

  render() {
    return (
      <div>
        <h1 style={{ textAlign: "center" }}>NSW</h1>
        <Map style={{ height: "80vh" }} zoom={5} center={[-35.2809, 149.13]}>
          <GeoJSON
            style={this.suburbStyle}
            data={mapData.features}
            onEachFeature={this.onEachSuburb}
          />
        </Map>
      </div>
    );
  }
}

export default MyMap;
