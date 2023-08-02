import { Route, Routes, BrowserRouter } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import ControlPage from "./components/ControlPage";
import MessagePage from "./components/MessagePage";
import ReportsPage from "./components/ReportsPage";
import UserPage from "./components/UserPage";
import NotFoundPage from "./components/NotFoundPage";
import NotAuthorizedPage from "./components/NotAuthorizedPage";
import { useUserContext } from "./context/UserContext";
import AuthorizationManager from "./components/AuthorizationManager";

const App = () => {
  const { userData } = useUserContext();

  console.log(userData.role);
  return (
    <BrowserRouter>
      <AuthorizationManager />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        {<Route path="/control" element={userData ? <ControlPage /> : null} />}
        {<Route path="/messages" element={userData ? <MessagePage /> : null} />}
        {
          <Route
            path="/reports"
            element={
              userData.role === "admin" ? (
                <ReportsPage />
              ) : (
                <NotAuthorizedPage />
              )
            }
          />
        }
        {
          <Route
            path="/users"
            element={
              userData.role === "admin" ? <UserPage /> : <NotAuthorizedPage />
            }
          />
        }

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
