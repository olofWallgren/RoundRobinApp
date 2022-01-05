import react from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { CSSProperties } from "react";
import { TournamentStore } from "../../../Contexts/tournamentContext";

const SettingsCard = () => {
  const settingStore = TournamentStore();
  type Inputs = {
    hour: string;
    min: string;
    sec: string;
    games: string;
    win: string;
    loss: string;
    draw: string;
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    settingStore.setTournament(data);
  };

  console.log("constext", settingStore.tournament);

  const [showSettingsInput, setSettingsInput] = useState(false);
  const settingsInputHandler = () => {
    setSettingsInput(showSettingsInput ? false : true);
  };

  return (
    <div className="section">
      <div>
        <h3 style={{ marginTop: "0" }}>Settings</h3>
        {!showSettingsInput ? (
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio earum,
            amet id hic quis voluptates repellendus doloremque ducimus.
          </p>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div style={formSection}>
              <p style={{ paddingRight: "1rem" }}>Length of round</p>
              <div style={inputSection}>
                <p>Hour:</p>
                <input
                  style={inputElement}
                  {...register("hour", { required: true })}
                />
                {errors.hour && <span>This field is required</span>}
              </div>

              <div style={inputSection}>
                <p>Min:</p>
                <input
                  style={inputElement}
                  {...register("min", { required: true })}
                />
                {errors.min && <span>This field is required</span>}
              </div>

              <div style={inputSection}>
                <p>Sec</p>
                <input
                  style={inputElement}
                  {...register("sec", { required: true })}
                />
                {errors.sec && <span>This field is required</span>}
              </div>
            </div>
            <div style={selectionSection}>
              <p>Games per match</p>

              <select {...register("games")}>
                <option value="best of three">best of 3</option>
                <option value="best of five">best of 5</option>
                <option value="best of seven">best of 7</option>
                <option value="single round">single round</option>
              </select>
            </div>
            <div style={formSection}>
              <p style={{ paddingRight: "1rem" }}>Scoring</p>
              <div style={inputSection}>
                <p>Win:</p>
                <input
                  style={inputElement}
                  {...register("win", { required: true })}
                />
                {errors.hour && <span>This field is required</span>}
              </div>
              <div style={inputSection}>
                <p>Loss:</p>
                <input
                  style={inputElement}
                  {...register("loss", { required: true })}
                />
                {errors.min && <span>This field is required</span>}
              </div>
              <div style={inputSection}>
                <p>Draw:</p>
                <input
                  style={inputElement}
                  {...register("draw", { required: true })}
                />
                {errors.sec && <span>This field is required</span>}
              </div>
            </div>

            <input type="submit" />
          </form>
        )}
      </div>
      <div style={{ padding: "1rem", display: "flex", alignItems: "center" }}>
        <SettingsIcon
          onClick={settingsInputHandler}
          sx={{ fontSize: 40 }}
          style={{ color: "FA04F6" }}
        />
      </div>
    </div>
  );
};
const formSection: CSSProperties = {
  backgroundColor: "rgba(56, 44, 89, 1)",
  display: "flex",
  marginBottom: "1rem",
};
const inputElement: CSSProperties = {
  width: "100%",
  padding: "0.5rem",
};
const inputSection: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  fontSize: "12px",
  color: "rgba(250, 4, 246, 1)",
};
const selectionSection: CSSProperties = {
  marginBottom: "1rem",
};
export default SettingsCard;
