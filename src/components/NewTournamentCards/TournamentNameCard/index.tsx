import react from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

const NewTournamentCard = () => {
  const [showTournamentInput, setTournamentInput] = useState(false);
  const tournamentInputHandler = () => {
    setTournamentInput(showTournamentInput ? false : true);
  };
  type Inputs = {
    tournamentName: string;
  };

  /// states from innputHook ////
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  //// submit function ////////
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <div className="section">
      <div>
        <h3 style={{ marginTop: "0" }}>Tournament</h3>
        {!showTournamentInput ? (
          <div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
              earum, amet id hic quis voluptates repellendus doloremque ducimus.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("tournamentName", { required: true })} />
            {errors.tournamentName && <span>This field is required</span>}
            <input type="submit" />
          </form>
        )}
      </div>
      <div
        onClick={() => tournamentInputHandler()}
        style={{ padding: "1rem", display: "flex", alignItems: "center" }}
      >
        <EmojiEventsIcon sx={{ fontSize: 40 }} style={{ color: "FA04F6" }} />
      </div>
    </div>
  );
};
export default NewTournamentCard;
