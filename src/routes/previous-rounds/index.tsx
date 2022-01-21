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
      <div style={homeLinkContainer}>
        <Link to="/" style={linkStyle}>End Tournament</Link>
      </div>
    </div>
  </div>
);

const homeLinkContainer: CSSProperties = {
  marginTop: "1rem",
  marginBottom: "0",
};
const linkStyle: CSSProperties = {
  color: "#FA04F6",
  cursor: "pointer",
  textDecoration: "none",
};

export default PreviousRounds;
