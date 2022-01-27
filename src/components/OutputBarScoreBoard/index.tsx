import React from "react";
import "../../layout/OutputBar.css";
import { Grid } from "@mui/material";

interface Props {
  player?: React.ReactNode;
  totalScore?: React.ReactNode;
  wins?: React.ReactNode;
  losses?: React.ReactNode;
  draws?: React.ReactNode;
  children?: React.ReactNode;
}
const OutputBarScoreBoard: React.FC<Props> = ({
  player,
  totalScore,
  wins,
  losses,
  draws,
}) => {
  return (
    <Grid container className="outputBarContainer">
      <Grid item xs={7}>
        <p className="names">{player}</p>
      </Grid>

      <Grid item xs={4.5}>
        <p className="totalScore">{totalScore}</p>
      </Grid>
      <Grid className="matchHistoryContainer" item xs={0.5}>
        <p className="matchHistoryContainer">{wins}</p>
        <p className="matchHistoryContainer"> - </p>
        <p className="matchHistoryContainer">{losses}</p>
        <p className="matchHistoryContainer"> - </p>
        <p className="matchHistoryContainer">{draws}</p>
      </Grid>
    </Grid>
  );
};

export default OutputBarScoreBoard;
