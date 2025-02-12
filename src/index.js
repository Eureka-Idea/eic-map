import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom"

import "./styles.css"

import MapChart from "./MapChart"
import ReactTooltip from "react-tooltip"
import MemberDetails from "./MemberDetails"
import _ from "lodash"
import FilterPanel from "./FilterPanel"
import { getApiLink } from "./consts"
import {
  Icon,
  IconButton,
  makeStyles,
  useMediaQuery,
  useTheme,
} from "@material-ui/core"
import { FilterList } from "@material-ui/icons"
import clsx from "clsx"

// format of col nicknames
const regexpNickname = /(col_\w+)/

// const MULTI_SELECT_VALUE_MAP = {
//   core_skills_multi: [],
//   focus_area_multi: [],
//   projects: [],
// };

const MULTI_SELECT_CONFIG = [
  {
    key: "focus_area",
    title: "Focus Area",
    options: [],
    nameMap: {},
    tableName: "focus%20area",
    fieldName: "Focus Area",
  },
  {
    key: "core_skills",
    title: "Core Skills",
    options: [],
    nameMap: {},
    tableName: "skills",
    fieldName: "Core Skill",
  },
  {
    key: "projects",
    title: "Projects",
    options: [],
    nameMap: {},
    tableName: "projects",
    fieldName: "Project Name",
  },
]

let COUNTRIES = []

const multiStateMap = _.reduce(
  MULTI_SELECT_CONFIG,
  (accum, next) => {
    accum[next.key] = []
    return accum
  },
  {}
)

// based on members' values, generate possible multi select filter options
const setMultiSelectValues = (members) => {
  members.forEach((member) => {
    _.each(MULTI_SELECT_CONFIG, ({ key, options }) => {
      const values = member[key] || []
      options.push(...values)
    })
  })

  MULTI_SELECT_CONFIG.forEach(({ options, nameMap }, idx) => {
    MULTI_SELECT_CONFIG[idx].options = _.chain(options)
      .uniq()
      .map((o) => ({ label: nameMap[o], value: o }))
      .filter((o) => {
        const keep = !!o.label
        // TODO: figure out where these are coming from
        !keep && console.warn("Discarding labelless option: ", o)
        return keep
      })
      .sort((a, b) => (a.label.toLowerCase() > b.label.toLowerCase() ? 1 : -1))
      .value()
  })

  COUNTRIES = _.chain(members)
    .map("country")
    .uniq()
    .sort((a, b) => a.toLowerCase() > b.toLowerCase())
    .map((c) => ({ label: c, value: c }))
    .value()
}

const useStyles = makeStyles((theme) => ({
  app: {},
  filterButton: {
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
    "&.filterActive svg": {
      fill: "#ff8f00",
    },
  },
}))

function App() {
  const [visibleMemberMap, setVisibleMemberMap] = useState({})
  const [allMembers, setAllMembers] = useState([])

  const [tooltipContent, setTooltipContent] = useState("")
  const [selectedOptionsMap, setSelectedOptionsMap] = useState(multiStateMap)
  const [selectedCountries, setSelectedCountries] = useState([])
  const filterActive =
    selectedCountries.length ||
    _.some(selectedOptionsMap, (values) => !!values.length)

  const [selectedMember, setSelectedMember] = useState(null)
  const unselectMemberHandler = () => setSelectedMember(null)

  const [panelOpen, setPanelOpen] = useState(false)
  const togglePanelOpen = () => setPanelOpen(!panelOpen)

  const theme = useTheme()
  const bigEnough = useMediaQuery(theme.breakpoints.up("sm"), { noSsr: true })

  useEffect(() => {
    // get multi select base data first, so we have nameMaps before setMultiSelectValues
    Promise.all(
      MULTI_SELECT_CONFIG.map(({ title, nameMap, tableName, fieldName }) => {
        return fetch(getApiLink(tableName))
          .then((response) => response.json())
          .then((data) => {
            console.log("FETCH ", title)
            console.log(data.records)
            data.records.forEach((r) => (nameMap[r.id] = r.fields[fieldName]))
          })
          .catch((error) => {
            console.error(error)
          })
      })
    ).then(() => {
      console.log("FETCH MEMBER DATA")
      fetch(getApiLink("members"))
        .then((response) => response.json())
        .then((data) => {
          const allMemberMap = {}
          const allMembers = data.records
            .filter((m) => m.fields.Latitude && m.fields.Longitude) // only located members
            .sort((m1, m2) => m2.fields.Latitude - m1.fields.Latitude) // so pins overlap correctly
            .map((r, index) => {
              const memObj = { index }
              allMemberMap[index] = true // all members start out visible

              Object.keys(r.fields).forEach((field) => {
                const val = r.fields[field]
                const nicknameMatch = field.match(regexpNickname)

                if (nicknameMatch && nicknameMatch[0]) {
                  const nickname = nicknameMatch[0]
                  memObj[nickname] = val
                } else {
                  const standardizedField = field
                    .toLowerCase()
                    .replaceAll("-", " ")
                    .replaceAll(/\s+/g, "_")
                  memObj[standardizedField] = val
                }
              })

              const leads = _.get(memObj, "project_lead", [])
              const consults = _.get(memObj, "project_consultant", [])
              memObj.projects = _.uniq([...leads, ...consults])
              return memObj
            })

          setMultiSelectValues(allMembers)
          setAllMembers(allMembers)

          if (bigEnough) setPanelOpen(true)
        })
        .catch((error) => {
          console.error(error)
        })
    })
  }, [])

  const setVisible = () => {
    const countriesSelected = selectedCountries.length

    const visibleMap = allMembers.reduce((visMap, member) => {
      const visible = _.every(selectedOptionsMap, (selectedValues, field) => {
        if (countriesSelected && !selectedCountries.includes(member.country)) {
          return false
        }
        return selectedValues.every(
          ({ value }) => member[field] && member[field].includes(value)
        )
      })

      if (visible) visMap[member.index] = true
      return visMap
    }, {})

    console.log("visibleMap: ", visibleMap)
    setVisibleMemberMap(visibleMap)
  }
  const debouncedSetVisible = _.debounce(setVisible, 500)

  // update the visibleMemberMap if filters change
  useEffect(debouncedSetVisible, [
    selectedOptionsMap,
    selectedCountries,
    allMembers,
  ])

  const handleSelectOptions = (key, selected) => {
    const newState = _.cloneDeep(selectedOptionsMap)
    _.set(newState, key, selected)

    setSelectedOptionsMap(newState)
  }

  const handleSelectCountries = (selected) => {
    setSelectedCountries(_.map(selected, "value"))
  }

  const classes = useStyles()
  const filtersIconClasses = clsx(classes.filterButton, { filterActive })

  return (
    <div classes={classes.app}>
      <IconButton onClick={togglePanelOpen} className={filtersIconClasses}>
        <FilterList />
      </IconButton>
      <FilterPanel
        multiSelectConfig={MULTI_SELECT_CONFIG}
        selectedOptionsMap={selectedOptionsMap}
        handleSelectOptions={handleSelectOptions}
        handleSelectCountries={handleSelectCountries}
        panelOpen={panelOpen}
        togglePanelOpen={togglePanelOpen}
        countries={COUNTRIES}
      />
      <MemberDetails
        selectedMember={selectedMember}
        unselectMemberHandler={unselectMemberHandler}
        selectedOptionsMap={selectedOptionsMap}
        MULTI_SELECT_CONFIG={MULTI_SELECT_CONFIG}
      />
      <ReactTooltip>{tooltipContent}</ReactTooltip>
      <MapChart
        allMembers={allMembers}
        selectedCountries={selectedCountries}
        visibleMemberMap={visibleMemberMap}
        setSelectedMember={setSelectedMember}
        setTooltipContent={setTooltipContent}
      />
    </div>
  )
}

const rootElement = document.getElementById("root")
ReactDOM.render(<App />, rootElement)
