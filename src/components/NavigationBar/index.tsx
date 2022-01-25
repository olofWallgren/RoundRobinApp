import React from "react";
// import { useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";
import "../NavigationBar/navigationBar.css";
import "../../layout/container.css";
import { TournamentStore } from "../../Contexts/tournamentContext";
// const isSelected = (a: string, b: string, exact?: boolean) =>
//   (exact ? a === b : a.startsWith(b)) ? true : undefined;

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
  const settingContext = TournamentStore();

  return (
    <nav className="navigation-bar">
      <ul className="navigation-bar__list">
        {NavigationList.map((nav) => (
          <li className="navigation-bar__item" key={nav.path}>
            {/* <Link className="navigation-bar__link" to={nav.path}>
              {nav.title}
            </Link> */}
            <Link className={`${!settingContext.displayNavigation ? ' navigation-bar__link' : 'navigation-bar__link--notActive '}`} to={nav.path}>
              {nav.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavigationBar;
