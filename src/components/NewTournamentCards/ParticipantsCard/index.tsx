import react from "react";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import Alert from "@mui/material/Alert";
import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import "../ParticipantsCard/participantsCard.css";
import "../../../layout/primaryBtn.css";

const ParticipantsCard = (props: any) => {
  const { getParticipants } = props;

  type Inputs = {
    partisipants: string;
  };
  type participant = {
    name: string;
    id: number;
  };

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<Inputs>();

  //// en player array för att mappa ut alla players som skapas ///////
  const [participants, setParticipants] = useState<participant[]>([]);

  ///// uppdaterar en lika dan array i tournament view ////////
  useEffect(() => {
    getParticipants(participants);
  }, [participants]);

  //// uppdaterar participants statet från localstorage/////////
  useEffect(() => {
    let ls = JSON.parse(localStorage.getItem("players") || "");
    setParticipants(ls);
  }, []);

  //// sparar data till LS ///////////
  function saveToLocalStorage(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
    console.log("cardLS", localStorage.getItem("players"));
  }

  ///// uppdaterar participants statet ////////////
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    ///// rensar inputfield //////////
    resetField("partisipants");
    setParticipants((prevState) => {
      const newItems = [
        ...prevState,
        { id: Math.floor(Math.random() * 1000) + 1, name: data.partisipants },
      ];
      saveToLocalStorage("players", newItems);
      return newItems;
    });
  };

  ///// deletar en spelare från particisipant statet /////////
  const deleteParticipant = (id: number) => {
    const updateParticipants = [
      ...participants.filter((p) => {
        return p.id !== id;
      }),
    ];
    setParticipants(updateParticipants);
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
            {...register("partisipants", { required: true, maxLength: 15 })}
          />
          <input
            className="addBtnWidth primaryBtn primaryBtn--small"
            value="Add"
            type="submit"
          />
        </form>

        {/* Error Modal */}
        <div className="errorContainer">
          {errors.partisipants && (
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
          {participants.map((i) => (
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
        {participants.length >= 2 ? (
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
export default ParticipantsCard;
