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
import { TournamentStore } from "../../Contexts/tournamentContext";
import { Grid } from "@mui/material";
import TournamentName from "../../components/TournamentName";

const Scoreboard = () => {
  const settingContext = TournamentStore();
  const players = settingContext.playerList;

  return (
    <div className="container">
      <NavigationBar />
      <Divider />
      <div className="gameContainer">
        <TournamentName />
        <div className="heading-Wrapper">
          <h1 className="scoreboard__header noMargin">Scoreboard</h1>
        </div>
        <Grid container direction="row" className="textContainer">
          <Grid item xs={6.5} md={6.7} xl={6.8}></Grid>
          <Grid item xs={2.5} md={2.3} xl={2.2}>
            <p className="ptsStyle">Points</p>
          </Grid>
          <Grid item xs={3} className="wld">
            <p>W-L-D</p>
          </Grid>
        </Grid>
        <div className="scoreContainer">
          {/* Placerar den med högst poäng överst, om två är lika för mest poäng hamnar 
       den med färre losses över, boten filtreras bort från scoreboardet */}
          {players
            .sort((x, y) => x.matchHistory.loss - y.matchHistory.loss)
            .sort((a, b) => b.matchHistory.win - a.matchHistory.win)
            .sort((a, b) => b.score - a.score)
            .filter((z) => z.name !== "**BYE**(Free win)")
            .map((e, index) => (
              <OutputbarScoreBoard
                key={`${e.name}-${index}`}
                player={e.name}
                totalScore={e.score}
                wins={e.matchHistory.win}
                losses={e.matchHistory.loss}
                draws={e.matchHistory.draw}
              />
            ))}
        </div>
        <div className="linkContainer">
          <Link to="/" className="link">
            End tournament
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Scoreboard;
