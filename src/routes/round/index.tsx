import * as React from "react";
import "../../layout/container.css";
import "../../layout/gameContainer.css";
import "../../layout/primaryBtn.css";
import "../../layout/secondaryBtn.css";
import "../round/round.css";
import NavigationBar from "../../components/NavigationBar";
import { Divider } from "@mui/material";
import { Link } from "react-router-dom";
import MakeRoundRobinPairings from "../../Utilities/RoundMaker/roundMaker";
import { TournamentStore } from "../../Contexts/tournamentContext";

const Round = () => {
  const settingContext = TournamentStore();

  //// testar att skapa en ny array från players-context //////
  console.log("loggar constext vid refresh", settingContext.playerList);
  const playerArray: any = [];
  console.log("players från round context", settingContext.playerList);
  const getNameAndId = () => {
    settingContext.tournament.players.forEach((e) => {
      playerArray.push({ name: e.name, id: e.id });
    });
  };
  getNameAndId();

  const [disable, setDisable] = React.useState(true); //Använd denna hook för att göra knappen klickbar efter att resultaten är ifyllda

  return (
    <>
      <div className="container">
        <NavigationBar />
        <Divider />
        <div className="gameContainer">
          <div className="headingWrapper">
            <h3 className="zeroMargin">Round 1</h3>
          </div>
          <div className="textWrapper">
            <p className="alignBottom secondaryColor">Pairings:</p>
            <div className="flexColumn">
              <p className="marginBottom">Result:</p>
              <p className="wldStyle">W - L - D</p>
            </div>
          </div>
          <div className="playerContainer">
            <MakeRoundRobinPairings players={playerArray} />
          </div>
          <div></div>

          <div className="flexBetween">
            <div>
              <p className="paraStyle">End Tournament</p>
            </div>
            <div>
              <p className="paraStyle">Pause Round</p>
            </div>
          </div>
        </div>
        <div className="btnContainer">
          <Link to="/create-tournament" className="secondaryBtn btnWidth">
            Back
          </Link>
          <button className="primaryBtn btnWidth" disabled={disable}>
            Next Round
          </button>
        </div>
      </div>
    </>
  );
};

export default Round;
