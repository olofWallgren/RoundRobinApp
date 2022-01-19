import "../../layout/OutputBar.css";
import { playerItem } from "../../types/playerItem";

// type ListPlayers = ReadonlyArray<playerItem>;

type Player = {
  name: string;
  id: number;
};

// interface TournamentInterface {
//   readonly players:ListPlayers
// }

export function MakeRoundRobinPairings(props: playerItem[]) {
  let players = props;

  if (players.length % 2) throw new Error("Teams length must be even");
  const playerCount = players.length;
  const rounds = playerCount - 1;
  const half = playerCount / 2;

  const tournamentPairings: {
    player1: Player;
    player2: Player;
    matchId: string;
    matchResult: string;
  }[][] = [];

  const playerIndexes: any = players.map((_, i) => i).slice(1);

  for (let round = 0; round < rounds; round++) {
    const roundPairings = [];

    const newPlayerIndexes = [0].concat(playerIndexes);

    const firstHalf = newPlayerIndexes.slice(0, half);
    const secondHalf = newPlayerIndexes.slice(half, playerCount).reverse();

    for (let i = 0; i < firstHalf.length; i++) {
      let roundNumber: any = tournamentPairings.length + 1;
      let idMatchFormater = "r" + roundNumber + "m" + (i + 1);

      roundPairings.push({
        player1: players[firstHalf[i]],
        player2: players[secondHalf[i]],
        matchId: idMatchFormater,
        matchResult: "",
      });
    }

    // rotating the array
    playerIndexes.push(playerIndexes.shift());
    tournamentPairings.push(roundPairings);
  }

  return tournamentPairings;
}
