import React, { useState } from "react"
import {
  Backdrop,
  Box,
  ButtonGroup,
  Drawer,
  IconButton,
  Link,
  makeStyles,
  Modal,
  Typography,
  useMediaQuery,
} from "@material-ui/core"
import _ from "lodash"
import Select from "react-select"
import clsx from "clsx"
import { FilterList, Filter1Rounded, Close } from "@material-ui/icons"

const useStyles = makeStyles((theme) => ({
  root: {
    // position: "fixed",
    // width: "100%",
    // top: "0",
    // bottom: "0",
    // right: "-100%",
    // transition: "right 250ms, top 250ms",
    width: "100vw",
    // backgroundColor: "#e8f2ff",
    backgroundColor: "#e6e3d7",
    boxShadow: theme.shadows[5],
    // "&$open": {
    //   right: 0,
    // },
    // "&$tall": {
    //   top: "10vh",
    //   bottom: "0",
    //   maxHeight: "500px",
    // },
    [theme.breakpoints.up(500)]: {
      width: "254px",
    },
    [theme.breakpoints.up("md")]: {
      width: "320px",
      "& $content": {
        padding: theme.spacing(3, 4),
      },
    },
  },
  open: {},
  tall: {},
  content: {
    overflowY: "scroll",
    height: "100%",
    width: "100%",
    padding: theme.spacing(2),
    // paddingTop: theme.spacing(4), // room for X
    boxSizing: "border-box",
  },
  header: {
    fontSize: ".75rem",
    lineHeight: 1.25,
    paddingRight: theme.spacing(4), // room for X
    paddingTop: theme.spacing(1), // room for X
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
  toggleButton: {
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
  },
}))

const FilterPanel = ({
  multiSelectConfig,
  handleSelectOptions,
  selectedOptionsMap,
  togglePanelOpen,
  panelOpen,
}) => {
  // const [selectedOption, setSelectedOption] = useState(null);

  console.log(selectedOptionsMap)

  const classes = useStyles()

  // const isTall = useMediaQuery("(min-height:500px)")

  const classNames = clsx(classes.paper, {
    // [classes.open]: panelOpen,
    // [classes.tall]: isTall,
  })
  return (
    <Drawer
      // className={classes.root}
      classes={{ paper: [classes.root] }}
      open={panelOpen}
      variant="persistent"
      anchor="right"
    >
      <ButtonGroup className={classes.toggleButton} onClick={togglePanelOpen}>
        <IconButton onClick={togglePanelOpen}>
          <Close />
        </IconButton>
      </ButtonGroup>
      <div className={classes.content}>
        <Typography className={classes.header} variant="body1">
          Filter to members fitting <em>all</em> of the following criteria
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
    </Drawer>
  )
}

export default FilterPanel
