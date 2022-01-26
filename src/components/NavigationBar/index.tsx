import React from "react";
import { Link } from "react-router-dom";
import "../NavigationBar/navigationBar.css";
import "../../layout/container.css";

interface NavigationItem {
  title: string;
  path: string;
  exact?: boolean;
}

const NavigationList: NavigationItem[] = [
  {
    title: "Round",
    path: "/current-tournament/round",
  },
  {
    title: "Scoreboard",
    path: "/current-tournament/scoreboard",
  },
  {
    title: "Previous Rounds",
    path: "/current-tournament/previous-rounds",
  },
];

const NavigationBar = () => {
  return (
    <nav className="navigation-bar">
      <ul className="navigation-bar__list">
        {NavigationList.map((nav) => (
          <li className="navigation-bar__item" key={nav.path}>
            <Link className="navigation-bar__link" to={nav.path}>
              {nav.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavigationBar;
