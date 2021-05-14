import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker
} from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const modeData = {
  consultants: {
    headerText: "EIC Consultants",
    colors: {
      primary: "#1b63c1e3",
      secondary: "#5a87c126"
    },
    markers: [
      { markerOffset: 15, name: "Brad", coordinates: [-74.0721, 44.711] },
      { markerOffset: 15, name: "Asha", coordinates: [78.4678, 18.07] },
      { markerOffset: 15, name: "Esther", coordinates: [48.1551, 6.8013] },
      { markerOffset: 15, name: "Miguel", coordinates: [-49.5739, -25.2637] },
      { markerOffset: 15, name: "Esi", coordinates: [25.2038, 15.852] },
      { markerOffset: 15, name: "Ana", coordinates: [11.9036, 42.4806] },
      { markerOffset: 15, name: "Leo", coordinates: [-87.0428, 15.0464] }
    ]
  },
  projects: {
    headerText: "EIC Projects",
    colors: {
      primary: "#149E6Ae3",
      secondary: "#58998026"
    },
    markers: [
      { markerOffset: 15, name: "FIND AGRDT", coordinates: [108.4678, 38.07] },
      { markerOffset: 15, name: "WHO HTS", coordinates: [8.1551, 16.8013] },
      {
        markerOffset: 15,
        name: "TB Diagnostics",
        coordinates: [-69.5739, 5.2637]
      },
      { markerOffset: 15, name: "FIND AMR", coordinates: [25.2038, -28.852] },
      { markerOffset: 15, name: "PSI HIVST", coordinates: [1.9036, 44.4806] }
    ]
  }
};

const MapChart = () => {
  const [poppedUp, setPoppedUp] = React.useState(null);
  const [mode, setMode] = React.useState("consultants");
  const toggleMode = (e) => {
    setMode(e.target.checked ? "projects" : "consultants");
  };

  const { headerText, colors, markers } = modeData[mode];
  const { primary: primaryColor, secondary: secondaryColor } = colors;
  return (
    <div>
      <h2>
        {headerText}
        <br />
        <label className="switch">
          <input onChange={toggleMode} type="checkbox" />
          <span className="slider round"></span>
        </label>
      </h2>
      {poppedUp && (
        <div className="popup">
          <span onClick={setPoppedUp.bind(this, null)} className="close">
            ✕
          </span>
          Information about {poppedUp.name}
        </div>
      )}
      <ComposableMap>
        {/* <ZoomableGroup zoom={1}> */}
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
            <g
              fill={secondaryColor}
              stroke={primaryColor}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              transform="translate(-12, -24)"
            >
              <circle cx="12" cy="10" r="3" />
              <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
            </g>
            <text
              textAnchor="middle"
              y={markerOffset}
              style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}
            >
              {name}
            </text>
          </Marker>
        ))}
        {/* </ZoomableGroup> */}
      </ComposableMap>
    </div>
  );
};

export default MapChart;
