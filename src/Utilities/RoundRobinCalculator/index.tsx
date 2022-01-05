import React from 'react';
// import React, { useState, useEffect} from 'react';
//import axios from 'axios';
// import Todo from '../Todo';
import Tournament from "../RoundMaker/roundMaker"; 



const RoundRobinCalculator = () => {
  
  const players = [
    {id: 1, name: "Olof"},
    {id: 2, name: "Tony"},
    {id: 3, name: "Tim"},
    {id: 4, name: "Kenta"},
    {id: 5, name: "Emma"},
    {id: 6, name: "Doris"},
    {id: 6, name: "Anders"},
    {id: 6, name: "Per"},
  ];
  
  const tournament = new Tournament(players);
  const matches = tournament.matches;

  console.log(matches);
  return (
    <div>

    </div>
  );

};

export default RoundRobinCalculator;



















// TODO TESTINGS:

// function MakeRoundRobinPairings() {

//   const [todos, setTodos] = useState<any[]>([]);

//   useEffect(() => {
//     const fetchTodos = async () => {
//       let results = await axios.get(
//         'https://jsonplaceholder.typicode.com/todos'
//         );
//         setTodos(results.data)
//     };
//     fetchTodos();
//   }, [])

//   console.log(todos);
//   return (
//     <div>
//       <h4>
//         Mapping out pairings.
//       </h4>
//       {
//         todos.slice(0, 10).map(todo => (
//           <Todo key={todo.id} todo={todo}/>
//         ))
//       }
//     </div>
//   );


// }

// A GO AT DOING A ROUND ROBIN OURSELVES

// interface Props {
//     players: [],
// }


// function makeRoundRobinPairings({players}: Props) {
//     if (players.length % 2 === 1) {
//       players.push();
//     }
  
//     const playerCount = players.length;
//     const rounds = playerCount - 1;
//     const half = playerCount / 2;
  
//     const tournamentPairings = [];
  
//     const playerIndexes = players.map((_, i) => i).slice(1);
  
//     for (let round = 0; round < rounds; round++) {
//       const roundPairings = [];
  
//       let newPlayerIndexes = [0].concat(playerIndexes)!;
  
//       const firstHalf = newPlayerIndexes.slice(0, half);
//       const secondHalf = newPlayerIndexes.slice(half, playerCount).reverse();
  
//       for (let i = 0; i < firstHalf.length; i++) {
//         roundPairings.push({
//           white: players[firstHalf[i]],
//           black: players[secondHalf[i]],
//         });
//       }
  
//       // rotating the array
//       playerIndexes.push(playerIndexes.shift());
//       tournamentPairings.push(roundPairings);
//     }
  
//     return tournamentPairings;
//   }

// export default MakeRoundRobinPairings;