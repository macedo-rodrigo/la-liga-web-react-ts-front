/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useContext } from "react";
import { Navigate } from "react-router-dom";

import Header from "../../components/Header/Header";
import "./CaptainPage.scss";
import { AuthContext } from "../../App";

const CaptainPage = (): JSX.Element => {
  const authInfo = useContext(AuthContext);
  return (
    <div className="captain-page page">
      {authInfo?.userInfo ? (
        <>
          <Header></Header>
          <h1>Team Captain Page</h1>
        </>
      ) : (
        <Navigate to="/login" replace={true}></Navigate>
      )}
    </div>
  );
};

export default CaptainPage;