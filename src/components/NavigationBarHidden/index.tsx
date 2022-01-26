import React from "react";

import "../NavigationBarHidden/navigationBarhidden.css";
import "../../layout/container.css";

const NavigationBarHidden = () => {
  return (
    <div className="navigation-bar-hidden">
      <ul className="navigation-bar-hidden__list">
        <li className="navigation-bar-hidden__item">
          <div className="navigation-bar-hidden__link--notActive">test</div>
        </li>
        <li className="navigation-bar-hidden__item">
          <div className="navigation-bar-hidden__link--notActive">test2</div>
        </li>
        <li className="navigation-bar-hidden__item">
          <div className="navigation-bar-hidden__link--notActive">test3</div>
        </li>
      </ul>
    </div>
  );
};

export default NavigationBarHidden;
