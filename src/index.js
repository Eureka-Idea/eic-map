import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

import MapChart from "./MapChart";

// format of col nicknames
const regexpNickname = /(col_\w+)/;

function App() {
  const [members, setMembers] = useState([]);;
  useEffect(() => {
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

        setMembers(members);
      });
  }, []);;

  return (
    <div>
      <MapChart members={members} />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
