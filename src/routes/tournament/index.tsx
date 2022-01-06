import * as React from "react";
import "../../layout/container.css";
import "../../layout/section.css";
import "../../layout/tournamentContainer.css";
import "../tournament/tournament.css";
import { Link } from "react-router-dom";

import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import ParticipantsCard from "../../components/NewTournamentCards/ParticipantsCard";
import { TournamentStore } from "../../Contexts/tournamentContext";

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

  type Inputs = {
    tournamentName: string;
    hour: number;
    min: number;
    sec: number;
    games: string;
    win: string;
    loss: string;
    draw: string;
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const newTournament = {
      persistants: playerArray,
      tournamentName: data.tournamentName,
      roundLength: [{ hour: data.hour }, { min: data.min }, { sec: data.sec }],
      games: data.games,
      scoring: [{ win: data.win }, { loss: data.loss }, { draw: data.draw }],
    };
    settingStore.setTournament(newTournament);
    console.log("submitt");
  };
  console.log("constext", settingStore.tournament);
  return (
    <div className="container">
      <div className="tournamentContainer">
        <h2>New Tournament</h2>
        <p>{`Players ${playerArray.length}`}</p>
        {!showParticipantView && (
          <button
            style={{ padding: "0.5rem" }}
            onClick={() => toggleParticipantView()}
          >
            Add players
          </button>
        )}

        {showParticipantView ? (
          <ParticipantsCard
            getParticipants={getParticipants}
            playerArray={playerArray}
            toggleParticipantView={toggleParticipantView}
          />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="formSection">
              <p style={{ paddingRight: "1rem" }}>Tournament name</p>
              <input
                {...register("tournamentName", {
                  required: true,
                  maxLength: 20,
                })}
              />
              {errors.tournamentName && <span>Tournamentname is required</span>}
            </div>

            <div className="formSection">
              <p style={{ paddingRight: "1rem" }}>Length of round</p>
              <div className="inputSection">
                <p>Hour:</p>
                <input
                  className="inputElement"
                  type="number"
                  {...register("hour", { required: true, min: 0, max: 5 })}
                />
                {errors.hour && <span>This field is required</span>}
              </div>

              <div className="inputSection">
                <p>Min:</p>
                <input
                  type="number"
                  className="inputElement"
                  {...register("min", { required: true, min: 0, max: 60 })}
                />
                {errors.min && <span>This field is required</span>}
              </div>

              <div className="inputSection">
                <p>Sec</p>
                <input
                  type="number"
                  className="inputElement"
                  {...register("sec", { required: true, min: 0, max: 60 })}
                />
                {errors.sec && <span>This field is required</span>}
              </div>
            </div>

            <div className="selectionSection">
              <p>Games per match</p>

              <select className="selectionInput" {...register("games")}>
                <option value="best of three">best of 3</option>
                <option value="best of five">best of 5</option>
                <option value="best of seven">best of 7</option>
                <option value="single round">single round</option>
              </select>
            </div>

            <div className="formSection">
              <p style={{ paddingRight: "1rem" }}>Scoring</p>
              <div className="inputSection">
                <p>Win:</p>
                <select className="selectionInput" {...register("win")}>
                  <option value="3">3</option>
                  <option value="1">1</option>
                </select>
              </div>
              <div className="inputSection">
                <p>Loss:</p>
                <select className="selectionInput" {...register("loss")}>
                  <option value="0">0</option>
                  <option value="1">1</option>
                </select>
              </div>
              <div className="inputSection">
                <p>Draw:</p>
                <select className="selectionInput" {...register("draw")}>
                  <option value="1">1</option>
                  <option value="0">0</option>
                </select>
              </div>
            </div>
            <input style={{ padding: "0.5rem" }} type="submit" />
          </form>
        )}
        <Link to="/current-tournament/round">next</Link>
      </div>
    </div>
  );
};

export default Tournament;
