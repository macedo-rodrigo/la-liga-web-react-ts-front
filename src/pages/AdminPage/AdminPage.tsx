import { useContext } from "react";
import { Navigate } from "react-router-dom";

import { AuthContext } from "../../App";
import Header from "../../components/Header/Header";
import "./AdminPage.scss";

const AdminPage = (): JSX.Element => {
  const authInfo = useContext(AuthContext);
  return (
    <div className="admin-page page">
      <Header></Header>
      {authInfo?.userInfo ? (
        <>
          <h1>Hey! It's good to see you {authInfo.userInfo?.firstName}!</h1>
          <p>This your Administrator dashboard.</p>
        </>
      ) : (
        <Navigate to="/login" replace={true}></Navigate>
      )}
    </div>
  );
};

export default AdminPage;
