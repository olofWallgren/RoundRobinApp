export type Player = {
  name: string;
  id: number;
};

export type TournamentArray = {
  player1: Player;
  player2: Player;
  matchId: string;
  matchResult: string;
  resultAdded: boolean;
}[][];
