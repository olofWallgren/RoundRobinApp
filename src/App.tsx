import * as React from "react";
import Routes from "../src/routes";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import { TournamentProvider } from "../src/Contexts/tournamentContext";

const App = () => {
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
