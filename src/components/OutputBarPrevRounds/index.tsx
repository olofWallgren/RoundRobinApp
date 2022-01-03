import React from "react";
import "../../layout/OutputBar.css";
import "./OutputBarRound.css";
import { Grid, Button, Menu, MenuItem } from '@mui/material';


interface Props {
  player?: React.ReactNode,
  roundResult?: React.ReactNode,
  children?: React.ReactNode

}

const OutputBarPrevRounds: React.FC<Props> = ({
  player,
  roundResult,
  children
  }) => {
 

  return (
    <Grid container className="outputBarContainer" spacing={1}>

      <Grid item xs={9}>
        <p className="names">{player}</p>
      </Grid>

      <Grid item xs={3}>
        <p className="totalScore">{roundResult}</p>
      </Grid>
     
    </Grid>
  );
};

export default OutputBarPrevRounds;
