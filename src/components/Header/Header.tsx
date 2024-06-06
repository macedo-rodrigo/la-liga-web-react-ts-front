import { NavLink } from "react-router-dom";

import "./Header.scss";
import logo from "../../assets/images/Logo.png"

const Header = (): JSX.Element => {
  return (
    <header className="header">
      <img src={logo} alt="Logo" className="header__logo" />
      <div>
        <NavLink to="/login" className="header__link">
          Sign in
        </NavLink>
        <NavLink to="/register" className="header__link">
          Sign up
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
