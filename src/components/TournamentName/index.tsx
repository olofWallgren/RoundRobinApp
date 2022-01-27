import React from "react";
import "../TournamentName/tournamentName.css";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { TournamentStore } from "../../Contexts/tournamentContext";

const TournamentName = () => {
  const settingContext = TournamentStore();
  return (
    <div className="tournament-name">
      <div className="tournament-name__icon__container ">
        <EmojiEventsIcon className="tournament-name__icon" />
      </div>
      <div>
        <span className="tournament-name__text">{settingContext.tournament.tournamentName}</span>
      </div>
    </div>
  );
};

export default TournamentName;
