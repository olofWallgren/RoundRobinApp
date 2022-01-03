import React from "react";
import "../../layout/OutputBar.css";
import "./OutputBarRound.css";
import DropDownMenu from "../../components/DropDownMenu"
import { Grid, Button, Menu, MenuItem } from '@mui/material';

import { useForm, SubmitHandler } from "react-hook-form";


interface Props {
  player1?: React.ReactNode,
  player2?: React.ReactNode,
  children?: React.ReactNode

}

const OutputBarRound: React.FC<Props> = ({
  player1,
  player2,
  children
  }) => {
 

  return (
    <Grid container className="outputBarContainer" spacing={1}>

      <Grid item xs={9}>
        <p className="names">{player1} - {player2}</p>
      </Grid>

      <Grid item xs={3}>
      <DropDownMenu />

      </Grid>

     
    </Grid>
  );
};

export default OutputBarRound;
