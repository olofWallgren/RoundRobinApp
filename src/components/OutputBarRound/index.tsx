import React, { useState, useEffect } from "react";
import "../../layout/OutputBar.css";
import "../../layout/primaryBtn.css";
import "./OutputBarRound.css";
import { Grid } from "@mui/material";
import { TournamentStore } from "../../Contexts/tournamentContext";
import { playerItem } from "../../types/playerItem";
import { optionsDataList } from "./optionsDataList";
import { getUsers } from "../../Utilities/SaveToDB/getPairingDb";
import { collection, addDoc, doc, setDoc, getDocs } from "@firebase/firestore";
import { TournamentArray } from "../../types/tournamentArray";
import { db } from "../../firebase-config";
import {
  useForm,
  SubmitHandler,
  useFieldArray,
  Control,
  useWatch,
} from "react-hook-form";

interface Props {
  children?: React.ReactNode;
  //tournamentPairings: any;
  round: number;
  ableNextRound: () => void;
}

const OutputBarRound: React.FC<Props> = ({
  // pairingId,
  children,
  // tournamentPairings,
  round,
  ableNextRound,
}) => {
  type Score = {
    score: number;
    wins: number;
    losses: number;
    draw: number;
  };
  type formValues = {
    result: {
      name: string;
    }[];
  };
  type Player = {
    name: string;
    id: number;
  };
  type PairingEntity = {
    matchNo: number;
    player1: Player;
    player2: Player;
    result: string;
  };
  // Hook för att disabled button
  const [disableBtn, setDisableBtn] = React.useState(true);
  const settingContext = TournamentStore();
  const [pairingList, setPairingList] = useState<TournamentArray>([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [optionState, setOptionState] = useState<any[]>([]);
  const [testRound, setTestRound] = useState(0);

  //// Hämtar Pairings från Db //////
  useEffect(() => {
    /////////// HÄMTAR PAIRINGS FRÅN DB ///////////////////
    // const getUsers = async () => {
    //   const tournamentCollectionRef = collection(db, "roundPairings");
    //   const data = await getDocs(tournamentCollectionRef);
    //   let pairingsDb = data.docs.map((doc) => ({ ...doc.data() }));

    //   //////// Gör om datan till samm struktur som context pairings ////////////
    //   let filteredData: any = [];
    //   console.log("from Db", pairingsDb[0].pairings.rounds);
    //   let test = pairingsDb[0].pairings.rounds;
    //   test.forEach((e: any) => {
    //     filteredData.push(e.pairings);
    //   });

    //   setPairingList(filteredData);
    // };

    try {
      let lsPairings = JSON.parse(localStorage.getItem("pairings") || "");

      setPairingList(lsPairings);
    } catch (error) {}
  }, []);

  //// Kollar så att PairingList statet är uppdaterat /////////
  useEffect(() => {
    checkLoading();
  }, [pairingList]);

  ////// Kollar så att inget input är still playin ////////
  useEffect(() => {
    checkStillPlayin();
  }, [optionState]);

  //////// Kollar så att pairingList har hunnit uppdateras ////////
  const checkLoading = () => {
    if (pairingList.length <= 0) {
      setHasLoaded(false);
    } else {
      console.log("more than o");
      setHasLoaded(true);
    }
  };
  ///////// Kollar alla inputs efter still-playin och disablar submitt-knappen ////////
  function checkStillPlayin() {
    optionState.forEach((e) => {
      if (e.targetValue === "Still playing" || optionState.length === 1) {
        setDisableBtn(true);
      } else {
        setDisableBtn(false);
      }
    });
  }

  const Total = ({ control }: { control: Control<formValues> }) => {
    const formvalues = useWatch({
      name: "result",
      control,
    });
  };
  const {
    register,
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<formValues>();
  const { fields } = useFieldArray({
    name: "result",
    control,
  });

  function findPlayer(player: string, score: Score) {
    const newPlayer: any = settingContext.playerList.find((p) => {
      return p.name === player;
    });
    newPlayer.score += score.score;
    newPlayer.matchHistory.win += score.wins;
    newPlayer.matchHistory.loss += score.losses;
    newPlayer.matchHistory.draw += score.draw;
  }

  const onSubmit: SubmitHandler<formValues> = (data) => {
    data.result.forEach((e, index) => {
      const player1 = settingContext.pairings[round][index].player1.name;
      const player2 = settingContext.pairings[round][index].player2.name;

      ////////// Utkommenterad pga den kollar i context-pairingList /////////////
      // const player1 = pairingList[round][index].player1.name;
      // const player2 = pairingList[round][index].player2.name;

      switch (e.name) {
        case "2 - 0 - 0":
          let scoreP1c1 = {
            score: 3,
            wins: 2,
            losses: 0,
            draw: 0,
          };
          let scoreP2c1 = {
            score: 0,
            wins: 0,
            losses: 2,
            draw: 0,
          };
          findPlayer(player1, scoreP1c1);
          findPlayer(player2, scoreP2c1);
          break;
        case "2 - 1 - 0":
          let scoreP1c2 = {
            score: 3,
            wins: 2,
            losses: 1,
            draw: 0,
          };
          let scoreP2c2 = {
            score: 0,
            wins: 1,
            losses: 2,
            draw: 0,
          };
          findPlayer(player1, scoreP1c2);
          findPlayer(player2, scoreP2c2);
          break;
        case "1 - 0 - 1":
          let scoreP1c3 = {
            score: 3,
            wins: 1,
            losses: 0,
            draw: 1,
          };
          let scoreP2c3 = {
            score: 0,
            wins: 0,
            losses: 1,
            draw: 1,
          };
          findPlayer(player1, scoreP1c3);
          findPlayer(player2, scoreP2c3);
          break;
        case "1 - 1 - 1":
          let scoreP1c4 = {
            score: 1,
            wins: 1,
            losses: 1,
            draw: 1,
          };
          let scoreP2c4 = {
            score: 1,
            wins: 1,
            losses: 1,
            draw: 1,
          };
          findPlayer(player1, scoreP1c4);
          findPlayer(player2, scoreP2c4);
          break;
        case "0 - 0 - 1":
          let scoreP1c5 = {
            score: 1,
            wins: 0,
            losses: 0,
            draw: 1,
          };
          let scoreP2c5 = {
            score: 1,
            wins: 0,
            losses: 0,
            draw: 1,
          };
          findPlayer(player1, scoreP1c5);
          findPlayer(player2, scoreP2c5);
          break;
        case "0 - 2 - 0":
          let scoreP1c6 = {
            score: 0,
            wins: 0,
            losses: 2,
            draw: 0,
          };
          let scoreP2c6 = {
            score: 3,
            wins: 2,
            losses: 0,
            draw: 0,
          };
          findPlayer(player1, scoreP1c6);
          findPlayer(player2, scoreP2c6);
          break;
        case "1 - 2 - 0":
          let scoreP1c7 = {
            score: 0,
            wins: 1,
            losses: 2,
            draw: 0,
          };
          let scoreP2c7 = {
            score: 3,
            wins: 2,
            losses: 1,
            draw: 0,
          };
          findPlayer(player1, scoreP1c7);
          findPlayer(player2, scoreP2c7);
          break;
        case "0 - 1 - 1":
          let scoreP1c8 = {
            score: 0,
            wins: 0,
            losses: 1,
            draw: 1,
          };
          let scoreP2c8 = {
            score: 3,
            wins: 1,
            losses: 0,
            draw: 1,
          };
          findPlayer(player1, scoreP1c8);
          findPlayer(player2, scoreP2c8);
          break;
        case "still playing":
          console.log("Please fill in your score");
          break;
        default:
          console.log("THE END");
      }
      //resetField(`result.${index}.name`);
    });

    localStorage.setItem("players", JSON.stringify(settingContext.playerList));
    ableNextRound();
    setOptionState([]);
    setDisableBtn(true);
  };
  // optionsDataList[0].value sätter statet till "Still playing"

  const handleUserInput = (id: string) => (e: { target: { value: any } }) => {
    // Kollar användarens ändringar av options och sätter state utifrån det
    //const Newid:string = id
    const selectedResult = {
      targetValue: e.target.value,
      newId: id,
    };

    setOptionState((prevState) => {
      let updatedState: any = [
        ...prevState.filter((e) => e.newId !== id),
        selectedResult,
      ];
      return updatedState;
    });

    // Här vill vi loopa över listan med options
    // för att kolla att alla options inte är still playing och sedan sätta submit-knappen till true
    // fungerar dock inte nu

    // optionsDataList.forEach((option) => {
    //   for (const option of optionsDataList) {
    //     if (
    //       // selectedResult !== "Still playing" &&
    //       option.value !== "Still playing"
    //     ) {
    //       setDisableBtn(true);
    //       console.log("sätt disabletill sant");
    //     }
    //   }
    // });
  };
  console.log(optionState);

  return (
    <div className="">
      <form onSubmit={handleSubmit(onSubmit)}>
        {hasLoaded &&
          settingContext.pairings[round].map((e: any, index: number) => (
            <Grid
              container
              className="outputBarContainer"
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item>
                <p className="names">
                  {e.player1.name} - {e.player2.name}
                </p>
              </Grid>
              <Grid item>
                <select
                  key={`${e.player1.name}-${index}`}
                  className="select"
                  {...register(`result.${index}.name` as const)}
                  onChange={handleUserInput(e.player1.name)}
                >
                  {optionsDataList.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </Grid>
            </Grid>
          ))}
        <div>
          <input
            type="submit"
            value="Submit result"
            className="primaryBtn primaryBtn--small inputButton"
            disabled={disableBtn}
          />
        </div>
      </form>
    </div>
  );
};

export default OutputBarRound;
