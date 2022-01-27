import React from "react";
import "../Header/header.css";
import "../../layout/container.css";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import foxProfile from "../../Assets/images/foXprofile2.png";

const Header = () => {
  return (
    <header className="header">
      <div className="fixer">
        <AccountBoxIcon fontSize="large" className="header__icon" />
      </div>
      <h1 className="header__h1">Magic Round Robin</h1>
      <div className="header__iconContainer">
        <img className="foxyProfileIcon" src={foxProfile} alt="foxyprofile" />
      </div>
    </header>
  );
};

export default Header;
