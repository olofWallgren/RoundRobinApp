import "../../layout/fatFox.css";
import "../../layout/primaryBtn.css";
import "../../layout/secondaryBtn.css";
import { Link } from "react-router-dom";
import { CSSProperties } from "react";
import fatRobin from "../../Assets/images/magicFatRobin.png";

const Home = () => {
  localStorage.clear();
  return (
    <div style={homeContainer}>
      <div className="fest">
        <div className="test">
          <div className="foxContainer">
            <img className="fox" src={fatRobin} alt="maskot" />
          </div>
        </div>
      </div>
      <div style={btnContainer}>
        <Link className="primaryBtn" to="/create-tournament">
          Create Tournament
        </Link>
      </div>
    </div>
  );
};
const homeContainer: CSSProperties = {
  marginTop: "4rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};
const btnContainer: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  marginTop: "3rem",
  width: "224px",
};

export default Home;
