import * as React from "react";
import "../../layout/container.css";
import "../../layout/gameContainer.css";
import "../../layout/primaryBtn.css";
import "../../layout/secondaryBtn.css";
import NavigationBar from "../../components/NavigationBar";
import { Divider } from "@mui/material";
import { CSSProperties } from "react";
import { Link } from "react-router-dom";
import OutputbarScoreBoard from "../../components/OutputBarScoreBoard";
import { Grid } from "@mui/material";

const Scoreboard = () => (
  <div className="container">
    <NavigationBar />
    <Divider />
    <div className="gameContainer">
      <div style={{ padding: "1.5rem 0" }}>
        <h3 style={{ margin: "0" }}>Scoreboard</h3>
      </div>
      <Grid container direction="row" style={textContainer}>
        <Grid xs={6.5}><p>Participants</p></Grid>
        <Grid item xs={3.5}  ><p>Points</p></Grid>
        <Grid item xs={2} style={{textAlign:"right"}}><p>W - L - D</p></Grid>
      </Grid>
      <div style={scoreContainer}>
        <OutputbarScoreBoard
          player="Erlef Doedsdufva"
          totalScore="3"
          wins="1"
          losses="0"
          draws="0"
        />
        <OutputbarScoreBoard
          player="Tony McHallumi"
          totalScore="0"
          wins="1"
          losses="0"
          draws="0"
        />
      </div>
      <div style={paraContainer}>
        <p style={paraStyle}>End Tournament</p>
      </div>
    </div>
    <div style={btnContainer}>
      <Link style={btnWidth} to="/create-tournament" className="secondaryBtn">
        Back
      </Link>
      <Link
        style={btnWidth}
        to="/current-tournament/round"
        className="primaryBtn"
      >
        Next Round
      </Link>
    </div>
  </div>
);

const textContainer: CSSProperties = {
  padding: "0 1rem",
  color: "#FA04F6",
  margin: "0",
};

const paraContainer: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "1rem",
  marginBottom: "0",
};
const paraStyle: CSSProperties = {
  color: "#FA04F6",
  cursor: "pointer",
};
const btnContainer: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "2rem",
  width: "100%",
};
const btnWidth: CSSProperties = {
  width: "48%",
};
const scoreContainer: CSSProperties = {
  overflowY: "auto",
  overflowX: "hidden",
  height: "350px",
};

export default Scoreboard;
