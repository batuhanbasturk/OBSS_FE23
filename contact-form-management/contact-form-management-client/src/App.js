import { Route, Routes, BrowserRouter } from "react-router-dom";
//components
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import WelcomePage from "./components/WelcomePage";
import MessagesPage from "./components/MessagesPage";
import MessageDetailsPage from "./components/MessageDetailsPage";
import ReportsPage from "./components/ReportsPage";
import UsersPage from "./components/UsersPage";
import UserDetailsPage from "./components/UserDetailsPage";
import UserForm from "./components/UserForm";
import ImagePage from "./components/ImagePage";
import NotFoundPage from "./components/NotFoundPage";
import NotAuthorizedPage from "./components/NotAuthorizedPage";
import MessagesScrollPage from "./components/MessagesScrollPage";
//context
import { useUserContext } from "./context/UserContext";
import AuthorizationManager from "./components/AuthorizationManager";
import SelectorBar from "./components/SelectorBar";
import { useThemeContext } from "./context/ThemeContext";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

const App = () => {
  const { userData, checked } = useUserContext();
  const { theme } = useThemeContext();

  const muiTheme = createTheme({
    palette: {
      mode: theme,
    },
  });

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
          path="/messages_scroll"
          element={userData ? <MessagesScrollPage /> : <NotAuthorizedPage />}
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
      {
        <Route
          path="/images"
          element={
            userData.role === "admin" ? <ImagePage /> : <NotAuthorizedPage />
          }
        />
      }

      <Route path="/not-auth" element={<NotAuthorizedPage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  ) : (
    <></>
  );

  return (
    <BrowserRouter>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        <SelectorBar />
        <AuthorizationManager />
        {routesjsx}
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
