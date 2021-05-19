import React from "react";
import { Backdrop, makeStyles, Modal, Typography } from "@material-ui/core";
import _ from "lodash";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    position: "absolute",
    // width: 400,
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
  name: {
    fontSize: "1.5rem",
    verticalAlign: "top",
    textAlign: "unset",
    display: "inline-block",
    borderBottom: "2px solid #0858c0",
    marginBottom: theme.spacing(2),
  },
  detailTitle: {
    fontSize: ".75rem",
    fontFamily: "monospace",
    textTransform: "uppercase",
    paddingTop: theme.spacing(1),
  },
  detailValue: {
    fontSize: ".75rem",
  },
  headshot: {
    maxWidth: "75px",
    marginLeft: theme.spacing(2),
    verticalAlign: "top",
  },
}));

const introDetails = [
  { key: "membership", title: "Membership" },
  { key: "consulting_status", title: "Consulting Status" },
  { key: "location_&_timezone", title: "Location & Timezone" },
  { key: "educational_background", title: "Educational Background" },
];

const MemberDetails = ({ selectedMember, unselectMemberHandler }) => {
  const isMemberSelected = !!selectedMember;

  const classes = useStyles();

  const picUrl = _.get(selectedMember, "profile_pic.0.url");
  const body = isMemberSelected && (
    <div className={classes.paper}>
      <div className={classes.introDetails}>
        <Typography className={classes.name} variant="h2">
          {selectedMember.name}
        </Typography>
        {introDetails.map((detail) => (
          <>
            <Typography className={classes.detailTitle} variant="subtitle1">
              {detail.title}
            </Typography>
            <Typography className={classes.detailValue} variant="body1">
              {_.get(selectedMember, detail.key, "N/A")}
            </Typography>
          </>
        ))}
      </div>
      {picUrl && <img className={classes.headshot} src={picUrl} />}
    </div>
  );

  return (
    <Modal
      className={classes.modal}
      open={isMemberSelected}
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
  );
};

export default MemberDetails;
