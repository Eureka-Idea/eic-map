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
  PIN_SHAFT_WIDTH,
  PIN_WIDTH,
  PIN_HEIGHT,
  PIN_HEAD_SCALE,
  getTransform,
} from "./consts";
import _ from "lodash";


const MapChart = ({
  allMembers,
  visibleMemberMap,
  setTooltipContent,
  setSelectedMember,
}) => {
  console.log("allMembers: ", allMembers);

  const { headerText, colors } = MODE_DATA["consultants"];

  const MarkerMap = useMemo(
    () =>
      allMembers
        .filter((m) => m.latitude && m.longitude)
        .reduce((accum, m, i) => {
          const { name, latitude, longitude, col_rotation = 0 } = m;
          if (!i) console.log("RUNNING MEMOIZED MEMBER CREATION");
          accum[m.index] = (
            <Marker
              key={name}
              coordinates={[longitude, latitude]}
              onClick={setSelectedMember.bind(null, m)}
              onMouseEnter={(e) => {
                setTooltipContent(name);
              }}
              onMouseLeave={() => {
                setTooltipContent("");
              }}
            >
              <g transform={getTransform(col_rotation)}>
                <rect
                  ry=".5"
                  x={PIN_WIDTH / 2 - PIN_SHAFT_WIDTH / 2}
                  y={PIN_WIDTH / 2}
                  width={PIN_SHAFT_WIDTH}
                  height={PIN_HEIGHT - PIN_WIDTH / 2}
                  fill="url(#shaft-reflection)"
                  className="pin-shaft"
                  strokeWidth="0"
                  strokeOpacity="0"
                />
                {/* <line
                x1={PIN_WIDTH / 2}
                y1={PIN_WIDTH / 2}
                x2={PIN_WIDTH / 2}
                y2={PIN_HEIGHT}
                className="pin-shaft"
                stroke={PIN_STROKE}
                strokeWidth={PIN_SHAFT_STROKE_WIDTH}
                strokeOpacity={PIN_STROKE_OPACITY}
                strokeLinecap="round"
              /> */}
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
                  fill="url(#head-reflection)"
                  fillOpacity={PIN_GRAD_OPACITY}
                />
              </g>
              {/* reference point: */}
              {/* <circle cx="0" cy="0" r=".4"></circle> */}
            </Marker>
          );
          return accum;
        }, {}),
    [allMembers, setTooltipContent]
  );

  const visibleMarkers = _.map(
    visibleMemberMap,
    (b, index) => MarkerMap[index]
  );

  return (
    <>
      <ComposableMap data-tip="">
        <defs>
          <radialGradient
            id="head-reflection"
            cx="46%"
            cy="60%"
            r="50%"
            fx="46%"
            fy="60%"
          >
            <stop offset="0%" stopOpacity="0" stopColor="#fff" />
            <stop offset="100%" stopOpacity="1" stopColor="#000" />
          </radialGradient>
          <linearGradient
            id="shaft-reflection"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopOpacity="1" stopColor="#777" />
            <stop offset="46%" stopOpacity="1" stopColor="#fcfcfc" />
            <stop offset="100%" stopOpacity="1" stopColor="#777" />
          </linearGradient>
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
          {visibleMarkers}
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
