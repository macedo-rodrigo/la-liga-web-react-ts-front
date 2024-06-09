/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { useContext, useEffect, useRef, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";

import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import "./RegisterPage.scss";
import { TeamResponse } from "../../models/Team";
import { AuthContext } from "../../App";

interface RegisterInfo {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  team?: string | TeamResponse;
}

const RegisterPage = (): JSX.Element => {
  const authInfo = useContext(AuthContext);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const teamRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (authInfo?.userInfo) {
      navigate("/player-page");
    }
  }, [authInfo, navigate]);

  const submitForm = (event: MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();

    const registerInfo: RegisterInfo = {
      email: emailRef?.current?.value as string,
      password: passwordRef?.current?.value as string,
      firstName: firstNameRef?.current?.value as string,
      lastName: lastNameRef?.current?.value as string,
    };

    if (teamRef?.current?.value) {
      registerInfo.team == teamRef?.current?.value;
    }

    if (!registerInfo.email || !registerInfo.password || !registerInfo.firstName || !registerInfo.lastName) {
      alert("For creating your account, we're gonna need your full name, email, an a password. ");
    } else {
      doRegisterRequest(registerInfo);
    }
  };

  const doRegisterRequest = (registerInfo: RegisterInfo): void => {
    fetch("http://localhost:3000/user/register", {
      method: "POST",
      body: JSON.stringify(registerInfo),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then(async (response) => {
        return await response.json();
      })
      .then((data) => {
        console.log(data);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
        alert("Sorry, an error has occurred in the request! Try again later.");
      });
  };

  return (
    <div className="register-page page">
      <Header />
      <div className="register-page__container">
        <h1>Sign Up</h1>
        <p>Please enter your details to create an account:</p>
        <form className="register-page__form">
          <label htmlFor="email">Email:</label>
          <input ref={emailRef} type="text" id="email" placeholder="Your email" />
          <label htmlFor="password">Password:</label>
          <input ref={passwordRef} type="password" id="password" placeholder="Insert your password" />
          <label htmlFor="firstName">First Name:</label>
          <input ref={firstNameRef} type="text" id="firstName" placeholder="Insert your first name" />
          <label htmlFor="lastName">Last Name:</label>
          <input ref={lastNameRef} type="text" id="lastName" placeholder="Now, your last name" />
          <label htmlFor="team">Team (optional):</label>
          <input ref={teamRef} type="text" id="team" placeholder="Inserte your team (if you have one)" />
          <div className="register-page__buttons">
            <button onClick={submitForm} className="register-page__button">
              Create my account
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default RegisterPage;
