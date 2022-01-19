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
import { testArray } from "../../types/pairingList";
import { collection, getDocs } from "@firebase/firestore";
import { db } from "../../firebase-config";

const Round = () => {
  const settingContext = TournamentStore();
  const [pairingsDb, setpairingsDb] = useState<any>([]);
  //////// HÄMTAR PAIRINGS FRÅN DB /////////////////////
  const usersCollectionRef = collection(db, "roundPairings");

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setpairingsDb(data.docs.map((doc) => ({ ...doc.data() })));
    };
    getUsers();
  }, []);
  console.log("pairins från db", pairingsDb);

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
            {/* <OutputBarRound
              ableNextRound={ableNextRound}
              pairingsDb={pairingsDb}
            /> */}
            {pairingsDb.map((e: any, index: number) => {
              return (
                <p className="paraStyle">
                  {e.pairings[2].pairingMatch1.player1.name} vs{" "}
                  {e.pairings[2].pairingMatch1.player2.name}
                </p>
              );
            })}
          </div>

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
