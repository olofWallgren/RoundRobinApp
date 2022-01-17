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
import Timer from "../../components/Timer";

const Round = () => {
  const settingContext = TournamentStore();

  //// testar att skapa en ny array från players-context //////

  const playerArray: any = [];

  const getNameAndId = () => {
    settingContext.tournament.players.forEach((e) => {
      playerArray.push({ name: e.name, id: e.id });
    });
  };
  getNameAndId();

  /////// State för Rounds //////////////////
  const [round, setRound] = React.useState(0);

  ////// Ökar statet med +1 ////////////////
  function incrementRound() {
    ableNextRound();
    const roundLength = playerArray.length;
    if (round >= roundLength) {
      setRound(0);
    } else {
      setRound(round + 1);
    }
    console.log("round", round);
  }
  ////// Togglar disable på next round-knappen /////////
  const ableNextRound = () => {
    setDisable(!disable && true);
  };

  const [disable, setDisable] = React.useState(true); //Använd denna hook för att göra knappen klickbar efter att resultaten är ifyllda

  return (
    <>
      <div className="container">
        <NavigationBar />
        <Divider />
        <div className="gameContainer">
          <div className="headingWrapper">
            <h3 className="zeroMargin">{`Round-${round + 1}`}</h3>
          </div>
          <div className="textWrapper">
            <p className="alignBottom secondaryColor">Pairings:</p>
            <div className="flexColumn">
              <p className="marginBottom">Result:</p>
              <p className="wldStyle">W - L - D</p>
            </div>
          </div>
          <div className="playerContainer">
            <MakeRoundRobinPairings
              players={playerArray}
              round={round}
              ableNextRound={ableNextRound}
            />
          </div>
          <div></div>

          <div className="flexBetween">
            <div className="alignBottom">
              <p className="paraStyle zeroMargin">End Tournament</p>
            </div>
            <div>
            <Timer hours={0} minutes={50} seconds={0}/>
            </div>
          </div>
        </div>
        <div className="btnContainer">
          <Link to="/create-tournament" className="secondaryBtn btnWidth">
            Back
          </Link>
          <button
            onClick={incrementRound}
            className="primaryBtn btnWidth"
            disabled={disable}
          >
            Next Round
          </button>
        </div>
      </div>
    </>
  );
};

export default Round;
