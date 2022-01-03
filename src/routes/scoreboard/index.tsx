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
      matchHistory="1-0-0"
      />
      <OutputbarScoreBoard
      player="Tony McHallumi"
      totalScore="0"
      matchHistory="0-1-0"
      />

  </div>
);

export default Scoreboard;