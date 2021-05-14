import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

import MapChart from "./MapChart";

function App() {
  const [members, setMembers] = useState([]);;
  useEffect(() => {
    fetch(
      // read-only key
      "https://api.airtable.com/v0/appElHJfSTDnbbrr7/Gallery?api_key=keyFRBqnIvAd1gkXG"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setMembers(data)  
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
