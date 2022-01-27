import * as React from "react";
import Box from "@mui/material/Box";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "../../components/WLDmodal/WLDmodal.css";
import HelpIcon from "@mui/icons-material/Help";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <HelpIcon
        fontSize="small"
        sx={{ color: "#fa04f6", cursor: "pointer" }}
        onClick={handleOpen}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="box" sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            W - L - D Meaning
          </Typography>
          <DialogContent dividers>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              W - L - D = First Player wins - Second Player wins - Draws
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Example: Robin - Marion "2 - 0 - 0" means Robin won two of the
              games and Marion none. If Marion won 2 games and Robin won 1 game.
              the choice should be "1 - 2 - 0".
            </Typography>
          </DialogContent>
          <button
            style={{ width: "100%" }}
            className="primaryBtn"
            onClick={handleClose}
          >
            Got it!
          </button>
        </Box>
      </Modal>
    </div>
  );
}
