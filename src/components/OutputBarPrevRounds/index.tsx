import React from "react";
import "../../layout/OutputBar.css";
import "../../layout/OutputBar.css";
import { Grid } from "@mui/material";
interface Props {
  players?: React.ReactNode;
  roundResult?: React.ReactNode;
}
const OutputBarPrevRounds: React.FC<Props> = ({ players, roundResult }) => {
  return (
    <Grid
      className="outputBarContainer"
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Grid item>
        <p className="names">{players}</p>
      </Grid>
      <Grid item>
        <p className="totalScore">{roundResult}</p>
      </Grid>
    </Grid>
  );
};

export default OutputBarPrevRounds;
