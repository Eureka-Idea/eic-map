import React, { useState } from "react"
import {
  Backdrop,
  Link,
  makeStyles,
  Modal,
  Typography,
} from "@material-ui/core"
import _ from "lodash"
import Select from "react-select"

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    top: "10vh",
    bottom: "10vh",
    right: 0,
    width: "300px",
    // maxHeight: "85vh",
    overflowY: "scroll",
    // backgroundColor: "#e8f2ff",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #000",
    // boxShadow: theme.shadows[5],
    padding: theme.spacing(3, 4),
    // margin: theme.spacing(2),
  },
}))

const FilterPanel = ({
  multiSelectConfig,
  handleSelectOptions,
  selectedOptionsMap,
}) => {
  // const [selectedOption, setSelectedOption] = useState(null);

  console.log(selectedOptionsMap)

  const classes = useStyles()

  return (
    <div className={classes.paper}>
      Filter to members fitting <emphasis>all</emphasis> of the following
      criteria
      {multiSelectConfig.map(({ title, options, key }) => (
        <div key={key}>
          {title}
          <Select
            placeholder="any"
            id={key}
            isMulti
            closeMenuOnSelect={false}
            defaultValue={null}
            onChange={handleSelectOptions.bind(this, key)}
            options={options}
          />
          <br />
        </div>
      ))}
    </div>
  )
}

export default FilterPanel
