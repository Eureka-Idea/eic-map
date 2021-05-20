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
  PIN_STROKE,
  PIN_STROKE_OPACITY,
  PIN_GRAD_OPACITY,
  PIN_HEAD_STROKE_WIDTH,
  PIN_SHAFT_STROKE_WIDTH,
  PIN_WIDTH,
  PIN_HEIGHT,
  PIN_HEAD_SCALE,
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
            <g transform={getTransform(col_rotation)}>
              <line
                x1={PIN_WIDTH / 2}
                y1={PIN_WIDTH / 2}
                x2={PIN_WIDTH / 2}
                y2={PIN_HEIGHT}
                className="pin-shaft"
                stroke={PIN_STROKE}
                strokeWidth={PIN_SHAFT_STROKE_WIDTH}
                strokeOpacity={PIN_STROKE_OPACITY}
                strokeLinecap="round"
              />
              <circle
                cx={PIN_WIDTH / 2}
                cy={PIN_WIDTH / 2}
                r={(PIN_WIDTH / 2) * PIN_HEAD_SCALE}
                className="pin-head"
                stroke={PIN_STROKE}
                strokeOpacity={PIN_STROKE_OPACITY}
                strokeWidth={PIN_HEAD_STROKE_WIDTH}
                fill={PIN_COLORS[i]}
                fillOpacity={PIN_FILL_OPACITY}
              />
              <circle
                cx={PIN_WIDTH / 2}
                cy={PIN_WIDTH / 2}
                r={(PIN_WIDTH / 2) * PIN_HEAD_SCALE}
                className="pin-head-grad"
                stroke="transparent"
                fill="url(#light-reflection)"
                fillOpacity={PIN_GRAD_OPACITY}
              />
            </g>
            {/* reference point: */}
            {/* <circle cx="0" cy="0" r=".4"></circle> */}
          </Marker>
        );
      }),
    [members, setTooltipContent]
    )

  return (
    <>
      <ComposableMap data-tip="">
        <defs>
          <radialGradient
            id="light-reflection"
            cx="46%"
            cy="60%"
            r="50%"
            fx="46%"
            fy="60%"
          >
            <stop offset="0%" stopOpacity="0" stopColor="#fff" />
            <stop offset="100%" stopOpacity="1" stopColor="#000" />
          </radialGradient>
        </defs>
        <ZoomableGroup zoom={1}>
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  fill={colors.secondary}
                  stroke={colors.outline}
                  strokeWidth=".1"
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
      {/* <div>
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
      </div> */}
    </>
  );
};

export default MapChart;
