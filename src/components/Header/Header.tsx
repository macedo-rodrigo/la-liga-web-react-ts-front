import { NavLink } from "react-router-dom";
import { useContext } from "react";

import logo from "../../assets/images/Logo.png";
import "./Header.scss";
import { AuthContext } from "../../App";

const Header = (): JSX.Element => {
  const authInfo = useContext(AuthContext);
  return (
    <header className="header">
      <img src={logo} alt="Logo" className="header__logo" />
      <div className="header__user-info">
        {
          authInfo?.userInfo ? (
            <>
              <span className="header__name">{authInfo.userInfo.role} access |</span>
              <span className="header__logout" onClick={authInfo.logout}>Log out</span>
            </>
          ) : (
            <div className="header__links">
              <NavLink to="/login" className="header__link">Sign in</NavLink>
            </div>
          )
        }
      </div>
    </header>
  );
};

export default Header;

