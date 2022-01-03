// import * as React from "react";
import "../../layout/container.css";
import "../../layout/section.css";
import { Link } from "react-router-dom";
import React from "react";
import NewTournamentCard from "../../components/NewTournamentCards/TournamentNameCard";
import SettingsCard from "../../components/NewTournamentCards/SettingsCard";
import ParticipantsCard from "../../components/NewTournamentCards/ParticipantsCard";

const Tournament = () => {
  /// handle conditional rendering of Participant input ///////
  /// handle conditional rendering of Settings input ///////

  return (
    <div className="container">
      <NewTournamentCard />
      <ParticipantsCard />
      <SettingsCard />
      <h1>Tournament</h1>
      <Link to="/current-tournament/round">Go to Current Tournament</Link>
    </div>
  );
};

export default Tournament;
