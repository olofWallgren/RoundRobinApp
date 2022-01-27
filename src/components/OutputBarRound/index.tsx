import React, { useState, useEffect } from "react";
import "../../layout/OutputBar.css";
import "../../layout/primaryBtn.css";
import "./OutputBarRound.css";
import { Grid } from "@mui/material";
import { TournamentStore } from "../../Contexts/tournamentContext";
import { optionsDataList } from "./optionsDataList";
import { TournamentArray } from "../../types/tournamentArray";
import {
  useForm,
  SubmitHandler,
  useFieldArray,
  Control,
  useWatch,
} from "react-hook-form";
interface Props {
  children?: React.ReactNode;
  round: number;
  ableNextRound: () => void;
}
const OutputBarRound: React.FC<Props> = ({ round, ableNextRound }) => {
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
  const [disableBtn, setDisableBtn] = React.useState(true);
  const settingContext = TournamentStore();
  const [pairingList, setPairingList] = useState<TournamentArray>([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [optionState, setOptionState] = useState<any[]>([]);

  useEffect(() => {
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
    resetField,
    formState: { errors },
  } = useForm<formValues>();
  const { fields } = useFieldArray({
    name: "result",
    control,
  });
  function findPlayer(player: string, score: Score, scoreAdded: boolean) {
    const newPlayer: any = settingContext.playerList.find((p) => {
      return p.name === player;
    });
    if (scoreAdded) {
      newPlayer.score += 0;
      newPlayer.matchHistory.win += 0;
      newPlayer.matchHistory.loss += 0;
      newPlayer.matchHistory.draw += 0;
    } else {
      newPlayer.score += score.score;
      newPlayer.matchHistory.win += score.wins;
      newPlayer.matchHistory.loss += score.losses;
      newPlayer.matchHistory.draw += score.draw;
    }
  }
  const onSubmit: SubmitHandler<formValues> = (data) => {
    data.result.forEach((e, index) => {
      let scoreAdded: boolean = pairingList[round][index].resultAdded
        ? true
        : false;
      const player1 = settingContext.pairings[round][index].player1.name;
      const player2 = settingContext.pairings[round][index].player2.name;
      pairingList[round][index].matchResult = e.name;
      pairingList[round][index].resultAdded = true;
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
          findPlayer(player1, scoreP1c1, scoreAdded);
          findPlayer(player2, scoreP2c1, scoreAdded);
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
          findPlayer(player1, scoreP1c2, scoreAdded);
          findPlayer(player2, scoreP2c2, scoreAdded);
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
          findPlayer(player1, scoreP1c3, scoreAdded);
          findPlayer(player2, scoreP2c3, scoreAdded);
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
          findPlayer(player1, scoreP1c4, scoreAdded);
          findPlayer(player2, scoreP2c4, scoreAdded);
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
          findPlayer(player1, scoreP1c5, scoreAdded);
          findPlayer(player2, scoreP2c5, scoreAdded);
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
          findPlayer(player1, scoreP1c6, scoreAdded);
          findPlayer(player2, scoreP2c6, scoreAdded);
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
          findPlayer(player1, scoreP1c7, scoreAdded);
          findPlayer(player2, scoreP2c7, scoreAdded);
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
          findPlayer(player1, scoreP1c8, scoreAdded);
          findPlayer(player2, scoreP2c8, scoreAdded);
          break;
        case "still playing":
          break;
        default:
          break;
      }
      resetField(`result.${index}.name`);
    });
    localStorage.setItem("players", JSON.stringify(settingContext.playerList));
    localStorage.setItem("pairings", JSON.stringify(pairingList));
    ableNextRound();
    setOptionState([]);
    setDisableBtn(true);
  };
  const handleUserInput = (id: string) => (e: { target: { value: any } }) => {
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
  };
  return (
    <div className="">
      <form onSubmit={handleSubmit(onSubmit)}>
        {hasLoaded &&
          settingContext.pairings[round].map((e: any, index: number) => (
            <Grid
              key={e.player1.name}
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
