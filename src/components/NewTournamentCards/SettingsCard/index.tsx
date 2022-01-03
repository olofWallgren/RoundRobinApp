import react from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

const SettingsCard = () => {
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
    console.log(data);
  };

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
            <div
              style={{
                backgroundColor: "rgba(56, 44, 89, 1)",
                display: "flex",
              }}
            >
              <p>Length of round</p>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label>
                  Hour:
                  <input {...register("hour", { required: true })} />
                  {errors.hour && <span>This field is required</span>}
                </label>
              </div>

              <label>
                Min:
                <input {...register("min", { required: true })} />
                {errors.min && <span>This field is required</span>}
              </label>

              <label>
                Sec:
                <input {...register("sec", { required: true })} />
                {errors.sec && <span>This field is required</span>}
              </label>
            </div>
            <p>Games per match</p>

            <select {...register("games")}>
              <option value="best of three">best of 3</option>
              <option value="best of five">best of 5</option>
              <option value="best of seven">best of 7</option>
              <option value="single round">single round</option>
            </select>

            <p>Scoring</p>

            <label>
              Win:
              <input {...register("win", { required: true })} />
              {errors.hour && <span>This field is required</span>}
            </label>

            <label>
              Loss:
              <input {...register("loss", { required: true })} />
              {errors.min && <span>This field is required</span>}
            </label>

            <label>
              Draw:
              <input {...register("draw", { required: true })} />
              {errors.sec && <span>This field is required</span>}
            </label>

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
export default SettingsCard;
