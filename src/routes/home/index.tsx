import * as React from "react";
import "../../layout/container.css";
import { Link } from 'react-router-dom';

const Home = () => {
  
  return (
  <div className="container">
    <h1>Home</h1>
    <button><Link to="/create-tournament">New Tournament</Link></button>
  </div>
  );
};

export default Home;
