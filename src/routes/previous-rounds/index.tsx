import * as React from "react";
import "../../layout/container.css";
import "../../layout/gameContainer.css";
import "../../layout/primaryBtn.css";
import "../previous-rounds/previousRounds.css";
import NavigationBar from "../../components/NavigationBar";
import { Divider } from "@mui/material";
import { Link } from "react-router-dom";
import OutputBarPrevRounds from "../../components/OutputBarPrevRounds";

const PreviousRounds = () => (
  <div className="container">
    <NavigationBar />
    <Divider />
    <div className="gameContainer">
      <div className="rounds__scrollBox">
        <div className="rounds__headingContainer">
          <h1 className="rounds__heading rounds--noMargin">Round</h1>
        </div>
        <div className="rounds__textContainer">
          <p className="rounds__text">W-L-D</p>
        </div>

        <OutputBarPrevRounds
          player={"tony martinsson"}
          roundResult={"2 - 0 - 0"}
        />
        <OutputBarPrevRounds
          player={"tony martinsson"}
          roundResult={"2 - 0 - 0"}
        />
        <OutputBarPrevRounds
          player={"tony martinsson"}
          roundResult={"2 - 0 - 0"}
        />
        <OutputBarPrevRounds
          player={"tony martinsson"}
          roundResult={"2 - 0 - 0"}
        />
        <OutputBarPrevRounds
          player={"tony martinsson"}
          roundResult={"2 - 0 - 0"}
        />
        <OutputBarPrevRounds
          player={"tony martinsson"}
          roundResult={"2 - 0 - 0"}
        />
        <OutputBarPrevRounds
          player={"tony martinsson"}
          roundResult={"2 - 0 - 0"}
        />
        <OutputBarPrevRounds
          player={"tony martinsson"}
          roundResult={"2 - 0 - 0"}
        />
        <OutputBarPrevRounds
          player={"tony martinsson"}
          roundResult={"2 - 0 - 0"}
        />
        <OutputBarPrevRounds
          player={"tony martinsson"}
          roundResult={"2 - 0 - 0"}
        />
      </div>

      <div className="rounds__linkContainer">
        <Link to="/" className="rounds__link">
          End Tournament
        </Link>
      </div>
    </div>
  </div>
);

export default PreviousRounds;
