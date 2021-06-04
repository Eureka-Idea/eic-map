import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

import MapChart from "./MapChart";
import ReactTooltip from "react-tooltip";
import MemberDetails from "./MemberDetails";
import _ from "lodash";
import FilterPanel from "./FilterPanel";

// format of col nicknames
const regexpNickname = /(col_\w+)/;

// const MULTI_SELECT_VALUE_MAP = {
//   core_skills_multi: [],
//   focus_area_multi: [],
//   projects: [],
// };

const MULTI_SELECT_CONFIG = [
  { key: "focus_area_multi", title: "Focus Area", options: [] },
  { key: "core_skills_multi", title: "Core Skills", options: [] },
  { key: "projects", title: "Projects", options: [] },
];
const multiStateMap = _.reduce(MULTI_SELECT_CONFIG, (accum, next) => {
  accum[next.key] = [];
  return accum;
}, {});

// based on members' values, select possible multi select filter options
const setMultiSelectValues = (members) => {
  members.forEach((member) => {
    _.each(MULTI_SELECT_CONFIG, ({ key, options }) => {
      const values = member[key] || [];
      options.push(...values);
    });
  });

  MULTI_SELECT_CONFIG.forEach(({ options, key }, idx) => {
    MULTI_SELECT_CONFIG[idx].options = _.chain(options)
      .uniq()
      .sort((a, b) => a.toLowerCase() > b.toLowerCase())
      .map((o) => ({ label: o, value: o }))
      .value();
  });
};

function App() {
  const [visibleMemberMap, setVisibleMemberMap] = useState({});
  const [allMembers, setAllMembers] = useState([]);

  const [tooltipContent, setTooltipContent] = useState("");
  const [selectedOptionsMap, setSelectedOptionsMap] = useState(multiStateMap);

  const [selectedMember, setSelectedMember] = useState(null);
  const unselectMemberHandler = () => setSelectedMember(null);

  useEffect(() => {
    console.log("FETCHING MEMBER DATA");
    fetch(
      // read-only key
      "https://api.airtable.com/v0/appElHJfSTDnbbrr7/Gallery?api_key=keyFRBqnIvAd1gkXG"
    )
      .then((response) => response.json())
      .then((data) => {
        const allMemberMap = {};
        const allMembers = data.records
          .filter((m) => m.fields.Latitude && m.fields.Longitude) // only located members
          .sort((m1, m2) => m2.fields.Latitude - m1.fields.Latitude) // so pins overlap correctly
          .map((r, index) => {
            const memObj = { index };
            allMemberMap[index] = true; // all members start out visible

            Object.keys(r.fields).forEach((field) => {
              const val = r.fields[field];
              const nicknameMatch = field.match(regexpNickname);

              if (nicknameMatch && nicknameMatch[0]) {
                const nickname = nicknameMatch[0];
                memObj[nickname] = val;
              } else {
                const standardizedField = field
                  .toLowerCase()
                  .replaceAll(" ", "_");
                memObj[standardizedField] = val;
              }
            });

            return memObj;
          });


        setMultiSelectValues(allMembers);
        setAllMembers(allMembers);
      });
  }, []);

  const setVisible = () => {
    const visibleMap = allMembers.reduce((visMap, member) => {
      const visible = _.every(selectedOptionsMap, (selectedValues, field) => {
        // console.log("field, selectedValues: ");
        // console.log(field, selectedValues);
        return selectedValues.every(
          ({ value }) => member[field] && member[field].includes(value)
        );
      });

      if (visible) visMap[member.index] = true;
      return visMap;
    }, {});

    console.log("visibleMap: ", visibleMap);
    setVisibleMemberMap(visibleMap);
  };
  const debouncedSetVisible = _.debounce(setVisible, 500);
  useEffect(debouncedSetVisible, [selectedOptionsMap, allMembers]);

  const handleSelectOptions = (key, selected) => {
    const newState = _.cloneDeep(selectedOptionsMap);
    _.set(newState, key, selected);

    setSelectedOptionsMap(newState);
  };

  return (
    <div>
      <FilterPanel
        multiSelectConfig={MULTI_SELECT_CONFIG}
        selectedOptionsMap={selectedOptionsMap}
        handleSelectOptions={handleSelectOptions}
      />
      <MemberDetails
        selectedMember={selectedMember}
        unselectMemberHandler={unselectMemberHandler}
      />
      <ReactTooltip>{tooltipContent}</ReactTooltip>
      <MapChart
        allMembers={allMembers}
        visibleMemberMap={visibleMemberMap}
        setSelectedMember={setSelectedMember}
        setTooltipContent={setTooltipContent}
      />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
