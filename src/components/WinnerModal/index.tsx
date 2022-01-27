import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import DialogContent from "@mui/material/DialogContent";
import { TournamentStore } from "../../Contexts/tournamentContext";
import OutputbarScoreBoard from "../../components/OutputBarScoreBoard";
import "../../components/WinnerModal/winnermodal.css";

const style = {
  position: "absolute" as "absolute",
  color: "white",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  bgcolor: "rgba(125, 0, 127, .8)",
  border: "2px solid #000",
  boxShadow: 11,
  borderRadius: "15px",
  p: 4,
};
const TransitionsModal = () => {
  const [open, setOpen] = React.useState(true);
  const handleClose = () => setOpen(false);
  const settingContext = TournamentStore();
  const players = settingContext.playerList;
  let playersScore = players.map((a) => a.score);
  let highestScore = 0;
  playersScore.forEach((a) => {
    if (highestScore < a) {
      highestScore = a;
    }
  });
  let theTournamentName = settingContext.tournament.tournamentName;
  let winner = players.find((a) => a.score === highestScore)?.name;

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div className="presentation">
              <Typography variant="h6" component="h4">
                And the grand champion of {theTournamentName} is, drumroll...
              </Typography>
              <br></br>
            </div>
            <DialogContent dividers>
              <div className="winnerPresentation">
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                {winner} that won with {highestScore} points! Bravely fought.
                You may now wear the tallest wizards hat!
              </Typography>
              </div>
            </DialogContent>
            <br></br>

              <div className="score-container">
                <Typography className="scoreBoardTitle">Scoreboard:</Typography>
                {/* Placerar den med högst poäng överst, om två är lika för mest poäng hamnar 
       den med färre losses över, boten filtreras bort från scoreboardet */}
                {players
                  .sort((x, y) => x.matchHistory.loss - y.matchHistory.loss)
                  .sort((a, b) => b.matchHistory.win - a.matchHistory.win)
                  .sort((a, b) => b.score - a.score)
                  .filter((z) => z.name !== "**BYE**(Free win)")
                  .map((e, index) => (
                    <OutputbarScoreBoard
                      key={`${e.id}-${index}`}
                      player={e.name}
                      totalScore={e.score}
                      wins={e.matchHistory.win}
                      losses={e.matchHistory.loss}
                      draws={e.matchHistory.draw}
                    />
                  ))}
              </div>

          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default TransitionsModal;
