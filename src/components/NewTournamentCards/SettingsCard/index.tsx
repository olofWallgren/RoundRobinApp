import react from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import { useState } from "react";

const SettingsCard = () => {
  const [showSettingsInput, setSettingsInput] = useState(false);
  const settingsInputHandler = () => {
    setSettingsInput(showSettingsInput ? false : true);
  };

  return (
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
  );
};
export default SettingsCard;
