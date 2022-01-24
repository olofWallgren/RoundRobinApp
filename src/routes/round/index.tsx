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
import BasicModal from "../../components/WLDmodal";
import TransitionsModal from "../../components/WinnerModal";
import { useState } from "react";

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

  let nxtRoundButtonText = "Next Round";
  if ((round + 2) === playerArray.length) {
    nxtRoundButtonText = "Final Score!"
  }
  ////// Ökar statet med +1 ////////////////
  function incrementRound() {
    ableNextRound();
    const roundLength = playerArray.length;
    if (round >= roundLength) {
      setRound(0);
    } else {
      ///Kollar om det är sista rundan
      if ((round + 2) === playerArray.length) {
        showWinner()
      } else {
        setRound(round + 1);
      }
    }
  }
  
  const [showWinnerModal, setShowWinnerModal] = useState(false)
  // let showWinnerModal: boolean = false;
  
  function showWinner() {
    setShowWinnerModal(true);

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
            <div className="alignBottom marginBottom">
              <p className="zeroMargin secondaryColor">Pairings:</p>
            </div>
            <div className="questionMark">
              <BasicModal />
            </div>
            <div className="scoringContainer alignBottom marginBottom">
              <p className="zeroMargin">Result:</p>
              <p className="zeroMargin secondaryColor">W-L-D</p>
            </div>
          </div>
          <div className="playerContainer">
            <OutputBarRound
              tournamentPairings={settingContext.pairings}
              round={round}
              ableNextRound={ableNextRound}
            />
            <div>{showWinnerModal ? 
            <TransitionsModal />
             : ''}</div>

             </div>
          <div className="linkWrapper">
            <Link to="/" className="linkStyle">
              End Tournament
            </Link>
          </div>
          <div className="btnContainer">
            <button
              onClick={incrementRound}
              className="primaryBtn btnWidth"
              disabled={disable}
            >
              {nxtRoundButtonText}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Round;
