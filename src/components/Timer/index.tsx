import React from "react";
import "./timer.css";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

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
    setPaused(false);
    setOver(false);
  };

  React.useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);
    return () => clearInterval(timerID);
  });

  return (
    <div className="timer__container" >
      <p className="timer__totalTime ">{`${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s
        .toString()
        .padStart(2, "0")}`}</p>
      {/* <p className="timer__startText timer--noMargin" onClick={() => setPaused(!paused)}>
        {paused ? "Start round" : "Pause round"}
      </p> */}
      <div onClick={() => setPaused(!paused)}>
        {paused ? <PlayArrowIcon /> : <PauseIcon />}
      </div>
      <RestartAltIcon onClick={() => reset()} />
      {/* <div>{over ? "Time's up!" : ""}</div> */} 
    </div>
  );
};

export default Timer;
