import React from "react";
import "../../layout/OutputBar.css";
import "./OutputBarRound.css";
import { Grid } from "@mui/material";
import { TournamentStore } from "../../Contexts/tournamentContext";
import { playerItem } from "../../types/playerItem";
import {
  useForm,
  SubmitHandler,
  useFieldArray,
  Control,
  useWatch,
} from "react-hook-form";
import { getLocalStorage } from "../../Utilities/LocalStorage/saveToLocalStorage";

interface Props {
  children?: React.ReactNode;
  tournamentPairings: any;

  ableNextRound: () => void;
}

const OutputBarRound: React.FC<Props> = ({
  // pairingId,
  children,
  tournamentPairings,

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
  const settingContext = TournamentStore();

  // function checkForLs() {
  //   if (tournamentPairings.length === 0) {
  //     console.log("tornamentpairings less than 0");
  //     try {
  //       let result = JSON.parse(localStorage.getItem("roundPairings") || "");
  //       tournamentPairings = result;

  //       console.log("ls result", result);
  //     } catch (error) {}
  //   }
  //   console.log("checkLsFunc", tournamentPairings);
  // }

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
    console.log(data);
    data.result.forEach((e, index) => {
      const player1 =
        tournamentPairings[settingContext.round][index].player1.name;
      const player2 =
        tournamentPairings[settingContext.round][index].player2.name;

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
    });
    ableNextRound();
  };
  return (
    <div className="">
      <form onSubmit={handleSubmit(onSubmit)}>
        {tournamentPairings[settingContext.round].map(
          (e: any, index: number) => (
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
                >
                  <option value="Still playing">Still Playing</option>
                  <option value="2 - 0 - 0">2 - 0 - 0</option>
                  <option value="2 - 1 - 0">2 - 1 - 0</option>
                  <option value="1 - 0 - 1">1 - 0 - 1</option>
                  <option value="1 - 1 - 1">1 - 1 - 1</option>
                  <option value="0 - 0 - 1">0 - 0 - 1</option>
                  <option value="0 - 2 - 0">0 - 2 - 1</option>
                  <option value="1 - 2 - 0">1 - 2 - 0</option>
                  <option value="0 - 1 - 1">0 - 1 - 1</option>
                </select>
              </Grid>
            </Grid>
          )
        )}
        <input type="submit" value="OK" className="okBtn" />
      </form>
    </div>
  );
};

export default OutputBarRound;
