import react from "react";
// import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import "./playersCard.css";
import "../../../layout/primaryBtn.css";
import { playerItem } from "../../../types/playerItem";

const PlayersCard = (props: any) => {
  const { getParticipants } = props;

  type Inputs = {
    player: string;
  };
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<Inputs>();

  //// en player array för att mappa ut alla players som skapas ///////
  const [players, setPlayers] = useState<playerItem[]>([]);

  ///// uppdaterar en lika dan array i tournament view ////////
  useEffect(() => {
    getParticipants(players);
  }, [players]);

  //// uppdaterar participants statet från localstorage/////////

  ////// UTKOMMENTERAD FÖR TILLFÄLLET ////////////
  useEffect(() => {
    try {
      let ls = JSON.parse(localStorage.getItem("players") || "");
      setPlayers(ls);
    } catch (error) {}
  }, []);

  //// sparar data till LS ///////////

  ///////// UTKOMMENTERAD FÖR TILLFÄLLET ///////////
  function saveToLocalStorage(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
    console.log("cardLS", localStorage.getItem("players"));
  }

  ///// uppdaterar participants statet ////////////
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    ///// rensar inputfield //////////
    resetField("player");
    setPlayers((prevState) => {
      const newItems = [
        ...prevState,
        {
          id: players.length,
          name: data.player,
          score: 0,
          matchHistory: { win: 0, loss: 0, draw: 0 },
        },
      ];
      ///////// UTKOMMENTERAD FÖR TILLFÄLLET ///////////
      saveToLocalStorage("players", newItems);

      return newItems;
    });
  };

  ///// deletar en spelare från particisipant statet /////////
  const deleteParticipant = (id: number) => {
    const updateParticipants = [
      ...players.filter((p) => {
        return p.id !== id;
      }),
    ];
    setPlayers(updateParticipants);
    ///////// UTKOMMENTERAD FÖR TILLFÄLLET ///////////
    saveToLocalStorage("players", updateParticipants);
  };

  return (
    <>
      {/* Input för deltagare och add-knapp */}
      <div className="inputContainer">
        <form className="flexBetween" onSubmit={handleSubmit(onSubmit)}>
          <input
            className="textField"
            type="text"
            placeholder="Enter player name"
            {...register("player", { required: true, maxLength: 15 })}
          />
          {/* <PersonAddIcon sx={{ fontSize: 40 }} style={{ color: "FA04F6" }} /> */}
          <input
            className="addBtnWidth primaryBtn primaryBtn--small"
            value="Add"
            type="submit"
          />
        </form>

        {/* Error Text */}
        {errors.player && (
          <p className="errorText">
            Please enter a name with less than 16 letters
          </p>
        )}

        {/* Added Players with name and icons in a scrollbox */}
        <div className="scrollBox">
          {players.map((i) => (
            <div key={i.id} className="playerBox flexBetween">
              {i.name}
              <div>
                <CreateIcon className="icon editIcon" />
                <DeleteIcon
                  className="icon deleteIcon"
                  onClick={() => deleteParticipant(i.id)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* // Knappar // */}
      <div className="buttonSection">
        {players.length >= 2 ? (
          <button
            className="primaryBtn fullWidth"
            onClick={() => props.toggleParticipantView()}
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
