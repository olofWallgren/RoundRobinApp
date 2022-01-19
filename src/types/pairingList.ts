import { playerItem } from "../types/playerItem";
export type matchPlayer = {
  id: number;
  name: string;
  score: number;
  matchHistory: {
    win: number;
    loss: number;
    draw: number;
  };
};
//export type pairingMatch = Array<matchPlayer>;
export type pairingMatch = [
  {
    player1: playerItem;
    player2: playerItem;
    matchId: string;
    matchResult: string;
  },
  {
    player1: playerItem;
    player2: playerItem;
    matchId: string;
    matchResult: string;
  }
];
type Player = {
  name: string;
  id: number;
};
export type TournamentArray = {
  player1: Player;
  player2: Player;
  matchId: string;
  matchResult: string;
}[][];
export type pairingArray = Array<playerItem>;

export type testType = {
  player1: playerItem;
  player2: playerItem;
  matchId: string;
  matchResult: string;
};
export type testArray = Array<testType>;
