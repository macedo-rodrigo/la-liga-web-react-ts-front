import { NavLink } from "react-router-dom";
import "./Header.scss";
import { useContext } from "react";

import logo from "../../assets/images/Logo.png"
import { AuthContext } from "../../App";

const Header = (): JSX.Element => {
  const authInfo = useContext(AuthContext);
  return (
    <header className="header">
      <img src={logo} alt="Logo" className="header__logo" />
      <div>
        <div className="header__user-info">
          {
            authInfo?.userInfo ? (
              <>
                <span className="header__name"> Welcome {authInfo.userInfo.firstName}!</span>
                <span className="header__logout" onClick={authInfo.logout}>Log out</span>
              </>   
          ) : (
            <div>
              <NavLink to="/login" className="header__link">
                Sign in
              </NavLink>
              <NavLink to="/register" className="header__link">
                Sign up
              </NavLink>
            </div>
            
          )
          }
        </div>
      </div>
    </header>
  );
};

export default Header;
