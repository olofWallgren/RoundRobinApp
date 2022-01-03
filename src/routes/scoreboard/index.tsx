import * as React from "react";
import "../../layout/container.css";
import NavigationBar from "../../components/NavigationBar";
import OutputbarScoreBoard from "../../components/OutputBarScoreBoard";

const Scoreboard = () => (
  <div className="container">
    <h1>Scoreboard</h1>
    <NavigationBar/>
    <OutputbarScoreBoard
      player="Erlef Doedsdufva"
      totalScore="3"
      wins="1"
      losses="0"
      draws="0"
      />
      <OutputbarScoreBoard
      player="Tony McHallumi"
      totalScore="0"
      wins="1"
      losses="0"
      draws="0"
      />

  </div>
);

export default Scoreboard;