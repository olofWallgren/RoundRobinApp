import { collection, addDoc, doc, setDoc, getDocs } from "@firebase/firestore";
import { db } from "../../firebase-config";
import { TournamentEntity } from "../../Utilities/SaveToDB/savePairingToDB";

export const getUsers = async (round: number) => {
  const tournamentCollectionRef = collection(db, "roundPairings");

  const data = await getDocs(tournamentCollectionRef);

  let pairingsDb = data.docs.map((doc) => ({ ...doc.data() }));
  //////// test funktion ////////////
  console.log("from Db", pairingsDb[0].pairings.rounds[round].pairings);
  return pairingsDb[0].pairings.rounds[round].pairings;
  // filterPairingsDb(pairingsDb[0].pairings, round);

  //   let newPairingArray: any = [];
  //   pairingsDb[0].pairings.forEach((e: any) => {
  //     let newArray = [];
  //     newArray.push(e.pairingMatch1, e.pairingMatch2);
  //     newPairingArray.push(newArray);
  //   });

  // setpairingsDb(newPairingArray[0]);
  // console.log("new pairing array", newPairingArray);
  //setpairingsDb(pairingsDb[0].pairings);
};
export const filterPairingsDb = async (data: any, round: number) => {
  let newData = data.rounds[round].pairings;
  return newData;
};
