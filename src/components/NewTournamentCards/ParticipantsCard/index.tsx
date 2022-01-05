import react from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState, CSSProperties } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { TournamentStore } from "../../../Contexts/tournamentContext";

import { width } from "@mui/system";

const ParticipantsCard = () => {
  const settingStore = TournamentStore();

  type Inputs = {
    partisipants: string;
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const [participants, setParticipants] = useState([{ id: 1, name: "test" }]);
  const [showParticipantsInput, setParticipantInput] = useState(false);
  const joinParticipants = () => {
    const newList = {
      tournamentName: "",
      participants: participants,
      hour: "",
      min: "",
      sec: "",
      games: "",
      win: "",
      loss: "",
      draw: "",
    };
    console.log(newList);
    settingStore.setTournament(newList);
    // participants.forEach((e)=>newList.participants.push(e.id, e.name))
  };
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const updateParticipants = [
      ...participants,
      { id: participants.length + 1, name: data.partisipants },
    ];
    setParticipants(updateParticipants);
    joinParticipants();
  };

  const participantInputHandler = () => {
    setParticipantInput(showParticipantsInput ? false : true);
  };

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
      <div>
        <h3 style={{ marginTop: "0" }}>Participants</h3>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("partisipants", { required: true })} />
            {errors.partisipants && <span>This field is required</span>}
            <input type="submit" />
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
      <div
        onClick={() => participantInputHandler()}
        style={{ padding: "1rem", display: "flex", alignItems: "center" }}
      >
        <PersonAddIcon sx={{ fontSize: 40 }} style={{ color: "FA04F6" }} />
      </div>
    </div>
  );
};
const formSection: CSSProperties = {
  backgroundColor: "rgba(56, 44, 89, 1)",
  display: "flex",
  marginBottom: "1rem",
};
export default ParticipantsCard;
