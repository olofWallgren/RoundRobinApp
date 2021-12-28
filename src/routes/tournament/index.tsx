import * as React from "react";
import "../../layout/container.css";
import { Link } from 'react-router-dom';

const Tournament = () => (
  <div className="container">
    <h1>Tournament</h1>
    <Link to="/current-tournament/round">Go to Current Tournament</Link>
  </div>
);

export default Tournament;
