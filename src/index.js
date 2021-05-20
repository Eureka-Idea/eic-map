import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

import MapChart from "./MapChart";
import ReactTooltip from "react-tooltip";
import MemberDetails from "./MemberDetails";
import _, { lowerCase } from "lodash";

// format of col nicknames
const regexpNickname = /(col_\w+)/;

const MULTI_SELECT_VALUE_MAP = {
  core_skills_multi: [],
  focus_area_multi: [],
  projects: [],
};

const setMultiSelectValues = (members) => {
  members.forEach((member) => {
    _.each(MULTI_SELECT_VALUE_MAP, (v, field) => {
      const values = member[field] || [];
      MULTI_SELECT_VALUE_MAP[field].push(...values);
    });
  });

  _.each(MULTI_SELECT_VALUE_MAP, (v, field) => {
    MULTI_SELECT_VALUE_MAP[field] = _.chain(MULTI_SELECT_VALUE_MAP[field])
      .uniq()
      .sort((a, b) => lowerCase(a) > lowerCase(b))
      .value();
  });
};

function App() {
  const [members, setMembers] = useState([]);;
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

  const [selectedMember, setSelectedMember] = useState(null);
  const selectMemberHandler = (m) => {
    setSelectedMember(m);
  };
  const unselectMemberHandler = () => {
    setSelectedMember(null);
  };
  
  return (
    <div>
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
