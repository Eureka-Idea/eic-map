import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker,
} from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const modeData = {
  consultants: {
    headerText: "EIC Consultants",
    colors: {
      primary: "#1b63c1e3",
      secondary: "#5a87c126",
    },
  },
  projects: {
    headerText: "EIC Projects",
    colors: {
      primary: "#149E6Ae3",
      secondary: "#58998026",
    },
  },
};

const MapChart = ({ members }) => {
  console.log("members: ", members);
  const [poppedUp, setPoppedUp] = React.useState(null);
  const [mode, setMode] = React.useState("consultants");
  const toggleMode = (e) => {
    setMode(e.target.checked ? "projects" : "consultants");
  };

  const { headerText, colors } = modeData[mode];
  const { primary: primaryColor, secondary: secondaryColor } = colors;

  const markers = members
    .filter((m) => m.latitude && m.longitude)
    .map((m) => {
      const { name, latitude, longitude } = m;
      return {
        name,
        coordinates: [longitude, latitude],
        markerOffset: 15,
      };
    });
  return (
    <div>
      {/* <h2>
        {headerText}
        <br />
        <label className="switch">
          <input onChange={toggleMode} type="checkbox" />
          <span className="slider round"></span>
        </label>
      </h2> */}
      {poppedUp && (
        <div className="popup">
          <span onClick={setPoppedUp.bind(this, null)} className="close">
            ✕
          </span>
          Information about {poppedUp.name}
        </div>
      )}
      <ComposableMap>
        <ZoomableGroup zoom={1}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  fill={secondaryColor}
                  stroke="#D6D6DA"
                  key={geo.rsmKey}
                  geography={geo}
                />
              ))
            }
          </Geographies>
          {markers.map(({ name, coordinates, markerOffset }) => (
            <Marker
              key={name}
              coordinates={coordinates}
              onClick={setPoppedUp.bind(this, { name })}
            >
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid meet"
                viewBox="114.64145469651561 105.6206896551725 34.3723384069327 71.72390017464997"
                width="15"
                height="34"
                // width="30.37"
                // height="67.72"
                transform="translate(0,-32) rotate(0)"
              >
                <path
                  d="M146.01 120.22C146.01 127.73 139.92 133.82 132.41 133.82C124.91 133.82 118.81 127.73 118.81 120.22C118.81 112.71 124.91 106.62 132.41 106.62C139.92 106.62 146.01 112.71 146.01 120.22Z"
                  id="b1Fhkr3tey"
                  stroke="#002c42"
                  stroke-opacity="1"
                  fill="007fbf"
                  fill-opacity=".5"
                ></path>
                <path
                  d="M128.55 133.63L115.64 174.34"
                  id="c6qSmQu0O"
                  stroke="#002c42"
                  stroke-width="1"
                  stroke-opacity="1"
                ></path>
              </svg>
              {/* <text
              textAnchor="middle"
              y={markerOffset}
              style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}
            >
              {name}
            </text> */}
                          <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid meet"
                // viewBox="114.64145469651561 105.6206896551725 34.3723384069327 71.72390017464997"
                // width="15"
                // height="34"
                // width="30.37"
                // height="67.72"
                // transform="translate(1,-34) rotate(0)"
              >
              <g>
                <circle cx="5" cy="5" r="1" />
              </g>
              </svg>
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default MapChart;
