import { Route, Routes, BrowserRouter } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import WelcomePage from "./components/WelcomePage";
import MessagesPage from "./components/MessagesPage";
import MessageDetailsPage from "./components/MessageDetailsPage";
import ReportsPage from "./components/ReportsPage";
import UserPage from "./components/UserPage";
import NotFoundPage from "./components/NotFoundPage";
import NotAuthorizedPage from "./components/NotAuthorizedPage";
import { useUserContext } from "./context/UserContext";
import AuthorizationManager from "./components/AuthorizationManager";

const App = () => {
  const { userData } = useUserContext();

  return (
    <BrowserRouter>
      <AuthorizationManager />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        {<Route path="/welcome" element={userData ? <WelcomePage /> : null} />}
        {
          <Route
            path="/messages"
            element={userData ? <MessagesPage /> : <NotAuthorizedPage />}
          />
        }
        {
          <Route
            path="/message/:id"
            element={userData ? <MessageDetailsPage /> : null}
          />
        }

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
        <Route path="/not-auth" element={<NotAuthorizedPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
