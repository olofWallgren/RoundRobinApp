import { TournamentArray } from "../../types/tournamentArray";
import { collection, addDoc, doc, setDoc } from "@firebase/firestore";
import { db } from "../../firebase-config";

export const savePairingsToDb = async (data: TournamentArray) => {
  const tournamentCollectionRef = collection(db, "roundPairings");
  const roundPairing = data.map((e) => {
    /// returna objekt till Db /////
  });
  console.log("data conerter", roundPairing);
  await setDoc(doc(tournamentCollectionRef, "112112"), {
    pairings: roundPairing,
  });
};
