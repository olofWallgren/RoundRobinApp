import react from "react";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import Alert from "@mui/material/Alert";
import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import "./playersCard.css";
import "../../../layout/primaryBtn.css";
import { playerItem } from "../../../types/playerItem";
import { saveToLocalStorage } from "../../../Utilities/LocalStorage/saveToLocalStorage";
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

  //// En player array för att mappa ut alla players som skapas ///////
  const [players, setPlayers] = useState<playerItem[]>([]);

  ///// Uppdaterar en lika dan array i tournament view ////////
  useEffect(() => {
    getParticipants(players);
  }, [players]);

  //// Uppdaterar participants statet från localstorage/////////
  useEffect(() => {
    try {
      let ls = JSON.parse(localStorage.getItem("players") || "");
      setPlayers(ls);
    } catch (error) {}
  }, []);

  ///// Uppdaterar participants statet ////////////
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    ///// Rensar inputfield //////////
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
      saveToLocalStorage("players", newItems);
      return newItems;
    });
  };

  ///// Deletar en spelare från particisipant statet /////////
  const deleteParticipant = (id: number) => {
    const updateParticipants = [
      ...players.filter((p) => {
        return p.id !== id;
      }),
    ];
    setPlayers(updateParticipants);
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
          <input
            className="addBtnWidth primaryBtn primaryBtn--small"
            value="Add"
            type="submit"
          />
        </form>

        {/* Error Modal */}
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

      {/* // Buttons // */}
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
