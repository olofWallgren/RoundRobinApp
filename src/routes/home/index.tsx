import { collection, getDocs } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase-config";
import "../../layout/container.css";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

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
      <div>
        <Button variant="text">Text</Button>
      </div>
    </div>
  );
};

export default Home;
