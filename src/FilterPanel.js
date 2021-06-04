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
import clsx from "clsx"

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "fixed",
    top: "10vh",
    bottom: "10vh",
    right: "-100%",
    transition: "right 250ms",
    width: "300px",
    // maxHeight: "85vh",
    overflowY: "scroll",
    // backgroundColor: "#e8f2ff",
    backgroundColor: "#e6e3d7",
    // border: "1px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(3, 4),
    // margin: theme.spacing(2),
    "&$open": {
      right: 0,
    }
  },
  open: {},
  header: {
    fontSize: ".75rem",
    lineHeight: 1.25,
  },
  multiSelect: {
    fontSize: ".75rem",
  },
  detailTitle: {
    fontSize: ".6rem",
    letterSpacing: "1.6px",
    lineHeight: 1.5,
    fontFamily: "monospace",
    textTransform: "uppercase",
    paddingTop: theme.spacing(1),
  },
}))

const FilterPanel = ({
  multiSelectConfig,
  handleSelectOptions,
  selectedOptionsMap,
  panelOpen
}) => {
  // const [selectedOption, setSelectedOption] = useState(null);

  console.log(selectedOptionsMap)

  const classes = useStyles()

  const classNames = clsx(classes.paper, {
     [classes.open]: panelOpen 
  })
  return (
    <div className={classNames}>
      <Typography className={classes.header} variant="body1">
        Filter to members fitting <em>all</em> of the following
        criteria
      </Typography>
      {multiSelectConfig.map(({ title, options, key }) => (
        <div key={key} className={classes.selectWrapper}>
          <Typography className={classes.detailTitle} variant="subtitle1">
            {title}
          </Typography>
          <Select
            className={classes.multiSelect}
            placeholder="Any"
            id={key}
            isMulti
            closeMenuOnSelect={false}
            defaultValue={null}
            onChange={handleSelectOptions.bind(this, key)}
            options={options}
          />
        </div>
      ))}
    </div>
  )
}

export default FilterPanel
