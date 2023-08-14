//MUI
import { IconButton } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const ThemeSelector = ({ theme, handleToggleTheme }) => {
  return (
    <IconButton sx={{ ml: 1 }} onClick={handleToggleTheme} color="inherit">
      {theme === "dark" ? (
        <Brightness7Icon style={{ height: "18" }} />
      ) : (
        <Brightness4Icon style={{ height: "18" }} />
      )}
    </IconButton>
  );
};

export default ThemeSelector;
