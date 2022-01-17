import OutputBarRound from "../../components/OutputBarRound";
import { TournamentStore } from "../../Contexts/tournamentContext";
import "../../layout/OutputBar.css";

type ListPlayers = ReadonlyArray<Player>;

type Player = {
  name: string;
  id: number;
};

interface TournamentInterface {
  readonly players: ListPlayers;
  round: number;
  ableNextRound: () => void;
}

function MakeRoundRobinPairings(props: TournamentInterface) {
  if (props.players.length % 2) throw new Error("Teams length must be even");
  const playerCount = props.players.length;
  const rounds = playerCount - 1;
  const half = playerCount / 2;

  const tournamentPairings: {
    player1: Player;
    player2: Player;
    matchId: string;
  }[][] = [];

  const playerIndexes: any = props.players.map((_, i) => i).slice(1);

  for (let round = 0; round < rounds; round++) {
    const roundPairings = [];

    const newPlayerIndexes = [0].concat(playerIndexes);

    const firstHalf = newPlayerIndexes.slice(0, half);
    const secondHalf = newPlayerIndexes.slice(half, playerCount).reverse();

    for (let i = 0; i < firstHalf.length; i++) {
      let roundNumber: any = tournamentPairings.length + 1;
      let idMatchFormater = "r" + roundNumber + "m" + (i + 1);

      roundPairings.push({
        player1: props.players[firstHalf[i]],
        player2: props.players[secondHalf[i]],
        matchId: idMatchFormater,
      });
    }

    // rotating the array
    playerIndexes.push(playerIndexes.shift());
    tournamentPairings.push(roundPairings);
  }

  return (
    <OutputBarRound
      tournamentPairings={tournamentPairings}
      round={props.round}
      ableNextRound={props.ableNextRound}
    />
  );
}

export default MakeRoundRobinPairings;
