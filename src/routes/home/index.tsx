import { collection, getDocs } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase-config";
import "../../layout/container.css";
import "../../layout/fatFox.css";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import FoxButton from "../../components/foxButton";

const Home = () => {
  // const db = firestore();
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "tournaments");
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      data.docs.map((i: any) => {
        console.log(i.data());
      });
    };
    getUsers();
  }, []);

  return (
    <div className="container">
      <div className="fatFox">

      </div>
        <FoxButton 
          height="3rem"
          width="15rem"
          onClick={()=> console.log("Klicketiklack")}
          children ="NEW TOURNAMENT"
        />
      <div>
        <Button variant="text">Old tournaments</Button>
      </div>
    </div>
  );
};

export default Home;
