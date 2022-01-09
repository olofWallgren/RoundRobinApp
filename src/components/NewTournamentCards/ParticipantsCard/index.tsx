import react from "react";
// import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
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

  ///// uppdaterar participants statet ////////////
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const updateParticipants = [
      ...participants,
      { id: participants.length + 1, name: data.partisipants },
    ];
    resetField("partisipants");
    setParticipants(updateParticipants);
  };

  ///// deletar en spelare från particisipant statet /////////
  const deleteParticipant = (name: string) => {
    const updateParticipants = [
      ...participants.filter((p) => {
        return p.name !== name;
      }),
    ];
    setParticipants(updateParticipants);
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
          {/* <PersonAddIcon sx={{ fontSize: 40 }} style={{ color: "FA04F6" }} /> */}
          <input
            className="addBtnWidth primaryBtn primaryBtn--small"
            value="ADD"
            type="submit"
          />
        </form>
        
        {/* Error Text */}
        {errors.partisipants && (
          <p className="errorText">
            Please enter a name with less than 16 letters
          </p>
        )}
        
        {/* Added Players with name and icons in a scrollbox */}
        <div className="scrollBox">
          {participants.map((i) => (
            <div key={i.id} className="playerBox flexBetween">
              {i.name}
              <div>
                <CreateIcon className="icon editIcon" />
                <DeleteIcon
                  className="icon deleteIcon"
                  onClick={() => deleteParticipant(i.name)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* // Knappar // */}
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
