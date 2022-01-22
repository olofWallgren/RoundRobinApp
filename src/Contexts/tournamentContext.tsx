import React, {
  useContext,
  useState,
  FunctionComponent,
  createContext,
} from "react";
import { playerItem } from "../types/playerItem";
import { TournamentArray } from "../types/tournamentArray";

type tournamentSettings = {
  tournamentName: string;
  players: playerItem[];
  roundLength: { hour: number; min: number; sec: number };
  scoring: { win: number; loss: number; draw: number };
  games: string;
};
const test = {
  tournamentName: " ",
  players: [],
  roundLength: { hour: 0, min: 0, sec: 0 },
  scoring: { win: 0, loss: 0, draw: 0 },
  games: " ",
};

type ContextTournamentSettings = {
  tournament: tournamentSettings;
  setTournament: any;
  playerList: playerItem[];
  setPlayerList: any;
  pairings: TournamentArray;
  setPairings: any;
  round: number;
  setRound: any;
};

const TournamentContext = createContext<ContextTournamentSettings>(undefined!);

export const TournamentProvider: FunctionComponent = ({ children }) => {
  const [tournament, setTournament] = useState<tournamentSettings>(test);
  const [playerList, setPlayerList] = useState<playerItem[]>([]);
  const [pairings, setPairings] = useState<TournamentArray>([]);
  const [round, setRound] = useState(0);

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
        pairings,
        setPairings,
        round,
        setRound,
      }}
    >
      {children}
    </TournamentContext.Provider>
  );
};
export const TournamentStore = () =>
  useContext<ContextTournamentSettings>(TournamentContext);
