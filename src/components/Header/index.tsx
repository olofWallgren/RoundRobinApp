import React from "react";
// import { useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";
import "../Header/header.css";
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
    title: "Home",
    path: "/",
    exact: true,
  },
];

const Header = () => {
  // const { pathname } = useLocation();

  return (
    <header className="header">
      <h2>Round Robin</h2>
        <nav className="header__nav">
          <ul className="header__ul">
            {NavigationList.map((nav) => (
              <li className="header__li" key={nav.path}>
                <Link to={nav.path}>
                  {nav.title}
                  {/* {`, Selected: ${!!isSelected(pathname, nav.path, nav.exact)}`} */}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
    </header>
  );
};

export default Header;
