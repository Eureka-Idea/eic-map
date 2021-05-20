import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

import MapChart from "./MapChart";
import ReactTooltip from "react-tooltip";
import MemberDetails from "./MemberDetails";
import _, { lowerCase } from "lodash";
import FilterPanel from "./FilterPanel";

// format of col nicknames
const regexpNickname = /(col_\w+)/;

// const MULTI_SELECT_VALUE_MAP = {
//   core_skills_multi: [],
//   focus_area_multi: [],
//   projects: [],
// };

const MULTI_SELECT_CONFIG = [
  { key: "core_skills_multi", title: "Core Skills", options: [] },
  { key: "focus_area_multi", title: "Focus Area", options: [] },
  { key: "projects", title: "Projects", options: [] },
];
const multiStateMap = _.reduce(MULTI_SELECT_CONFIG, (accum, next) => {
  accum[next.key] = [];
  return accum;
}, {});

const setMultiSelectValues = (members) => {
  members.forEach((member) => {
    _.each(MULTI_SELECT_CONFIG, ({ key, options }) => {
      const values = member[key] || [];
      options.push(...values);
    });
  });

  MULTI_SELECT_CONFIG.forEach(({ options, key }, idx) => {
    console.log(options);
    MULTI_SELECT_CONFIG[idx].options = _.chain(options)
      .uniq()
      .sort((a, b) => lowerCase(a) > lowerCase(b))
      .map((o) => ({ label: o, value: o }))
      .value();
  });
};

function App() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    console.log("FETCHING MEMBER DATA");
    fetch(
      // read-only key
      "https://api.airtable.com/v0/appElHJfSTDnbbrr7/Gallery?api_key=keyFRBqnIvAd1gkXG"
    )
      .then((response) => response.json())
      .then((data) => {
        const members = data.records.map((r) => {
          const memObj = { id: r.id };

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

        setMultiSelectValues(members);
        setMembers(members);
      });
  }, []);;

  const [tooltipContent, setTooltipContent] = useState("");

  const [selectedOptionsMap, setSelectedOptionsMap] = useState(multiStateMap);

  const handleSelectOptions = (key, selected) => {
    // const options = selectedOptionsMap[key];
    console.log(key, selected);
    // options.push(selected);
    const newState = _.cloneDeep(selectedOptionsMap);
    _.set(newState, key, selected);
    setSelectedOptionsMap(newState);
  };

  const [selectedMember, setSelectedMember] = useState(null);
  const selectMemberHandler = (m) => {
    setSelectedMember(m);
  };
  const unselectMemberHandler = () => {
    setSelectedMember(null);
  };

  console.log("NOW: ", selectedOptionsMap);
  
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
        members={members}
        setSelectedMember={selectMemberHandler}
        setTooltipContent={setTooltipContent}
      />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
