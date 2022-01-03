import React from "react";
import "../../layout/OutputBar.css";
// import "./OutputBarRound.css";
import { Grid, Button, Menu, MenuItem } from '@mui/material';
import { writeHeapSnapshot } from "v8";


interface Props {
  player?: React.ReactNode,
  totalScore?: React.ReactNode,
  wins?: React.ReactNode,
  losses?: React.ReactNode,
  draws?: React.ReactNode,
  children?: React.ReactNode

}

const OutputBarScoreBoard: React.FC<Props> = ({
  player,
  totalScore,
  wins,
  losses,
  draws,
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
        <p className="matchHistory">{wins}</p>
        <p className="matchHistory">{losses}</p>
        <p className="matchHistory">{draws}</p>
      </Grid>

</Grid>

  );
};

export default OutputBarScoreBoard;
