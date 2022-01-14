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
  let result = player1;
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
      </Grid>
    </Grid>
  );
};

export default OutputBarRound;
