import React from "react";
import { Backdrop, makeStyles, Modal } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const MemberDetails = ({ selectedMember, unselectMemberHandler }) => {
  const isMemberSelected = !!selectedMember;

  const classes = useStyles();
  const body = isMemberSelected && (
    <div className={classes.paper}>{selectedMember.name}</div>
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
