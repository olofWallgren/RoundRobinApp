import React from "react";
import "./timer.css";
import TimerModal from "../TimerModal";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

interface ITimer {
  hours: number;
  minutes: number;
  seconds: number;
}

const Timer = ({ hours = 0, minutes = 0, seconds = 0 }: ITimer) => {
  const [paused, setPaused] = React.useState(true);
  const [over, setOver] = React.useState(false);
  const [[h, m, s], setTime] = React.useState([hours, minutes, seconds]);

  const tick = () => {
    if (paused || over) return;
    if (h === 0 && m === 0 && s === 0) setOver(true);
    else if (m === 0 && s === 0) {
      setTime([h - 1, 59, 59]);
    } else if (s === 0) {
      setTime([h, m - 1, 59]);
    } else {
      setTime([h, m, s - 1]);
    }
  };

  const reset = () => {
    setTime([Math.floor(hours), Math.floor(minutes), Math.floor(seconds)]);
    setPaused(true);
    setOver(false);
  };

  React.useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);
    return () => clearInterval(timerID);
  });

  return (
    <div className="timer__container">
      <div className="timer__totalTime ">
        <p className="timer--noMargin">{`${h.toString().padStart(2, "0")}:${m
          .toString()
          .padStart(2, "0")}:${s.toString().padStart(2, "0")}`}</p>
      </div>
      <div className="timer--noMargin" onClick={() => setPaused(!paused)}>
        {paused ? (
          <PlayArrowIcon fontSize="medium" className="timer__icons timer__playIcon" />
        ) : (
          <PauseIcon fontSize="medium" className="timer__icons timer__pauseIcon" />
        )}
      </div>
      <div className="timer__iconContainer timer--noMargin">
        <RestartAltIcon fontSize="medium" className="timer__icons" onClick={() => reset()} />
      </div>
      <div>{over ? <TimerModal /> : ""}</div> 
    </div>
  );
};

export default Timer;




