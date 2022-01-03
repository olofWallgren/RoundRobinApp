import React from "react";
// import { useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";
import "../NavigationBar/navigationBar.css";
import "../../layout/container.css";

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
  // const { pathname } = useLocation();

  return (
    <nav className="navigation-bar">
      <ul className="navigation-bar__list">
        {NavigationList.map((nav) => (
          <li className="navigation-bar__item" key={nav.path}>
            <Link className="navigation-bar__link" to={nav.path}>
              {nav.title}
              {/* {`, Selected: ${!!isSelected(pathname, nav.path, nav.exact)}`} */}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavigationBar;
