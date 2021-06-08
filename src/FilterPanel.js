import React from "react"
import {
  ButtonGroup,
  Drawer,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core"
import _ from "lodash"
import Select from "react-select"
import { Close } from "@material-ui/icons"

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "100vw",
    backgroundColor: "#e6e3d7",
    boxShadow: theme.shadows[5],
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
  content: {
    overflowY: "scroll",
    height: "100%",
    width: "100%",
    padding: theme.spacing(2),
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

  const classes = useStyles()
  return (
    <Drawer
      classes={{ paper: [classes.paper] }}
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
