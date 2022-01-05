// import * as React from "react";
import "../../layout/container.css";
import "../../layout/section.css";
import { Link } from "react-router-dom";
import "../../layout/tournamentContainer.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { CSSProperties, useState } from "react";
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
    hour: string;
    min: string;
    sec: string;
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
      hour: data.min,
      min: data.min,
      sec: data.sec,
      games: data.games,
      win: data.win,
      loss: data.loss,
      draw: data.draw,
    };
    settingStore.setTournament(newTournament);
  };
  console.log("constext", settingStore.tournament);
  return (
    <div className="container">
      <div className="tournamentContainer">
        <h2>New Tournament</h2>
        <p>{`Players ${playerArray.length}`}</p>
        {!showParticipantView && (
          <button onClick={() => toggleParticipantView()}>Add players</button>
        )}

        {showParticipantView ? (
          <ParticipantsCard
            getParticipants={getParticipants}
            playerArray={playerArray}
            toggleParticipantView={toggleParticipantView}
          />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div style={formSection}>
              <p>Tournament name</p>
              <input {...register("tournamentName", { required: true })} />
              {errors.tournamentName && <span>This field is required</span>}
            </div>

            <div style={formSection}>
              <p style={{ paddingRight: "1rem" }}>Length of round</p>
              <div style={inputSection}>
                <p>Hour:</p>
                <input
                  style={inputElement}
                  {...register("hour", { required: true })}
                />
                {errors.hour && <span>This field is required</span>}
              </div>

              <div style={inputSection}>
                <p>Min:</p>
                <input
                  style={inputElement}
                  {...register("min", { required: true })}
                />
                {errors.min && <span>This field is required</span>}
              </div>

              <div style={inputSection}>
                <p>Sec</p>
                <input
                  style={inputElement}
                  {...register("sec", { required: true })}
                />
                {errors.sec && <span>This field is required</span>}
              </div>
            </div>

            <div style={selectionSection}>
              <p>Games per match</p>

              <select {...register("games")}>
                <option value="best of three">best of 3</option>
                <option value="best of five">best of 5</option>
                <option value="best of seven">best of 7</option>
                <option value="single round">single round</option>
              </select>
            </div>

            <div style={formSection}>
              <p style={{ paddingRight: "1rem" }}>Scoring</p>
              <div style={inputSection}>
                <p>Win:</p>
                <input
                  style={inputElement}
                  {...register("win", { required: true })}
                />
                {errors.hour && <span>This field is required</span>}
              </div>
              <div style={inputSection}>
                <p>Loss:</p>
                <input
                  style={inputElement}
                  {...register("loss", { required: true })}
                />
                {errors.min && <span>This field is required</span>}
              </div>
              <div style={inputSection}>
                <p>Draw:</p>
                <input
                  style={inputElement}
                  {...register("draw", { required: true })}
                />
                {errors.sec && <span>This field is required</span>}
              </div>
            </div>
            <Link to="/current-tournament/round">
              <input type="submit" />
            </Link>
          </form>
        )}
      </div>
    </div>
  );
};
const formSection: CSSProperties = {
  backgroundColor: "rgba(56, 44, 89, 1)",
  display: "flex",
  marginBottom: "1rem",
};
const inputElement: CSSProperties = {
  width: "100%",
  padding: "0.5rem",
};
const inputSection: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  fontSize: "12px",
  color: "rgba(250, 4, 246, 1)",
};
const selectionSection: CSSProperties = {
  marginBottom: "1rem",
};

export default Tournament;
