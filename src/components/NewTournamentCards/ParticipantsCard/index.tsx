import react from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState, CSSProperties, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

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
    <div style={formSection}>
      <div style={{ width: "100%" }}>
        <h3 style={{ marginTop: "0" }}>Participants</h3>

        <div style={{ width: "100%" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              // style={formElement}
              {...register("partisipants", { required: true, maxLength: 15 })}
            />
            {errors.partisipants && <span>This field is required</span>}

            <input value="Add" type="submit" />
          </form>

          {participants.map((i) => (
            <div
              key={i.id}
              style={{
                backgroundColor: "rgba(11, 0, 44, 0.85)",
                marginTop: "10px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              {i.name}
              <div>
                <CreateIcon />
                <DeleteIcon onClick={() => deleteParticipant(i.name)} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={ButtonSection}>
        {participants.length >= 2 ? (
          <button
            style={activeButton}
            onClick={() => props.toggleParticipantView()}
          >
            Done
          </button>
        ) : (
          <button style={inActiveButton}>Done</button>
        )}
        {/* <PersonAddIcon sx={{ fontSize: 40 }} style={{ color: "FA04F6" }} /> */}
      </div>
    </div>
  );
};
const formSection: CSSProperties = {
  backgroundColor: "rgba(56, 44, 89, 1)",
  display: "flex",
  marginBottom: "1rem",
};
const ButtonSection: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  width: "50%",
  paddingTop: "1rem",
};
const formElement: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
};
const fullWidth: CSSProperties = {
  width: "100%",
};
const activeButton: CSSProperties = {
  backgroundColor: "rgba(250, 0, 255, 1)",
  color: "white",
  border: "none",
  padding: "0.5rem",
};
const inActiveButton: CSSProperties = {
  backgroundColor: "rgba(11, 0, 44, 0.2)",
  color: "rgba(23, 11, 56, 1)",
  border: "none",
  padding: "0.5rem",
};
export default ParticipantsCard;
