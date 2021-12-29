import { collection, getDocs } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase-config";
import "../../layout/container.css";

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
      <h1>Home Testing Olof</h1>
    </div>
  );
};

export default Home;
