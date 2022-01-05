// import * as React from "react";
import "../../layout/container.css";
import "../../layout/section.css";
import { Link } from "react-router-dom";
import "../../layout/tournamentContainer.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { CSSProperties, useState } from "react";

import React from "react";

import ParticipantsCard from "../../components/NewTournamentCards/ParticipantsCard";

const Tournament = () => {
  const [showParticipantView, setParticipantView] = useState(true);
  const ToggleParticipantView = () => {
    setParticipantView(showParticipantView ? false : true);
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
    console.log(data);
  };

  return (
    <div className="container">
      {/* <NewTournamentCard />
      <ParticipantsCard />
      <SettingsCard /> */}
      <div className="tournamentContainer">
        <h1>Tournament</h1>
        <button onClick={() => ToggleParticipantView()}>Test</button>
        {/* <div style={formSection}>
          <p>Participants</p>
          <input {...register("partisipants", { required: true })} />
            {errors.partisipants && <span>This field is required</span>}
        </div> */}
        {showParticipantView ? (
          <ParticipantsCard />
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

            <input type="submit" />
          </form>
        )}

        <Link to="/current-tournament/round">Go to Current Tournament</Link>
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
