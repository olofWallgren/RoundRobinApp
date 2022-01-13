export type playerItem = {
  name: string;
  id: number;
  score: number;
  matchHistory: { win: number; loss: number; draw: number };
};
