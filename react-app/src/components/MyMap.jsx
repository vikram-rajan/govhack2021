import React, { useState } from "react";
import { Map, GeoJSON } from "react-leaflet";
import mapData from "./../data/australia_postcode_rentals1 (2).json";
//import mapData from "./../data/australia.json";

import "leaflet/dist/leaflet.css";
import "./MyMap.css";

import Slider from '@material-ui/core/Slider';

// const yearMonths = mapData.features.map(f => )

const years = [2018, 2019, 2020, 2021];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const initialData = mapData.features.filter(x => x.properties["Year"] === 2018 && x.properties["Month"] === 1);

const getYearAndMonth = (num) => {
  const year = years[Math.floor((num - 1) / 12)];
  const monthNum = (num % 12) === 0 ? 12 : num % 12;
  const month = months[monthNum - 1]

  return { year, month, monthNum };
}

export const MapTool = () => {

  const [yearSelected, setTimeSelected] = useState(1);
  const [currentMapData, setCurrentMapData] = useState(initialData);

  console.log(currentMapData);

  const colourPicker = (feature) => {
    console.log(feature.properties["Year"]);
    var bonds = feature.properties["# of Bonds"];

    if (bonds >= 0 && bonds < 50) {
      return 'green';
    }
    else if (bonds >= 50 && bonds < 100) {
      return 'yellow';
    }
    else if (bonds >= 100 && bonds < 150) {
      return 'yellow';
    }
    else if (bonds >= 150) {
      return 'red';
    }
    else {
      return 'blue';
    }
  }

  const suburbStyle = (feature) => ({
    fillColor: colourPicker(feature),
    fillOpacity: feature.properties.STE_NAME21 === "New South Wales" ? yearSelected > 2016 ? yearSelected > 2018 ? 0.6 : 0.8 : 1.0 : 0.6,
    color: "black",
    weight: 1,
  });

  const onEachSuburb = (feature, layer) => {

    const bonds = feature.properties["# of Bonds"];
    const postcode = feature.properties["Postcode"];

    const popupText = `
    <div>#Bonds: ${bonds}</div>
    <div>Postcode: ${postcode}</div>

    <div>${yearSelected}: placeholder</div>
    `

    layer.bindPopup(popupText);
  }

  // const colorChange = (event) => {
  //   this.setState({ color: event.target.value });
  // };

  const onSliderChange = (_e, value) => {

    const { year, month, monthNum } = getYearAndMonth(value);
    console.log(value, year, month, monthNum);

    const newData = mapData.features.filter(x => x.properties["Year"] === year && x.properties["Month"] === monthNum);

    console.log(newData);

    setCurrentMapData(newData);
    setTimeSelected(value);
  }

  const valueLabelFormat = (value) => {
    const { year, month, monthNum } = getYearAndMonth(value);

    return `${month}`;
  }

  return (
    <div style={{ width: "80%", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center" }}>Emerging Populations Over Time: NSW</h1>
      <div style={{ width: "30%", margin: "0 auto", marginTop: "50px" }}>
        <Slider
          defaultValue={1}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          valueLabelFormat={valueLabelFormat}
          step={1}
          marks={[{ value: 1, label: "2018" }, { value: 13, label: "2019" }, { value: 25, label: "2020" }, { value: 37, label: "2021" }, { value: 48, label: "2022" }]}
          min={1}
          max={48}
          onChange={onSliderChange}
        />
      </div>
      <div>
        <Map style={{ height: "80vh" }} zoom={5}
          center={[-25.2744, 133.7751]}
        // center={[-35.2809, 149.13]}
        >
          <GeoJSON
            style={suburbStyle}
            data={currentMapData}
            onEachFeature={onEachSuburb}
          // onclick={}
          />
        </Map>
      </div>
    </div >
  );
}
