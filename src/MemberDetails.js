import React from "react"
import {
  Backdrop,
  Link,
  makeStyles,
  Modal,
  Typography,
} from "@material-ui/core"
import _ from "lodash"
import clsx from "clsx"

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    position: "absolute",
    maxWidth: 500,
    maxHeight: "85vh",
    overflowY: "scroll",
    backgroundColor: "#e8f2ff",
    // backgroundColor: theme.palette.background.paper,
    border: "1px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(3, 4),
    margin: theme.spacing(2),
  },
  introDetails: {
    display: "inline-block",
    minWidth: "220px",
    // fontSize: ".75rem",
  },
  bodyDetails: {
    paddingBottom: theme.spacing(2),
  },
  name: {
    fontSize: "1.5rem",
    fontVariant: "petite-caps",
    letterSpacing: "0.8px",
    verticalAlign: "top",
    textAlign: "unset",
    display: "inline-block",
    borderBottom: "2px solid #0858c0",
    marginBottom: theme.spacing(2),
  },
  detailTitle: {
    fontSize: ".6rem",
    letterSpacing: "1.6px",
    lineHeight: 1.5,
    fontFamily: "monospace",
    textTransform: "uppercase",
    paddingTop: theme.spacing(1),
  },
  detailValue: {
    fontSize: ".75rem",
    display: "inline",
  },
  selectedAttribute: {
    fontWeight: "700",
  },
  profileLink: {
    fontSize: ".75rem",
    fontFamily: "monospace",
    display: "inline-block",
    paddingBottom: theme.spacing(3),
    color: "#0858c0",
  },
  headshot: {
    maxWidth: "75px",
    marginLeft: theme.spacing(2),
    verticalAlign: "top",
  },
}))

const introDetails = [
  { key: "membership", title: "Membership" },
  { key: "consulting_status", title: "Consulting Status" },
  { key: "location_&_timezone", title: "Location & Timezone" },
  { key: "educational_background", title: "Educational Background" },
  // { key: "online_profile_link", title: "website", link: true },
]

// const bodyDetails = [
//   { key: "focus_area", title: "Focus Area" },
//   { key: "core_skills", title: "Core Skills" },
//   { key: "projects", title: "Projects" },
// ]

const MemberDetails = ({
  selectedMember,
  unselectMemberHandler,
  selectedOptionsMap,
  MULTI_SELECT_CONFIG,
}) => {
  // const isMemberSelected = !!selectedMember;
  const classes = useStyles()
  if (!selectedMember) return null

  const getAttributes = (key, nameMap) => {
    const attributes = _.get(selectedMember, key, [])
    if (!attributes.length) {
      return (
        <Typography className={classes.detailValue} variant="body1">
          N/A
        </Typography>
      )
    }

    const processedAttributes = _.chain(attributes)
      .map((attr) => ({
        value: attr,
        label: _.get(nameMap, attr),
        selected: _.some(selectedOptionsMap[key], (o) => o.value === attr),
      }))
      .sort((a, b) => a.label.toLowerCase() > b.label.toLowerCase())
      .value()

    return (
      <>
        {processedAttributes.map(({ label, selected }, idx) => {
          const classNames = clsx(classes.detailValue, {
            [classes.selectedAttribute]: selected,
          })
          return (
            <Typography className={classNames} variant="body1">
              {label}
              {idx !== attributes.length - 1 ? ", " : ""}
            </Typography>
          )
        })}
      </>
    )
  }

  const picUrl = _.get(selectedMember, "profile_pic.0.url")
  const profileLink = _.get(selectedMember, "online_profile_link")
  const body = (
    <div className={classes.paper}>
      <div className={classes.introDetails}>
        <Typography className={classes.name} variant="h2">
          {selectedMember.name}
        </Typography>
        {/* {picUrl && <img className={classes.headshot} src={picUrl} />} */}
        {introDetails.map(({ key, title, link }) => (
          <>
            <Typography className={classes.detailTitle} variant="subtitle1">
              {title}
            </Typography>
            <Typography className={classes.detailValue} variant="body1">
              {_.get(selectedMember, key, "N/A")}
            </Typography>
          </>
        ))}
      </div>

      <div className={classes.bodyDetails}>
        {MULTI_SELECT_CONFIG.map(({ key, title, nameMap }) => (
          <div key={key}>
            <Typography className={classes.detailTitle} variant="subtitle1">
              {title}
            </Typography>
            {getAttributes(key, nameMap)}
          </div>
        ))}
      </div>

      {profileLink && (
        <Link
          className={classes.profileLink}
          href={profileLink}
          rel="noreferrer"
          target="_blank"
        >
          {profileLink}
        </Link>
      )}
    </div>
  )

  return (
    <Modal
      className={classes.modal}
      open={true}
      onClose={unselectMemberHandler}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      {body}
    </Modal>
  )
}

export default MemberDetails
