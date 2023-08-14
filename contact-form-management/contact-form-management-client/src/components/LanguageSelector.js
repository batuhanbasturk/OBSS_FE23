import { Select, MenuItem } from "@mui/material";

const LanguageSelector = ({ language, handleLanguageChange }) => {
  return (
    <>
      <Select
        value={language}
        onChange={handleLanguageChange}
        style={{ height: "1.4rem" }}
      >
        <MenuItem value="en">English</MenuItem>
        <MenuItem value="tr">Türkçe</MenuItem>
      </Select>
    </>
  );
};

export default LanguageSelector;
