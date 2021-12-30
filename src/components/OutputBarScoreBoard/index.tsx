import React from "react";
// import { useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";
import "../../layout/OutputBar.css";
import { Grid } from '@mui/material';


interface Props {
  players: string,

}

const OutputBarScoreBoard = () => {


  return (
    <div className="outputBarContainer">
      <div>
        <p className="names">n00by McNoobface - Spelare 2</p>
      </div>
      <div>
        igen
      </div>
      <div>och igen</div>
    </div>
  );
};

export default OutputBarScoreBoard;
