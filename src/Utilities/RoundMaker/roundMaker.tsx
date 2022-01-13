import { useState } from "react";
import OutputBarRound from "../../components/OutputBarRound";

type ListPlayers = ReadonlyArray<Player>;

type Player = {
  name: string;
  id: number;
};

interface TournamentInterface {
  readonly players: ListPlayers;
}

function MakeRoundRobinPairings(props: TournamentInterface) {
  if (props.players.length % 2) throw new Error("Teams length must be even");

  const playerCount = props.players.length;
  const rounds = playerCount - 1;
  const half = playerCount / 2;

  const tournamentPairings = [];

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

  let round: number = 0;

  return (
    <div>
      {tournamentPairings[round].map((e) => (
        <OutputBarRound
          player1={e.player1.name}
          player2={e.player2.name}
          pairingId={e.matchId}
        />
      ))}
    </div>
  );
}

export default MakeRoundRobinPairings;
