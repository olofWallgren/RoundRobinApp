import React from "react";
import "../../layout/OutputBar.css";
import "./OutputBarRound.css";
import { Grid } from "@mui/material";
import { TournamentStore } from "../../Contexts/tournamentContext";
import { playerItem } from "../../types/playerItem";
import { useForm, SubmitHandler } from "react-hook-form";

interface Props {
  pairingId?: any;
  player1: string;
  player2?: any;
  children?: React.ReactNode;
}

type Score = {
  score: number;
  wins: number;
  losses: number;
  draw: number;
};
type Inputs = {
  result: String;
};

const OutputBarRound: React.FC<Props> = ({
  player1,
  player2,
  pairingId,
  children,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const settingContext = TournamentStore();

  ///// Hämtar alla spelare från Context, 
  ///// jämför med namn från våra spelare1, spelare2
  ///// för att kunna lägga in resultaten i rätt spelare
  function findPlayer(player: string, score: Score) {
    const newPlayer: any = settingContext.playerList.find((p) => {
      return p.name === player;
    });
    // Lägger till poäng, uppdaterar context med nya poäng
    // Inte säkra på varför context uppdateras dock
    newPlayer.score += score.score
    newPlayer.matchHistory.win += score.wins
    newPlayer.matchHistory.loss += score.losses
    newPlayer.matchHistory.draw += score.draw


    console.log("loggar playerlistcontext", settingContext.playerList);
    console.log("loggar tournamentcontext", settingContext.tournament);
  }

  const onSubmit: SubmitHandler<Inputs> = (data) => {
 
    switch (data.result) {
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
        console.log("bajskorv");
    }
  };

  const keepOptionValue: any = (data: string)  => {
    console.log(data);
  }

  return (
    <Grid
      container
      className="outputBarContainer"
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Grid item>
        <p className="names">
          {player1} - {player2}
        </p>
      </Grid>

      <Grid item>
        <form onSubmit={handleSubmit(onSubmit)}>
          <select onChange={keepOptionValue()} className="select" {...register("result")}>
            <option value="Still playing">Still Playing</option>
            <option value="2 - 0 - 0">2 - 0 - 0</option>
            <option value="2 - 1 - 0">2 - 1 - 0</option>
            <option value="1- 0 - 1">1 - 0 - 1</option>
            <option value="1 - 1 - 1">1 - 1 - 1</option>
            <option value="0 - 0 - 1">0 - 0 - 1</option>
            <option value="0 - 2 - 0">0 - 2 - 0</option>
            <option value="1 - 2 - 0">1 - 2 - 0</option>
            <option value="0 - 1 - 1">0 - 1 - 1</option>
          </select>
          <input type="submit" value="OK" className="okBtn" />
        </form>
      </Grid>
    </Grid>
  );
};

export default OutputBarRound;
