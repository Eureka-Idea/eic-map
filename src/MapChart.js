import React, { useMemo, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker,
} from "react-simple-maps";
import _ from "lodash";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const modeData = {
  consultants: {
    headerText: "EIC Consultants",
    colors: {
      primary: "#1b63c188",
      secondary: "#5a87c144",
      outline: "#00000016",
      // primary: "#1b63c1e3",
      // secondary: "#5a87c126",
    },
  },
  projects: {
    headerText: "EIC Projects",
    colors: {
      primary: "#149E6Ae3",
      secondary: "#58998026",
      outline: "#00000016",
    },
  },
};

const PIN_COLORS = _.uniq([
  "#63b598",
  "#ce7d78",
  "#ea9e70",
  "#a48a9e",
  "#c6e1e8",
  "#648177",
  "#0d5ac1",
  "#f205e6",
  "#1c0365",
  "#14a9ad",
  "#4ca2f9",
  "#a4e43f",
  "#d298e2",
  "#6119d0",
  "#d2737d",
  "#c0a43c",
  "#f2510e",
  "#651be6",
  "#79806e",
  "#61da5e",
  "#cd2f00",
  "#9348af",
  "#01ac53",
  "#c5a4fb",
  "#996635",
  "#b11573",
  "#4bb473",
  "#75d89e",
  "#2f3f94",
  "#2f7b99",
  "#da967d",
  "#34891f",
  "#b0d87b",
  "#ca4751",
  "#7e50a8",
  "#c4d647",
  "#e0eeb8",
  "#11dec1",
  "#289812",
  "#566ca0",
  "#ffdbe1",
  "#2f1179",
  "#935b6d",
  "#916988",
  "#513d98",
  "#aead3a",
  "#9e6d71",
  "#4b5bdc",
  "#0cd36d",
  "#250662",
  "#cb5bea",
  "#228916",
  "#ac3e1b",
  "#df514a",
  "#539397",
  "#880977",
  "#f697c1",
  "#ba96ce",
  "#679c9d",
  "#c6c42c",
  "#5d2c52",
  "#48b41b",
  "#e1cf3b",
  "#5be4f0",
  "#57c4d8",
  "#a4d17a",
  "#225b8",
  "#be608b",
  "#96b00c",
  "#088baf",
  "#f158bf",
  "#e145ba",
  "#ee91e3",
  "#05d371",
  "#5426e0",
  "#4834d0",
  "#802234",
  "#6749e8",
  "#0971f0",
  "#8fb413",
  "#b2b4f0",
  "#c3c89d",
  "#c9a941",
  "#41d158",
  "#fb21a3",
  "#51aed9",
  "#5bb32d",
  "#807fb",
  "#21538e",
  "#89d534",
  "#d36647",
  "#7fb411",
  "#0023b8",
  "#3b8c2a",
  "#986b53",
  "#f50422",
  "#983f7a",
  "#ea24a3",
  "#79352c",
  "#521250",
  "#c79ed2",
  "#d6dd92",
  "#e33e52",
  "#b2be57",
  "#fa06ec",
  "#1bb699",
  "#6b2e5f",
  "#64820f",
  "#21538e",
  "#89d534",
  "#d36647",
  "#7fb411",
  "#0023b8",
  "#3b8c2a",
  "#986b53",
  "#f50422",
  "#983f7a",
  "#ea24a3",
  "#79352c",
  "#521250",
  "#c79ed2",
  "#d6dd92",
  "#e33e52",
  "#b2be57",
  "#fa06ec",
  "#1bb699",
  "#6b2e5f",
  "#64820f",
  "#1c271",
  "#9cb64a",
  "#996c48",
  "#9ab9b7",
  "#06e052",
  "#e3a481",
  "#0eb621",
  "#fc458e",
  "#b2db15",
  "#aa226d",
  "#792ed8",
  "#73872a",
  "#520d3a",
  "#cefcb8",
  "#a5b3d9",
  "#7d1d85",
  "#c4fd57",
  "#f1ae16",
  "#8fe22a",
  "#ef6e3c",
  "#243eeb",
  "#1dc18",
  "#dd93fd",
  "#3f8473",
  "#e7dbce",
  "#421f79",
  "#7a3d93",
  "#635f6d",
  "#93f2d7",
  "#9b5c2a",
  "#15b9ee",
  "#0f5997",
  "#409188",
  "#911e20",
  "#1350ce",
  "#10e5b1",
  "#fff4d7",
  "#cb2582",
  "#ce00be",
  "#32d5d6",
  "#17232",
  "#608572",
  "#c79bc2",
  "#00f87c",
  "#77772a",
  "#6995ba",
  "#fc6b57",
  "#f07815",
  "#8fd883",
  "#060e27",
  "#96e591",
  "#21d52e",
  "#d00043",
  "#b47162",
  "#1ec227",
  "#4f0f6f",
  "#1d1d58",
  "#947002",
  "#bde052",
  "#e08c56",
  "#28fcfd",
  "#bb09b",
  "#36486a",
  "#d02e29",
  "#1ae6db",
  "#3e464c",
  "#a84a8f",
  "#911e7e",
  "#3f16d9",
  "#0f525f",
  "#ac7c0a",
  "#b4c086",
  "#c9d730",
  "#30cc49",
  "#3d6751",
  "#fb4c03",
  "#640fc1",
  "#62c03e",
  "#d3493a",
  "#88aa0b",
  "#406df9",
  "#615af0",
  "#4be47",
  "#2a3434",
  "#4a543f",
  "#79bca0",
  "#a8b8d4",
  "#00efd4",
  "#7ad236",
  "#7260d8",
  "#1deaa7",
  "#06f43a",
  "#823c59",
  "#e3d94c",
  "#dc1c06",
  "#f53b2a",
  "#b46238",
  "#2dfff6",
  "#a82b89",
  "#1a8011",
  "#436a9f",
  "#1a806a",
  "#4cf09d",
  "#c188a2",
  "#67eb4b",
  "#b308d3",
  "#fc7e41",
  "#af3101",
  "#ff065",
  "#71b1f4",
  "#a2f8a5",
  "#e23dd0",
  "#d3486d",
  "#00f7f9",
  "#474893",
  "#3cec35",
  "#1c65cb",
  "#5d1d0c",
  "#2d7d2a",
  "#ff3420",
  "#5cdd87",
  "#a259a4",
  "#e4ac44",
  "#1bede6",
  "#8798a4",
  "#d7790f",
  "#b2c24f",
  "#de73c2",
  "#d70a9c",
  "#25b67",
  "#88e9b8",
  "#c2b0e2",
  "#86e98f",
  "#ae90e2",
  "#1a806b",
  "#436a9e",
  "#0ec0ff",
  "#f812b3",
  "#b17fc9",
  "#8d6c2f",
  "#d3277a",
  "#2ca1ae",
  "#9685eb",
  "#8a96c6",
  "#dba2e6",
  "#76fc1b",
  "#608fa4",
  "#20f6ba",
  "#07d7f6",
  "#dce77a",
  "#77ecca",
]);

const PIN_FILL_OPACITY = 1;
const PIN_STROKE_OPACITY = 0.3;
const PIN_WIDTH = 10;
const PIN_HEIGHT = 22;
// degrees per notch
const ROTATION_MAGNITUDE = 15;
// to calc X offset as a result of rotation
const ROTATION_X_CONSTANT = 2.8;
// to calc Y offset as a result of rotation
const ROTATION_Y_CONSTANT = 0.7;

const getTransform = (rotation) => {
  const extent = rotation / 180;
  const transX = 0 + extent * PIN_HEIGHT * ROTATION_X_CONSTANT;
  const transY =
    Math.abs(extent * PIN_HEIGHT * ROTATION_Y_CONSTANT) - PIN_HEIGHT * 0.94;

  const trans = `translate(${transX}, ${transY}) rotate(${rotation})`;
  // console.log(trans);
  return trans;
};

const MapChart = ({ members, setTooltipContent }) => {
  console.log("members: ", members);
  const [poppedUp, setPoppedUp] = React.useState(null);
  const [mode, setMode] = React.useState("consultants");
  const toggleMode = (e) => {
    setMode(e.target.checked ? "projects" : "consultants");
  };

  const { headerText, colors } = modeData[mode];

  const Markers = useMemo(
    () => members
      .filter((m) => m.latitude && m.longitude)
      .sort((m1, m2) => m2.latitude - m1.latitude) // so shafts appear under heads
      .map((m, i) => {
        const { name, latitude, longitude, col_rotation = 0 } = m;
        if (!i) console.log("RUNNING MEMOIZED MEMBER CREATION")
        return (
          <Marker
            key={name}
            coordinates={[longitude, latitude]}
            onClick={setPoppedUp.bind(this, { name })}
            onMouseEnter={(e) => {
              // e.target.parentElement.firstChild.setAttribute("fill-opacity", 1);
              // e.target.parentElement.firstChild.setAttribute("stroke-opacity", 1);
              setTooltipContent(name);
            }}
            onMouseLeave={(e) => {
              // e.target.parentElement.firstChild.setAttribute("fill-opacity", PIN_FILL_OPACITY);
              // e.target.parentElement.firstChild.setAttribute("stroke-opacity", PIN_STROKE_OPACITY);
              setTooltipContent("");
            }}
          >
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid meet"
              viewBox="114.64145469651561 105.6206896551725 34.3723384069327 71.72390017464997"
              width={PIN_WIDTH}
              height={PIN_HEIGHT}
              // width="30.37"
              // height="67.72"
              transform={getTransform(col_rotation * ROTATION_MAGNITUDE)}
            >
              <path
                d="M146.01 120.22C146.01 127.73 139.92 133.82 132.41 133.82C124.91 133.82 118.81 127.73 118.81 120.22C118.81 112.71 124.91 106.62 132.41 106.62C139.92 106.62 146.01 112.71 146.01 120.22Z"
                className="pin-head"
                stroke="#000000"
                strokeOpacity={PIN_STROKE_OPACITY}
                fill={PIN_COLORS[i]}
                fillOpacity={PIN_FILL_OPACITY}
              ></path>
              <path
                d="M128.55 133.63L115.64 174.34"
                className="pin-shaft"
                stroke="#000000"
                strokeWidth="1"
                strokeOpacity=".6"
              ></path>
            </svg>
            {/* <text
            textAnchor="middle"
            y={markerOffset}
            style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}
          >
            {name}
          </text> */}
          </Marker>
        );
    }),
    [members, setTooltipContent]
  ) 

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
      <ComposableMap data-tip="">
        <ZoomableGroup zoom={1}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  fill={colors.secondary}
                  stroke={colors.outline}
                  strokeWidth="1"
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={(e) => {
                    e.target.setAttribute("fill", colors.primary);
                    // e.target.setAttribute("fill", "#5a87c1");
                    // console.log("E: ", e);
                    // console.log("GEO: ", geo);
                    setTooltipContent(geo.properties.NAME);
                  }}
                  onMouseLeave={(e) => {
                    e.target.setAttribute("fill", colors.secondary);
                    // e.target.setAttribute("fill", "#5a87c1");
                    // console.log("E: ", e);
                    // console.log("GEO: ", geo);
                    setTooltipContent("");
                  }}
                />
              ))
            }
          </Geographies>
          {Markers}
        </ZoomableGroup>
      </ComposableMap>
      <div>
        {PIN_COLORS.map((color) => {
          const style = {
            backgroundColor: color + "88",
            width: 200,
            height: 30,
            display: "inline-block",
          };
          return (
            <span key={color} style={style}>
              {color}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default MapChart;
