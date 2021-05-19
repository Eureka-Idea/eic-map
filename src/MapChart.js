import React, { useMemo, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker,
} from "react-simple-maps";
import {
  GEO_URL,
  MODE_DATA,
  PIN_COLORS,
  PIN_FILL_OPACITY,
  PIN_STROKE_OPACITY,
  PIN_WIDTH,
  PIN_HEIGHT,
  ROTATION_MAGNITUDE,
  getTransform,
} from "./consts";

const MapChart = ({ members, setTooltipContent, setSelectedMember }) => {
  console.log("members: ", members);

  // const [mode, setMode] = React.useState("consultants");
  // const toggleMode = (e) => {
  //   setMode(e.target.checked ? "projects" : "consultants");
  // };

  const { headerText, colors } = MODE_DATA["consultants"];

  const Markers = useMemo(() => 
    members
      .filter((m) => m.latitude && m.longitude)
      .sort((m1, m2) => m2.latitude - m1.latitude) // so shafts appear under heads
      .map((m, i) => {
        const { name, latitude, longitude, col_rotation = 0 } = m;
        if (!i) console.log("RUNNING MEMOIZED MEMBER CREATION")
        return (
          <Marker
            key={name}
            coordinates={[longitude, latitude]}
            onClick={setSelectedMember.bind(null, m)}
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
    <>
      <ComposableMap data-tip="">
        <ZoomableGroup zoom={1}>
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  fill={colors.secondary}
                  stroke={colors.outline}
                  strokeWidth=".2"
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={(e) => {
                    e.target.setAttribute("fill", colors.primary);
                    setTooltipContent(geo.properties.NAME);
                  }}
                  onMouseLeave={(e) => {
                    e.target.setAttribute("fill", colors.secondary);
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
    </>
  );
};

export default MapChart;
