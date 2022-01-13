import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import "../../layout/container.css";

const Loader = () => {
  return (
    <>
      <div className="container">
        <div className="loader__container">
          <CircularProgress
            sx={{
              color: "#fa04f6",
              position: "absolute",
              left: "50%",
              top: "30%",
              transform: "translate(-50%, -50%)",
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Loader;
