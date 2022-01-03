import React from "react";
import "../../layout/OutputBar.css";
import "./OutputBarRound.css";
import { Grid, Button, Menu, MenuItem } from '@mui/material';


interface Props {
  player1?: React.ReactNode,
  player2?: React.ReactNode,
  children?: React.ReactNode

}

const OutputBarScoreBoard: React.FC<Props> = ({
  player1,
  player2,
  children
  }) => {
 

  return (
    <Grid container className="outputBarContainer" spacing={1}>

      <Grid item xs={9}>
        <p className="names">{player1} - {player2}</p>
      </Grid>

      <Grid item xs={3}>


      </Grid>

     
    </Grid>
  );
};

export default OutputBarScoreBoard;
