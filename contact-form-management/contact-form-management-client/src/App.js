import { Route, Routes, BrowserRouter } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import WelcomePage from "./components/WelcomePage";
import MessagesPage from "./components/MessagesPage";
import MessageDetailsPage from "./components/MessageDetailsPage";
import ReportsPage from "./components/ReportsPage";
import UsersPage from "./components/UsersPage";
import UserDetailsPage from "./components/UserDetailsPage";
import UserForm from "./components/UserForm";
import NotFoundPage from "./components/NotFoundPage";
import NotAuthorizedPage from "./components/NotAuthorizedPage";
import { useUserContext } from "./context/UserContext";
import AuthorizationManager from "./components/AuthorizationManager";
import LanguageNavbar from "./components/LanguageNavbar";

const App = () => {
  const { userData, checked } = useUserContext();
  const routesjsx = checked ? (
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
            userData.role === "admin" ? <ReportsPage /> : <NotAuthorizedPage />
          }
        />
      }
      {
        <Route
          path="/users"
          element={
            userData.role === "admin" ? <UsersPage /> : <NotAuthorizedPage />
          }
        />
      }
      {
        <Route
          path="/user/:id"
          element={
            userData.role === "admin" ? (
              <UserDetailsPage />
            ) : (
              <NotAuthorizedPage />
            )
          }
        />
      }
      {
        <Route
          path="/user/add"
          element={
            userData.role === "admin" ? <UserForm /> : <NotAuthorizedPage />
          }
        />
      }

      <Route path="/not-auth" element={<NotAuthorizedPage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  ) : (
    <>Loading...</>
  );

  return (
    <BrowserRouter>
      <LanguageNavbar />
      <AuthorizationManager />
      {routesjsx}
    </BrowserRouter>
  );
};

export default App;
