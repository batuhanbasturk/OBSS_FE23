import { useState } from "react";
//navigation
import { useNavigate, Link } from "react-router-dom";
//API
import { logout } from "../api/login/logout";
//Context
import { useUserContext } from "../context/UserContext";
import { useLanguageContext } from "../context/LanguageContext";
import trTranslations from "../translations/tr";
import enTranslations from "../translations/en";
//UI
import {
  Button,
  Menu,
  MenuItem,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Avatar,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoImage from "../images/obss.svg";

const Navbar = () => {
  const { userData } = useUserContext();
  const { language } = useLanguageContext();
  const translations = language === "tr" ? trTranslations : enTranslations;
  const navigate = useNavigate();
  //
  const pages =
    userData.role === "admin" ? ["messages", "users", "reports"] : ["messages"];
  const settings = translations.navbar.logout;

  // State to handle the anchor element for the main menu (MenuIcon) dropdown
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  // State to handle the anchor element for the user's photo dropdown menu
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState(null);

  // State to handle the logout dialog
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  // Open the logout dialog
  const handleLogoutDialogOpen = () => {
    setLogoutDialogOpen(true);
  };

  // Close the logout dialog
  const handleLogoutDialogClose = () => {
    setLogoutDialogOpen(false);
  };

  // Open the main menu dropdown
  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  // Open the user's photo dropdown menu
  const handleUserMenuOpen = (event) => {
    setUserMenuAnchorEl(event.currentTarget);
  };

  // Close both the main menu and user's photo dropdown menus
  const handleCloseMenus = () => {
    setMenuAnchorEl(null);
    setUserMenuAnchorEl(null);
  };

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    try {
      await logout(token);
      localStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      console.log(error);
      //Should do token is required for logout than back to login page
    }
  };

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#043c5c", height: "7vh" }}
    >
      <Toolbar disableGutters>
        {/* Logo */}
        <Avatar
          alt="Logo"
          src={LogoImage}
          sx={{
            width: 30,
            height: 30,
            display: { xs: "none", md: "flex" },
            mr: 2,
            ml: 2,
          }}
        />
        {/* Welcome page navigator */}
        <Typography
          variant="h6"
          noWrap
          component={Link}
          to="/welcome"
          sx={{
            mr: 2,
            display: { xs: "none", md: "flex" },
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          OBSS
        </Typography>
        {/* Mobile menu dropdown */}
        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenuOpen}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={menuAnchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(menuAnchorEl)}
            onClose={handleCloseMenus}
            sx={{
              display: { xs: "block", md: "none" },
            }}
          >
            {/* Mobile page navigator */}
            {pages.map((page) => (
              <MenuItem
                key={page}
                component={Link}
                to={`/${page.toLowerCase()}`}
                onClick={handleCloseMenus}
              >
                <Typography textAlign="center">
                  {translations.navbar[page]}
                </Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
        {/* Desktop menu */}
        <Avatar
          alt="Logo"
          src={LogoImage}
          sx={{
            width: 30,
            height: 30,
            display: { xs: "flex", md: "none" },
            mr: 1,
            ml: 2,
          }}
        />
        <Typography
          variant="h5"
          noWrap
          component={Link}
          to="/welcome"
          sx={{
            mr: 2,
            display: { xs: "flex", md: "none" },
            flexGrow: 1,
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          OBSS
        </Typography>
        {/*navigation pages*/}
        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          {pages.map((page) => (
            <Button
              key={page}
              component={Link}
              to={`/${page.toLowerCase()}`}
              sx={{ my: 2, color: "white", display: "block", mx: 2 }}
            >
              {translations.navbar[page]}
            </Button>
          ))}
        </Box>

        <Box sx={{ flexGrow: 0, pr: 2 }}>
          <Tooltip title={translations.navbar.settings}>
            <IconButton onClick={handleUserMenuOpen} sx={{ p: 0, mb: 1 }}>
              {/* User's photo */}
              <Avatar
                alt="User"
                src={userData.base64Photo}
                sx={{ width: 50, height: 50 }}
              />
            </IconButton>
          </Tooltip>
          {/* User's photo dropdown menu */}
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={userMenuAnchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(userMenuAnchorEl)}
            onClose={handleCloseMenus}
          >
            {/* User's username */}
            <Typography textAlign="center">{userData.username}</Typography>

            <MenuItem
              key={settings}
              onClick={
                settings === translations.navbar.logout
                  ? handleLogoutDialogOpen
                  : handleCloseMenus
              }
            >
              {/* Logout */}
              <Typography textAlign="center">
                {translations.navbar.logout}
              </Typography>
            </MenuItem>
          </Menu>
          {/* Logout dialog */}
          <Dialog open={logoutDialogOpen} onClose={handleLogoutDialogClose}>
            <DialogTitle>{translations.navbar.logout}</DialogTitle>
            <DialogContent>
              <Typography>{translations.navbar.logoutDialogContent}</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleLogoutDialogClose} color="primary">
                {translations.navbar.logoutDialogCancelButton}
              </Button>
              <Button onClick={handleLogout} color="primary" autoFocus>
                {translations.navbar.logoutDialogLogoutButton}
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
