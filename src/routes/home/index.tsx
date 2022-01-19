import { db } from "../../firebase-config";
import "../../layout/fatFox.css";
import "../../layout/primaryBtn.css";
import "../../layout/secondaryBtn.css";
import { Link } from "react-router-dom";
import { CSSProperties } from "react";

const Home = () => {
  ///// sätter en key och value i ls annars crashar appen när man ska hämta ls ifrån participantCard och ls är tomt //////

  ////// UTKOMMENTERAD FÖR TILLFÄLLET ///////////////

  /////////// TEST ANNROP TILL DB //////////////////
  // const db = firestore();
  // const [users, setUsers] = useState<any>([]);

  // const usersCollectionRef = collection(db, "users");
  // useEffect(() => {
  //   const getUsers = async () => {
  //     const data = await getDocs(usersCollectionRef);
  //     // data.docs.map((i: any) => {
  //     //   console.log(i.data());
  //     // });
  //     setUsers(data.docs.map((doc) => ({ ...doc.data() })));
  //   };

  //   getUsers();
  // }, []);
  // console.log(users);

  return (
    <div style={homeContainer}>
      <div className="fatFox"></div>
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
