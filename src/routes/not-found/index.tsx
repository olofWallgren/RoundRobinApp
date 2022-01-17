import * as React from "react";
import SentimentDissatisfiedOutlinedIcon from "@mui/icons-material/SentimentDissatisfiedOutlined";
import "../../layout/container.css";
import "../not-found/notFound.css";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <div className="container">
        <div className="notFound__container">
          <SentimentDissatisfiedOutlinedIcon className="notFound__icon" />
          <h1 className="notFound__title">404</h1>
          <h2 className="notFound__subHeading notFound--noMargin">
            Page not found
          </h2>
          <div className="notFound__text">
            <p>
              The Page you are looking for doesn't exist or an other error
              occured.
            </p>
            <p className="notFound--noMargin">
              <Link className="notFound__link" to="/">
                Click here
              </Link>{" "}
              to be redirected to the homepage.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
