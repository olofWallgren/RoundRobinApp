import * as React from "react";
import "../../layout/container.css";
import "../../layout/gameContainer.css";
import "../../layout/primaryBtn.css";
import "../../layout/secondaryBtn.css";
import "../round/round.css";
import NavigationBar from "../../components/NavigationBar";
import { Divider } from "@mui/material";
import { Link } from "react-router-dom";
import { MakeRoundRobinPairings } from "../../Utilities/RoundMaker/roundMaker";
import { TournamentStore } from "../../Contexts/tournamentContext";
import { useState, useEffect } from "react";
import { playerItem } from "../../types/playerItem";
import OutputBarRound from "../../components/OutputBarRound";

const Round = () => {
  const settingContext = TournamentStore();

  console.log(settingContext.roundPairings);
  console.log(settingContext.playerList);
  console.log(settingContext.tournament);

  useEffect(() => {
    try {
      let pairingsLs = JSON.parse(localStorage.getItem("roundPairings") || "");
      settingContext.setRoundPairings(pairingsLs);
    } catch (error) {}
  }, []);

  console.log(settingContext.roundPairings);
  ////// Togglar disable på next round-knappen /////////
  const ableNextRound = () => {
    setDisable(!disable && true);
  };
  function handleNextRound() {
    ableNextRound();
    settingContext.incrementRound();
  }
  const [disable, setDisable] = React.useState(true); //Använd denna hook för att göra knappen klickbar efter att resultaten är ifyllda

  return (
    <>
      <div className="container">
        <NavigationBar />
        <Divider />
        <div className="gameContainer">
          <div className="headingWrapper">
            <h3 className="zeroMargin">{`Round-${
              settingContext.round + 1
            }`}</h3>
          </div>
          <div className="textWrapper">
            <p className="alignBottom secondaryColor">Pairings:</p>
            <div className="flexColumn">
              <p className="marginBottom">Result:</p>
              <p className="wldStyle">W - L - D</p>
            </div>
          </div>
          <div className="playerContainer">
            {/* <MakeRoundRobinPairings ableNextRound={ableNextRound} /> */}
            <OutputBarRound ableNextRound={ableNextRound} />
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
          <button
            onClick={handleNextRound}
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
