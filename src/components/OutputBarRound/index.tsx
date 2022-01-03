import React from "react";
import "../../layout/OutputBar.css";
import "./OutputBarRound.css";
// import DropDownMenu from "../../components/DropDownMenu"
import { Grid, Button, Menu, MenuItem } from '@mui/material';

import { useForm, SubmitHandler } from "react-hook-form";


interface Props {
  player1?: React.ReactNode,
  player2?: React.ReactNode,
  children?: React.ReactNode
  
}

type Inputs = {
  result: String;
};

const OutputBarRound: React.FC<Props> = ({
  player1,
  player2,
  children
}) => {
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  return (
    <Grid container className="outputBarContainer" spacing={1}>

      <Grid item xs={9}>
        <p className="names">{player1} - {player2}</p>
      </Grid>

      <Grid item xs={3}>
        <form onSubmit={handleSubmit(onSubmit)}>
            <select {...register("result")}>
              <option value="Still playing">Still Playing</option>
              <option value="2 - 0 - 0">2 - 0 - 0</option>
              <option value="2 - 1 - 0">2 - 1 - 0</option>
              <option value="1 - 0 - 1">1 - 0 - 1</option>
              <option value="1 - 1 - 1">1 - 1 - 1</option>
              <option value="0 - 2 - 0">0 - 2 - 1</option>
              <option value="1 - 2 - 0">1 - 2 - 0</option>
              <option value="0 - 1 - 1">0 - 1 - 1</option>
            </select>
            <input type="submit" />
        </form>
      </Grid>

     
    </Grid>
  );
};

export default OutputBarRound;
