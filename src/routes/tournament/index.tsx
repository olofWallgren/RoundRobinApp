import * as React from "react";
import "../../layout/container.css";
import "../../layout/section.css";
import "../../layout/primaryBtn.css";
import "../../layout/tournamentContainer.css";
import "./tournament.css";
import { Link } from "react-router-dom";
import Alert from "@mui/material/Alert";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import ParticipantsCard from "../../components/NewTournamentCards/PlayersCard";
import { TournamentStore } from "../../Contexts/tournamentContext";
import { Inputs } from "../../types/tournamentInput";

const Tournament = () => {
  ///////// CONTEXT //////////////////////
  const settingStore = TournamentStore();

  ////////// togglar participants view/////////////////
  const [showParticipantView, setParticipantView] = useState(true);
  const toggleParticipantView = () => {
    setParticipantView(showParticipantView ? false : true);
  };

  ///////// state med participants som hämtas och uppdateras från Participants card ///////////
  const [playerArray, setPlayerArray] = useState<string[]>([]);
  const getParticipants = (data: any) => {
    setPlayerArray([...data]);
    console.log("getParticipants");
  };

  const {
    register,
    handleSubmit,
    watch,
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
    settingStore.setPlayerList(playerArray);
    settingStore.setTournament(newTournament);
  };

  return (
    <>
      <div className="container">
        <div className="tournamentContainer">
          <div className="headingContainer">
            <h3 className="noMargin">New Tournament</h3>
          </div>
          <div className="flexBetween baseline noMargin">
            <p className="noMargin secondaryColor">{`Added players: ${playerArray.length}`}</p>
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

              {/* Error modal for tournament name */}
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
                    Please enter tournament name!
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
                <input
                  className="primaryBtn fullWidth"
                  value="Start"
                  type="submit"
                />
              </div>
            </form>
          )}
        </div>
      </div>
      <Link className="primaryBtn" to="/current-tournament/round">
        Done
      </Link>
    </>
  );
};

export default Tournament;
