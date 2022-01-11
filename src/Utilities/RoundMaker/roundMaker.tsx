import OutputBarRound from "../../components/OutputBarRound";

type ListPlayers = ReadonlyArray<Player>;

type Player = {
  readonly id: number;
  readonly name: string;
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
        roundPairings.push({
          player1: props.players[firstHalf[i]],
          player2: props.players[secondHalf[i]],
        });
      }
  
      // rotating the array
      playerIndexes.push(playerIndexes.shift());
      tournamentPairings.push(roundPairings);

      console.log(tournamentPairings);
    }
    // return tournamentPairings;
    return (

      <div>
        {tournamentPairings[0].map((e) =>
                <OutputBarRound
                  player1={e.player1.name}
                  player2={e.player2.name}
                />
        )}
  

      </div>
    )

    }

export default MakeRoundRobinPairings;