import * as React from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Modal from "@mui/material/Modal";
import "../../components/NameModal/nameModal.css";

export default function DescriptionAlerts(props: any) {
  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    props.resetNameChecker();
    setOpen(false);
  };
  return (
    <Modal
      className="alert"
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Alert className="alert" severity="warning">
        <AlertTitle>Warning</AlertTitle>
        Please pick a unique name for every player —{" "}
        <strong>Name already in use</strong>
      </Alert>
    </Modal>
  );
}
