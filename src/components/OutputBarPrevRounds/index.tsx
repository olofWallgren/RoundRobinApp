import React from "react";
import "../../layout/OutputBar.css";
import "../../layout/OutputBar.css";
import { Grid } from "@mui/material";

interface Props {
  player?: React.ReactNode;
  roundResult?: React.ReactNode;
  children?: React.ReactNode;
}

const OutputBarPrevRounds: React.FC<Props> = ({
  player,
  roundResult,
  children,
}) => {
  return (
    <Grid 
      className="outputBarContainer"
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Grid item >
        <p className="names">{player}</p>
      </Grid>

      <Grid item >
        <p className="totalScore">{roundResult}</p>
      </Grid>
    </Grid>
  );
};

export default OutputBarPrevRounds;
