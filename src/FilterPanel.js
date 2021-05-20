import React, { useState } from "react";
import {
  Backdrop,
  Link,
  makeStyles,
  Modal,
  Typography,
} from "@material-ui/core";
import _ from "lodash";
import Select from "react-select";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    top: "10vh",
    bottom: "10vh",
    right: 0,
    width: "50vw",
    // maxHeight: "85vh",
    overflowY: "scroll",
    // backgroundColor: "#e8f2ff",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #000",
    // boxShadow: theme.shadows[5],
    padding: theme.spacing(3, 4),
    // margin: theme.spacing(2),
  },
}));

const introDetails = [
  { key: "membership", title: "Membership" },
  { key: "consulting_status", title: "Consulting Status" },
  { key: "location_&_timezone", title: "Location & Timezone" },
  { key: "educational_background", title: "Educational Background" },
  // { key: "online_profile_link", title: "website", link: true },
];

const filterableFields = [
  { key: "core_skills_multi", value: "Core Skills" },
  { key: "focus_area_multi", value: "Focus Area" },
  { key: "projects", value: "Projects" },
];

const FilterPanel = ({
  multiSelectConfig,
  handleSelectOptions,
  selectedOptionsMap,
}) => {
  // const [selectedOption, setSelectedOption] = useState(null);

  console.log(selectedOptionsMap);

  const classes = useStyles();

  const handler = (key, selected) => {
    // debugger;
    handleSelectOptions(key, selected);
  };

  return (
    <div className={classes.paper}>
      {multiSelectConfig.map(({ title, options, key }) => (
        <div key={key}>
          {title}
          <Select
            id={key}
            isMulti
            closeMenuOnSelect={false}
            defaultValue={null}
            onChange={handleSelectOptions}
            options={options}
          />
        </div>
      ))}
    </div>
  );
};

export default FilterPanel;
