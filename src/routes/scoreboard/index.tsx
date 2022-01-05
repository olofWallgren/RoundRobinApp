import * as React from "react";
import "../../layout/container.css";
import "../../layout/gameContainer.css";
import "../../layout/primaryBtn.css";
import "../../layout/secondaryBtn.css";
import "../scoreboard/scoreboard.css";
import NavigationBar from "../../components/NavigationBar";
import { Divider } from "@mui/material";
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
      <Grid container direction="row" className="textContainer">
        <Grid item xs={6.7}></Grid>
        <Grid item xs={2.3}><p className="ptsStyle">Points</p></Grid>
        <Grid item xs={3} className="wldStyle"><p>W-L-D</p></Grid>
      </Grid>
      <div className="scoreContainer">
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
      <div className="paraContainer">
        <p className="paraStyle">End Tournament</p>
      </div>
    </div>
    <div className="btnContainer">
      <Link to="/create-tournament" className="secondaryBtn btnWidth">
        Back
      </Link>
      <Link
        to="/current-tournament/round"
        className="primaryBtn btnWidth"
      >
        Next Round
      </Link>
    </div>
  </div>
); 

export default Scoreboard;
