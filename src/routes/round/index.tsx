import * as React from "react";
import "../../layout/container.css";
import "../../layout/gameContainer.css";
import "../../layout/primaryBtn.css";
import "../../layout/secondaryBtn.css";
import "../round/round.css";
import NavigationBar from "../../components/NavigationBar";
import { Divider } from "@mui/material";
import { Link } from "react-router-dom";
import { TournamentStore } from "../../Contexts/tournamentContext";
import Timer from "../../components/Timer";
import OutputBarRound from "../../components/OutputBarRound";

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
          <div className="headingWrapper flexBetween">
            <h3 className="zeroMargin">{`Round-${round + 1}`}</h3>
            <Timer hours={0} minutes={50} seconds={0} />
          </div>
          <div className="textWrapper">
            <p className="alignBottom secondaryColor">Pairings:</p>
            <div className="flexColumn">
              <p className="marginBottom">Result:</p>
              <p className="wldStyle">W - L - D</p>
            </div>
          </div>
          <div className="playerContainer">
            <OutputBarRound
              tournamentPairings={settingContext.pairings}
              round={round}
              ableNextRound={ableNextRound}
            />
          </div>
          <div className="flexBetween">
            <div className="alignBottom">
              <Link to="/" className="linkStyle" >End Tournament</Link>
            </div>
          </div>
        </div>
        <div className="btnContainer">
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
