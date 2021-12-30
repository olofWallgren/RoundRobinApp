import * as React from "react";
import "../../layout/container.css";
import NavigationBar from "../../components/NavigationBar";
import OutputBarRound from "../../components/OutputBarRound";

const Round = () => (
  <div className="container">
    <h1>Round</h1>
    <NavigationBar/>
    <OutputBarRound 
    player1="Erlef Doedsdufva"
    player2="Tony McHallumi"/>
  </div>
);

export default Round;