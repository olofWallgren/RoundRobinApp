import { TournamentArray } from "../../types/tournamentArray";
import { collection, addDoc, doc, setDoc } from "@firebase/firestore";
import { db } from "../../firebase-config";
import { playerItem } from "../../types/playerItem";
import { Player } from "../../types/tournamentArray";
export type TournamentEntity = {
  name: string;
  rounds: RoundEntity[];
};
type RoundEntity = {
  roundNo: number;
  pairings: PairingEntity[];
};
type PairingEntity = {
  matchNo: number;
  player1: Player;
  player2: Player;
  result: string;
};
export const savePairingsToDb = async (data: TournamentArray) => {
  const tournamentCollectionRef = collection(db, "roundPairings");

  const tournament: TournamentEntity = {
    name: "test",
    rounds: data.map((round: any, index: number) => {
      return {
        roundNo: index,
        pairings: round.map((game: any) => {
          return {
            matchNo: game.matchId,
            player1: game.player1,
            player2: game.player2,
            result: "",
          };
        }),
      };
    }),
  };
  console.log("data conerter", tournament);
  await setDoc(doc(tournamentCollectionRef, "112112"), {
    pairings: tournament,
  });
};
