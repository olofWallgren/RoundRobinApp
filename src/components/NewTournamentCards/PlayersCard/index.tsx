import DeleteIcon from "@mui/icons-material/Delete";
import Alert from "@mui/material/Alert";
import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import "./playersCard.css";
import "../../../layout/primaryBtn.css";
import { playerItem } from "../../../types/playerItem";
import DescriptionAlerts from "../../NameModal";
const PlayersCard = (props: any) => {
  const { getParticipants, isUnEven } = props;

  type Inputs = {
    player: string;
  };
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<Inputs>();
  const [showNameInUse, setShowNameInUse] = useState(false);
  //// en player array för att mappa ut alla players som skapas ///////
  const [players, setPlayers] = useState<playerItem[]>([]);
  ///// uppdaterar en likadan array i tournament view ////////
  useEffect(() => {
    getParticipants(players);
  }, [players]);

  useEffect(() => {
    try {
      let ls = JSON.parse(localStorage.getItem("players") || "");
      setPlayers(ls);
    } catch (error) {}
  }, []);

  function saveToLocalStorage(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
  ///// uppdaterar participants statet ////////////
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    //// Checks if name is already in use
    let oldNames = players.map((a) => a.name);
    if (oldNames.includes(data.player)) {
      nameAlreadyInUse();
    } else {
      ///// rensar inputfield //////////
      resetField("player");

      setPlayers((prevState) => {
        ///// Kollar genom alla spelarobjekt efter det
        ///// högsta ID't. newItem tar sedan det värdet och
        ///// lägger till 1 för att skapa ett högre ID
        let oldIds = prevState.map((a) => a.id);
        let highestId = 0;

        oldIds.forEach((a) => {
          if (highestId < a) {
            highestId = a;
          }
        });

        const newItems = [
          ...prevState,
          {
            id: highestId + 1,
            name: data.player,
            score: 0,
            matchHistory: { win: 0, loss: 0, draw: 0 },
          },
        ];
        saveToLocalStorage("players", newItems);
        return newItems;
      });
    }
  };

  ////// Kollar om namnet är upptaget, skickar en error-modal om
  const nameAlreadyInUse = () => {
    setShowNameInUse(true);
  };
  ////// Sätter tillbaka setshowname till false så att man
  ////// kan köra nameAlreadyInUse igen
  function resetNameChecker() {
    setShowNameInUse(false);
  }
  ///// deletar en spelare från particisipant statet /////////
  const deleteParticipant = (id: number) => {
    const updateParticipants = [
      ...players.filter((p) => {
        return p.id !== id;
      }),
    ];
    setPlayers(updateParticipants);
    saveToLocalStorage("players", updateParticipants);
  };
  function startTournament() {
    checkIfEvenAmountOfPlayers();
    props.toggleParticipantView();
  }
  function checkIfEvenAmountOfPlayers() {
    if (players.length % 2) {
      isUnEven();
    }
  }
  return (
    <>
      <div className="inputContainer">
        <form className="flexBetween" onSubmit={handleSubmit(onSubmit)}>
          <input
            className="textField"
            type="text"
            placeholder="Enter player name"
            {...register("player", { required: true, maxLength: 15 })}
          />
          <input
            className="addBtnWidth primaryBtn primaryBtn--small"
            value="Add"
            type="submit"
          />
        </form>
        <div>
          {showNameInUse ? (
            <DescriptionAlerts resetNameChecker={resetNameChecker} />
          ) : (
            ""
          )}
        </div>
        <div className="errorContainer">
          {errors.player && (
            <Alert
              sx={{
                zIndex: "modal",
                position: "absolute",
                width: "100%",
                top: "5px",
              }}
              severity="error"
            >
              Please enter a name with less than 16 letters!
            </Alert>
          )}
        </div>
        <div className="scrollBox">
          {players.map((i) => (
            <div key={i.id} className="playerBox flexBetween">
              {i.name}
              <div>
                <DeleteIcon
                  className="icon deleteIcon"
                  onClick={() => deleteParticipant(i.id)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="buttonSection">
        {players.length >= 2 ? (
          <button
            className="primaryBtn fullWidth"
            onClick={() => startTournament()}
          >
            Done
          </button>
        ) : (
          <button disabled className="primaryBtn fullWidth">
            Done
          </button>
        )}
      </div>
    </>
  );
};
export default PlayersCard;
