import React, { useState } from "react";
import "../../layout/OutputBar.css";
import "../../layout/primaryBtn.css";
import "./OutputBarRound.css";
import { Grid } from "@mui/material";
import { TournamentStore } from "../../Contexts/tournamentContext";
import { playerItem } from "../../types/playerItem";
import { optionsDataList } from "./optionsDataList";
import {
  useForm,
  SubmitHandler,
  useFieldArray,
  Control,
  useWatch,
} from "react-hook-form";

interface Props {
  children?: React.ReactNode;
  tournamentPairings: any;
  round: number;
  ableNextRound: () => void;
}

const OutputBarRound: React.FC<Props> = ({
  // pairingId,
  children,
  tournamentPairings,
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
  // Hook för att disabled button
  const [disableBtn, setDisableBtn] = React.useState(true);
  const settingContext = TournamentStore();
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

  function findPlayer(player: string, score: Score) {
    const newPlayer: any = settingContext.playerList.find((p) => {
      return p.name === player;
    });
    // Lägger till poäng, uppdaterar context med nya poäng
    // Inte säkra på varför context uppdateras dock
    newPlayer.score += score.score;
    newPlayer.matchHistory.win += score.wins;
    newPlayer.matchHistory.loss += score.losses;
    newPlayer.matchHistory.draw += score.draw;
  }

  const onSubmit: SubmitHandler<formValues> = (data) => {
    data.result.forEach((e, index) => {
      const player1 = tournamentPairings[round][index].player1.name;
      const player2 = tournamentPairings[round][index].player2.name;
      console.log(round);

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
        default:
          console.log("THE END");
      }
      resetField(`result.${index}.name`);
    });
    ableNextRound();
  };
  // optionsDataList[0].value sätter statet till "Still playing"
  const [optionState, setOptionState] = useState(optionsDataList[0].value);

  const handleUserInput = (e: { target: { value: any } }) => {
    // Kollar användarens ändringar av options och sätter state utifrån det
    const selectedResult = e.target.value;
    setOptionState(selectedResult);

    // Här vill vi loopa över listan med options 
    // för att kolla att alla options inte är still playing och sedan sätta submit-knappen till true
    // fungerar dock inte nu
    optionsDataList.forEach((option) => {
      for (const option of optionsDataList) {
        if (
          selectedResult !== "Still playing" &&
          option.value !== "Still Playing"
        ) {
          setDisableBtn(true);
        }
      }
    });
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit(onSubmit)}>
        {tournamentPairings[round].map((e: any, index: number) => (
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
                onChange={handleUserInput}
              >
                {optionsDataList.map((option) => (
                  <option value={option.value}>{option.label}</option>
                ))}
              </select>
            </Grid>
          </Grid>
        ))}
        <div>
          <input
            type="submit"
            value="Submit result"
            className="primaryBtn primaryBtn--small"
            disabled={disableBtn}
          />
        </div>
      </form>
    </div>
  );
};

export default OutputBarRound;
