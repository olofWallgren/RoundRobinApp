import * as React from "react";
import "../../layout/container.css";
import "../../layout/gameContainer.css";
import "../../layout/primaryBtn.css";
import "../../layout/secondaryBtn.css";
import NavigationBar from "../../components/NavigationBar";
import { Divider } from "@mui/material";
import { CSSProperties } from "react";
import { Link } from "react-router-dom";

const PreviousRounds = () => (
  <div className="container">
    <NavigationBar />
    <Divider />
    <div className="gameContainer">
      <div style={{ paddingTop: "2rem" }}>
        <h2 style={{ margin: "0" }}>Round</h2>
      </div>
      <div style={paraContainer}>
        <p style={paraStyle}>End Tournament</p>
      </div>
    </div>
    <div style={btnContainer}>
      <Link style={btnWidth} to="/create-tournament" className="secondaryBtn">
        Back
      </Link>
      <Link style={btnWidth} to="/current-tournament/round" className="primaryBtn">
        Next Round
      </Link>
    </div>
  </div>
);

const paraContainer: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "1rem",
  marginBottom: "0",
};
const paraStyle: CSSProperties = {
  color: "#FA04F6",
  cursor: "pointer",
};
const btnContainer: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "2rem",
  width: "100%",
};
const btnWidth: CSSProperties = {
  width: "48%",
};

export default PreviousRounds;
