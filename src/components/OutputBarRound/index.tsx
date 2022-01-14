import React from "react";
import "../../layout/OutputBar.css";
import "./OutputBarRound.css";
import { Grid } from "@mui/material";
import { TournamentStore } from "../../Contexts/tournamentContext";

import { useForm, SubmitHandler } from "react-hook-form";

interface Props {
  pairingId?: any;
  player1?: any;
  player2?: any;
  children?: React.ReactNode;
}

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

  const onSubmit: SubmitHandler<Inputs> = (data) => {

    let korv = settingContext.playerList;
    let player1 = korv
    console.log(player1)
    // myArray.find(x => x.id === '45').foo;


    console.log("från outputbar:", "matchID:",pairingId, data, player1, "vs", player2);
    switch (data.result) {
      case '2 - 0 - 0': 
        console.log("två nöll te", {player1});
        // player1.score + 3
        // player1.wins + 2
        // player1.losses + 0
        // player1.draws + 0
      break;
      case '2 - 1 - 0': 
        console.log("hejsan");
      break;
      case '1 - 0 - 1': 
        console.log("hejsan");
      break;
      case '1 - 1 - 1': 
        console.log("hejsan");
      break;
      case '0 - 0 - 1': 
        console.log("hejsan");
      break;
      case '0 - 2 - 0': 
        console.log("hejsan");
      break;
      case '1 - 2 - 0': 
        console.log("hejsan");
      break;
      case '0 - 1 - 1': 
        console.log("hejsan");
      break;
    default:
      console.log("bajskorv");  
    }
  };

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
          <select className="select" {...register("result")}>
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
          <input type="submit" value="OK" className="okBtn" />
        </form>
      </Grid>
    </Grid>
  );
};

export default OutputBarRound;
