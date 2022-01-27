import * as React from "react";
import "../../layout/container.css";
import "../../layout/section.css";
import "../../layout/primaryBtn.css";
import "../../layout/tournamentContainer.css";
import "./tournament.css";
import Alert from "@mui/material/Alert";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import ParticipantsCard from "../../components/NewTournamentCards/PlayersCard";
import { TournamentStore } from "../../Contexts/tournamentContext";
import { Inputs } from "../../types/tournamentInput";
import SettingsModal from "../../components/SettingsModal";
import MakeRoundRobinPairings from "../../Utilities/RoundMaker/roundMaker";
import { playerItem } from "../../types/playerItem";

const Tournament = () => {
  const settingStore = TournamentStore();
  const [isBot, setIsBot] = useState(false);
  const [showParticipantView, setParticipantView] = useState(true);
  const [playerArray, setPlayerArray] = useState<playerItem[]>([]);

  const toggleParticipantView = () => {
    makePlayersEven();
    setParticipantView(showParticipantView ? false : true);
  };
  /// Om det är ojämnt antal spelare så skapas en spelare "**BYE**" som sedan
  /// Räknas som en gratisvinst.
  function saveToLocalStorage(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
  const makePlayersEven = () => {
    const byePlayer: any = {
      id: playerArray.length + 2,
      score: 0,
      name: "**BYE**(Free win)",
      matchHistory: { win: 0, loss: 0, draw: 0 },
    };
    if (playerArray.length % 2) {
      setPlayerArray((prevState) => {
        const newPlayerArray = [...prevState, byePlayer];
        saveToLocalStorage("players", newPlayerArray);
        return newPlayerArray;
      });
    } else {
      return;
    }
  };
  //// state med players som hämtas och uppdateras från Participants card
  const getParticipants = (data: any) => {
    setPlayerArray([...data]);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const newTournament = {
      players: playerArray,
      tournamentName: data.tournamentName,
      roundLength: { hour: data.hour, min: data.min, sec: data.sec },
      games: data.games,
      scoring: { win: data.win, loss: data.loss, draw: data.draw },
    };
    let pairings = MakeRoundRobinPairings(playerArray);
    localStorage.setItem("pairings", JSON.stringify(pairings));
    settingStore.setPairings(pairings);
    settingStore.setPlayerList(playerArray);
    settingStore.setTournament(newTournament);
  };
  function isUnEven() {
    setIsBot(true);
  }

  return (
    <>
      <div className="container">
        <div className="tournamentContainer">
          <div className="headingContainer">
            <h3 className="noMargin">New Tournament</h3>
          </div>
          <div className="flexBetween baseline noMargin">
            <p className="noMargin secondaryColor">
              {`Added players: ${playerArray.length} ${
                isBot ? "(one bot for even pairings)" : ""
              }`}
            </p>
            {!showParticipantView && (
              <button
                className="primaryBtn primaryBtn--small"
                onClick={() => toggleParticipantView()}
              >
                Add players
              </button>
            )}
          </div>
          {showParticipantView ? (
            <ParticipantsCard
              isUnEven={isUnEven}
              getParticipants={getParticipants}
              playerArray={playerArray}
              toggleParticipantView={toggleParticipantView}
            />
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="formSection">
                <p className="noMargin">Tournament name</p>
                <input
                  className="input"
                  type="text"
                  {...register("tournamentName", {
                    required: true,
                    maxLength: 20,
                  })}
                  placeholder="Enter tournament name"
                />
              </div>
              <div className="errorWrapper">
                {errors.tournamentName && (
                  <Alert
                    sx={{
                      zIndex: "modal",
                      position: "absolute",
                      width: "100%",
                      top: "-30px",
                      padding: "0 8px",
                    }}
                    severity="error"
                  >
                    Please enter a tournament name with less than 21 letters!
                  </Alert>
                )}
              </div>
              {/* Length of round section */}
              <div className="formSection">
                <div className="narrowWidth">
                  <p className="noMargin">Length of round</p>
                </div>
                {/* Hour input */}
                <div className="inputSection marginRight">
                  <p className="noMargin bottomPadding">Hour:</p>
                  <input
                    type="number"
                    className="input inputElement"
                    value="0"
                    {...register("hour", { required: true, min: 0, max: 5 })}
                  />
                </div>
                {/* Min inputs */}
                <div className="inputSection marginRight">
                  <p className="noMargin bottomPadding">Min:</p>
                  <input
                    type="number"
                    className="input inputElement"
                    value="50"
                    {...register("min", { required: true, min: 0, max: 60 })}
                  />
                </div>
                {/* Sec inputs */}
                <div className="inputSection">
                  <p className="noMargin bottomPadding">Sec</p>
                  <input
                    className="input inputElement"
                    type="number"
                    value="0"
                    {...register("sec", { required: true, min: 0, max: 60 })}
                  />
                </div>
              </div>
              {/* Error modal for hour, minutes and seconds */}
              <div className="errorWrapper">
                {errors.hour && errors.min && errors.sec && (
                  <Alert
                    sx={{
                      zIndex: "modal",
                      position: "absolute",
                      width: "100%",
                      top: "-20px",
                      padding: "0 8px",
                    }}
                    severity="error"
                  >
                    Please enter numbers for hour, minutes and seconds!
                  </Alert>
                )}
              </div>
              {/* Games per round section */}
              <div className="formSection">
                <p className="noMargin">Games per match</p>
                <select className="input gamesSelection" {...register("games")}>
                  <option value="best of three">Best of 3</option>
                </select>
              </div>
              {/* Scoring section */}
              <div className="formSection">
                <div className="narrowWidth">
                  <p className="noMargin">Scoring</p>
                </div>
                <div className="inputSection marginRight">
                  <p className="noMargin bottomPadding">Win:</p>
                  <select className="input scoringInput" {...register("win")}>
                    <option value="3">3</option>
                  </select>
                </div>
                <div className="inputSection marginRight">
                  <p className="noMargin bottomPadding">Loss:</p>
                  <select className="input scoringInput" {...register("loss")}>
                    <option value="0">0</option>
                  </select>
                </div>
                <div className="inputSection">
                  <p className="noMargin bottomPadding">Draw:</p>
                  <select className="input scoringInput" {...register("draw")}>
                    <option value="1">1</option>
                  </select>
                </div>
              </div>
              <div className="buttonContainer">
                {errors.tournamentName ? (
                  <button disabled className="primaryBtn fullWidth">
                    Submit
                  </button>
                ) : (
                  <SettingsModal />
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default Tournament;
