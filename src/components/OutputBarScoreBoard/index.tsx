import React from "react";
import "../../layout/OutputBar.css";
// import "./OutputBarRound.css";
import { Grid, Button, Menu, MenuItem } from '@mui/material';


interface Props {
  player?: React.ReactNode,
  totalScore?: React.ReactNode,
  matchHistory?: React.ReactNode,
  children?: React.ReactNode

}

const OutputBarScoreBoard: React.FC<Props> = ({
  player,
  totalScore,
  matchHistory,
  children
  }) => {
 

  return (
    <Grid container className="outputBarContainer" spacing={1}>

      <Grid item xs={7}>
        <p className="names">{player}</p>
      </Grid>

      <Grid item xs={2}>
        <p className="totalScore">{totalScore}</p>
      </Grid>

      <Grid item xs={3}>
        <p className="matchHistory">{matchHistory}</p>
        <p className="matchHistory">{matchHistory}</p>
        <p className="matchHistory">{matchHistory}</p>
      </Grid>

</Grid>

  );
};

export default OutputBarScoreBoard;
