import React, {
  useContext,
  useState,
  FunctionComponent,
  createContext,
} from "react";
import { playerItem } from "../types/playerItem";

type tournamentSettings = {
  tournamentName: string;
  players: playerItem[];
  roundLength: { hour: number; min: number; sec: number };
  scoring: { win: number; loss: number; draw: number };
  games: string;
};
type Player = {
  name: string;
  id: number;
};
const test = {
  tournamentName: " ",
  players: [],
  roundLength: { hour: 0, min: 0, sec: 0 },
  scoring: { win: 0, loss: 0, draw: 0 },
  games: " ",
};
const tournamentPairings: {
  player1: Player;
  player2: Player;
  matchId: string;
}[][] = [];

type ContextTournamentSettings = {
  tournament: tournamentSettings;
  setTournament: any;
  playerList: playerItem[];
  setPlayerList: any;
  round: number;
  incrementRound: any;
  roundPairings: {
    player1: Player;
    player2: Player;
    matchId: string;
  }[][];
  setRoundPairings: any;
};

const TournamentContext = createContext<ContextTournamentSettings>(undefined!);

export const TournamentProvider: FunctionComponent = ({ children }) => {
  const [tournament, setTournament] = useState<tournamentSettings>(test);
  const [playerList, setPlayerList] = useState<playerItem[]>([]);
  const [round, setRound] = useState(0);
  const [roundPairings, setRoundPairings] = useState(tournamentPairings);
  //////// Ökar round number //////////////
  function incrementRound() {
    // ableNextRound();
    const roundLength = tournament.players.length;
    if (round >= roundLength) {
      setRound(0);
    } else {
      setRound(round + 1);
    }
  }

  //   function addSettings(hour:string,min:string,sec:string,games:string,win:string,loss:string,draw:string){
  //     let newTournamentSettings = {
  //         hour:hour,
  //         min:min,
  //         sec:sec,
  //         games:games,
  //         win:win,
  //         loss:loss,
  //         draw:draw
  //     }
  //     setTournament([newTournamentSettings])
  //   }
  //   function resetSettings(){
  //       setTournament([])
  //   }

  return (
    <TournamentContext.Provider
      value={{
        tournament,
        setTournament,
        playerList,
        setPlayerList,
        incrementRound,
        round,
        roundPairings,
        setRoundPairings,
      }}
    >
      {children}
    </TournamentContext.Provider>
  );
};
export const TournamentStore = () =>
  useContext<ContextTournamentSettings>(TournamentContext);
