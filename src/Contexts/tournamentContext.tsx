import React, {
  useContext,
  useState,
  FunctionComponent,
  createContext,
} from "react";

type tournamentSettings = {
  tournamentName: string;
  participants: [{ id: string; name: string }];
  hour: string;
  min: string;
  sec: string;
  games: string;
  win: string;
  loss: string;
  draw: string;
};

type ContextTournamentSettings = {
  tournament: tournamentSettings[];
  setTournament: any;
};

const TournamentContext = createContext<ContextTournamentSettings>(undefined!);

export const TournamentProvider: FunctionComponent = ({ children }) => {
  const [tournament, setTournament] = useState<tournamentSettings[]>([]);

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
    <TournamentContext.Provider value={{ tournament, setTournament }}>
      {children}
    </TournamentContext.Provider>
  );
};
export const TournamentStore = () =>
  useContext<ContextTournamentSettings>(TournamentContext);
