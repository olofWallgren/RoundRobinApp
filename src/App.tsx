import * as React from "react";
import Routes from "../src/routes";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import { TournamentProvider } from "../src/Contexts/tournamentContext";
import { app } from "./firebase-config";
const App = () => {
  ///// sätter en key och value i ls annars crashar appen när man ska hämta ls ifrån participantCard och ls är tomt //////
  function checkPlayerLs() {
    let key = localStorage.key(0);
    if (key === null) {
      localStorage.setItem("players", JSON.stringify([]));
    }
  }
  checkPlayerLs();

  return (
    <BrowserRouter>
      <TournamentProvider>
        <Header />
        <Routes />
      </TournamentProvider>
    </BrowserRouter>
  );
};

export default App;
