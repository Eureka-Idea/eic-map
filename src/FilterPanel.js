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
    height: "75vw", // map aspect ratio 4:3
    backgroundColor: "#e6e3d7", //#e2dfc9
    boxShadow: theme.shadows[5],
    [theme.breakpoints.up(500)]: {
      width: "254px",
    },
    [theme.breakpoints.up("sm")]: {
      width: "300px",
    },
    [theme.breakpoints.up("md")]: {
      width: "360px",
      "& $content": {
        padding: theme.spacing(3, 4),
      },
    },
    [theme.breakpoints.up("lg")]: {
      width: "420px",
    },
    [theme.breakpoints.up("xl")]: {
      width: "480px",
    },
  },
  content: {
    overflowY: "auto",
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
    paddingBottom: theme.spacing(1),
  },
  multiSelect: {
    fontSize: ".75rem",
    paddingBottom: theme.spacing(1),
  },
  detailTitle: {
    fontSize: ".6rem",
    letterSpacing: "1.6px",
    lineHeight: 1.5,
    fontFamily: "monospace",
    textTransform: "uppercase",
    // paddingTop: theme.spacing(1),
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
  handleSelectCountries,
  selectedOptionsMap,
  togglePanelOpen,
  panelOpen,
  countries,
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
          Filter to members who fit <em>all</em> of the following criteria
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
              closeMenuOnSelect={true}
              defaultValue={null}
              onChange={handleSelectOptions.bind(this, key)}
              options={options}
            />
          </div>
        ))}
        <Typography className={classes.header} variant="body1">
          and reside in one of the following countries
        </Typography>
        <Select
          className={classes.multiSelect}
          placeholder="Any"
          id="country-select"
          isMulti
          closeMenuOnSelect={false}
          defaultValue={null}
          onChange={handleSelectCountries}
          options={countries}
        />
      </div>
    </Drawer>
  )
}

export default FilterPanel
