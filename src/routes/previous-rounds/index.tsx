import * as React from "react";
import "../../layout/container.css";
import "../../layout/gameContainer.css";
import "../../layout/primaryBtn.css";
import "../previous-rounds/previousRounds.css";
import NavigationBar from "../../components/NavigationBar";
import { Divider } from "@mui/material";
import { Link } from "react-router-dom";
import OutputBarPrevRounds from "../../components/OutputBarPrevRounds";
import { TournamentArray } from "../../types/tournamentArray";
import { useEffect } from "react";
import TournamentName from "../../components/TournamentName";

const PreviousRounds = () => {
  const [pairingList, setPairingList] = React.useState<TournamentArray>([]);
  const [hasLoaded, setHasLoaded] = React.useState(false);

  const checkLoading = () => {
    if (pairingList.length <= 0) {
      setHasLoaded(false);
    } else {
      setHasLoaded(true);
    }
  };

  useEffect(() => {
    try {
      let lsPairings = JSON.parse(localStorage.getItem("pairings") || "");
      setPairingList(lsPairings);
    } catch (error) {}
  }, []);

  useEffect(() => {
    checkLoading();
  }, [pairingList]);

  return (
    <div className="container">
      <NavigationBar />
      <Divider />
      <div className="gameContainer">
        <div className="rounds__scrollBox">
          {hasLoaded &&
            pairingList.map((e, index) => {
              return (
                <div key={index}>
                  <TournamentName />
                  <div className="rounds__headingContainer">
                    <h1 className="rounds__heading rounds--noMargin">{`Round ${
                      index + 1
                    }`}</h1>
                  </div>
                  <div className="rounds__textContainer rounds--noMargin">
                    <p className="rounds__text">W-L-D</p>
                  </div>
                  {e.map((round: any, i) => {
                    return (
                      <OutputBarPrevRounds
                        key={`${round.player1.name}-${i}`}
                        players={`${round.player1.name} - ${round.player2.name} `}
                        roundResult={`${round.matchResult}`}
                      />
                    );
                  })}
                </div>
              );
            })}
        </div>
        <div className="rounds__linkContainer">
          <Link to="/" className="rounds__link">
            End Tournament
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PreviousRounds;
