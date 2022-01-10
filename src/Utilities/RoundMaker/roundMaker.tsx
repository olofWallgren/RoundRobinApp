
type ListPlayers = ReadonlyArray<Player>;



type Player = {
  readonly id: number;
  readonly name: string;
};


interface TournamentInterface {
  readonly players: ListPlayers;

}

export default class Tournament implements TournamentInterface {
  readonly players: ListPlayers;

  

  constructor(players: ListPlayers) {
    if (players.length % 2) throw new Error("Teams length must be even");

    this.players = players;



  function makeRoundRobinPairings(players: ListPlayers) {


    const playerCount = players.length;
    const rounds = playerCount - 1;
    const half = playerCount / 2;
  
    const tournamentPairings = [];
  
    const playerIndexes: any = players.map((_, i) => i).slice(1);
  
    for (let round = 0; round < rounds; round++) {
      const roundPairings = [];
  
      const newPlayerIndexes = [0].concat(playerIndexes);
  
      const firstHalf = newPlayerIndexes.slice(0, half);
      const secondHalf = newPlayerIndexes.slice(half, playerCount).reverse();
  
      for (let i = 0; i < firstHalf.length; i++) {
        roundPairings.push({
          white: players[firstHalf[i]],
          black: players[secondHalf[i]],
        });
      }
  
      // rotating the array
      playerIndexes.push(playerIndexes.shift());
      tournamentPairings.push(roundPairings);
//    console.log(roundPairings);
//    console.log(roundPairings[0]);
    }
    // return tournamentPairings;
    return tournamentPairings;
}

makeRoundRobinPairings(players);




    }
}
