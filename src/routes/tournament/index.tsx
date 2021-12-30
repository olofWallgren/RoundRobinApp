import * as React from "react";
import "../../layout/container.css";
import "../../layout/section.css";
import { Link } from "react-router-dom";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import SettingsIcon from "@mui/icons-material/Settings";
import { useState } from "react";

const Tournament = () => {
  const [isInput, setIsInput] = useState(false);
  const showInputHandler = () => {
    setIsInput(isInput ? false : true);
  };
  return (
    <div className="container">
      <div className="section">
        <div>
          <h3 style={{ marginTop: "0" }}>Tournament</h3>
          {!isInput ? (
            <div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
                earum, amet id hic quis voluptates repellendus doloremque
                ducimus.
              </p>
            </div>
          ) : (
            <input type="text" />
          )}
        </div>
        <div
          onClick={() => showInputHandler()}
          style={{ padding: "1rem", display: "flex", alignItems: "center" }}
        >
          <EmojiEventsIcon sx={{ fontSize: 40 }} style={{ color: "FA04F6" }} />
        </div>
      </div>

      <div className="section">
        <div>
          <h3 style={{ marginTop: "0" }}>Participants</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio earum,
            amet id hic quis voluptates repellendus doloremque ducimus.
          </p>
        </div>
        <div style={{ padding: "1rem", display: "flex", alignItems: "center" }}>
          <PersonAddIcon sx={{ fontSize: 40 }} style={{ color: "FA04F6" }} />
        </div>
      </div>

      <div className="section">
        <div>
          <h3 style={{ marginTop: "0" }}>Settings</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio earum,
            amet id hic quis voluptates repellendus doloremque ducimus.
          </p>
        </div>
        <div style={{ padding: "1rem", display: "flex", alignItems: "center" }}>
          <SettingsIcon sx={{ fontSize: 40 }} style={{ color: "FA04F6" }} />
        </div>
      </div>

      <h1>Tournament</h1>
      <Link to="/current-tournament/round">Go to Current Tournament</Link>
    </div>
  );
};

export default Tournament;
