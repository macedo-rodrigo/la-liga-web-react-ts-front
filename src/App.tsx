import "./App.scss";
import { HashRouter, Route, Routes } from "react-router-dom";
import { createContext, useState } from "react";

import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import { UserResponse } from "./models/User";
import PlayerPage from "./pages/PlayerPage/PlayerPage";
import CaptainPage from "./pages/CaptainPage/CaptainPage";
import AdminPage from "./pages/AdminPage/AdminPage";

interface AuthContextInfo {
  userInfo?: UserResponse;
  userToken?: string;
  login?: (userToken: string, userInfo: UserResponse) => void;
  logout?: () => void;
}

export const AuthContext = createContext<AuthContextInfo>({});

const App = (): JSX.Element => {
  const [userToken, setUserToken] = useState<string | undefined>();
  const [userInfo, setUserInfo] = useState<UserResponse | undefined>();

  const login = (userTokenFromApi: string, userInfoFromApi: UserResponse): void => {
    setUserToken(userTokenFromApi);
    setUserInfo(userInfoFromApi);
  }

  const logout = (): void => {
    setUserToken(undefined);
    setUserInfo(undefined);

  }


  return (
    <AuthContext.Provider value={{ userInfo, userToken, login, logout }}>
      <div className="app">
        <HashRouter>
          <Routes>
            <Route path="/" element={<HomePage></HomePage>}></Route>
            <Route path="/login" element={<LoginPage></LoginPage>}></Route>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/player-page" element={<PlayerPage />} />
            <Route path="/captain-page" element={<CaptainPage />} />
            <Route path="/admin-page" element={<AdminPage />} />
          </Routes>
        </HashRouter>
      </div>
    </AuthContext.Provider>
  );
};

export default App;
