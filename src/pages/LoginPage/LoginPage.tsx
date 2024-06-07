/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { useContext, useRef, MouseEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import welcome from "../../assets/images/Bienvenido.png";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./LoginPage.scss";
import { AuthContext } from "../../App";
import { ROL } from "../../models/User";

interface LoginInfo {
  email: string;
  password: string;
}

const LoginPage = (): JSX.Element => {
  const authInfo = useContext(AuthContext);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (authInfo?.userInfo?.role) {
      if (authInfo.userInfo.role === ROL.ADMIN) {
        navigate("/admin-page");
      } else if (authInfo.userInfo.role === ROL.PLAYER) {
        navigate("/player-page");
      } else if (authInfo.userInfo.role === ROL.CAPTAIN) {
        navigate("/captain-page");
      }
    }
  }, [authInfo, navigate]);

  const submitForm = (event: MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();

    const loginInfo: LoginInfo = {
      email: emailRef?.current?.value as string,
      password: passwordRef?.current?.value as string,
    };

    if (!loginInfo.email || !loginInfo.password) {
      alert("Email and password are required in order to log in.");
    } else {
      doLoginRequest(loginInfo);
    }
  };

  const doLoginRequest = (loginInfo: LoginInfo): void => {
    fetch("http://localhost:3000/user/login", {
      method: "POST",
      body: JSON.stringify(loginInfo),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then(async (response) => {
        if (response.status !== 200) {
          alert("The credentials provided are invalid");
        }
        return await response.json();
      })
      .then((data) => {
        console.log(data);

        // Login OK -> Guardamos las credenciales
        if (data.token && data.user && authInfo.login) {
          authInfo.login(data.token, data.user);
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Sorry, an error has occurred in the request! Try again later.");
      });
  };

  const handleSignIn = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    submitForm(e);
  };

  const handleJoinNow = () => {
    navigate("/register");
  };

  return (
    <div className="login-page page">
      <Header />
      <div className="login-page__container">
        <img className="login-page__img" src={welcome} alt="welcome" />
        <h1>SIGN IN</h1>
        <p>Please enter your credentials to log in:</p>
        <form className="login-page__form">
          <label htmlFor="email">Email:</label>
          <input
            ref={emailRef}
            type="text"
            id="email"
            placeholder="Insert your email here"
          />
          <label htmlFor="password">Password</label>
          <input
            ref={passwordRef}
            type="password"
            id="password"
            placeholder="Insert your password here"
          />
          <div className="login-page__buttons">
            <button onClick={handleSignIn} className="login-page__button">
              Let's go!
            </button>
            <button onClick={handleJoinNow} className="login-page__button">
              New to La Liga? Join Now
            </button>
          </div>
        </form>
      </div>
      <Footer/>
    </div>
  );
};

export default LoginPage;


