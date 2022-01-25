import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TournamentStore } from "../../Contexts/tournamentContext";
// import PlayersCard from '../NewTournamentCards/PlayersCard';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 11,
  p: 4,
};


const TransitionsModal = () => {
  const [open, setOpen] = React.useState(true);
  const handleClose = () => setOpen(false);
  
  const settingContext = TournamentStore();
  const players = settingContext.playerList;

  let playersScore = players.map((a) => a.score)
  let highestScore = 0;
  
  playersScore.forEach((a) => {
    if (highestScore < a) {
      highestScore = a;
    }
  })

  let theTournamentName = settingContext.tournament.tournamentName;
  
  let winner = players.find(a => a.score === highestScore)?.name
  
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
            <Typography id="transition-modal-title" variant="h6" component="h2">
              And the grand champion of {theTournamentName} is, drumroll...
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              {winner} that won with {highestScore} points!
              Bravely fought. You may now wear the tallest wizards hat!
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default TransitionsModal;