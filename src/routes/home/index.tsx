import { collection, getDocs } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase-config";
import "../../layout/fatFox.css";
import "../../layout/primaryBtn.css";
import "../../layout/secondaryBtn.css";
import { Link } from "react-router-dom";
import { CSSProperties } from "react";
import fatRobin from "../../Assets/images/robinThree.png";


const Home = () => {
  ///// sätter en key och value i ls annars crashar appen när man ska hämta ls ifrån participantCard och ls är tomt //////

  ////// UTKOMMENTERAD FÖR TILLFÄLLET ///////////////

  /////////// TEST ANNROP TILL DB //////////////////
  // const db = firestore();
  // const [users, setUsers] = useState([]);

  // const usersCollectionRef = collection(db, "tournaments");
  // useEffect(() => {
  //   const getUsers = async () => {
  //     const data = await getDocs(usersCollectionRef);
  //     data.docs.map((i: any) => {
  //       console.log(i.data());
  //     });
  //   };
  //   getUsers();
  // }, []);
  console.log(fatRobin);

  return (
    <div style={homeContainer}>
      {/* <div className="fatFox"></div> */}
      <div className="test">
        <div className="foxContainer">
        <img className="fox" src={fatRobin} alt="maskot" />
        </div>
      </div>

      <div style={btnContainer}>
        <Link
          className="primaryBtn"
          style={{ marginBottom: "1rem" }}
          to="/create-tournament"
        >
          Create Tournament
        </Link>
        <Link className="secondaryBtn" to="/">
          Continue Old
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
