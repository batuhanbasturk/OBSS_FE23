import { useLanguageContext } from "../context/LanguageContext";

const LanguageNavbar = () => {
  const { language, setLanguage } = useLanguageContext();

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const selectStyle = {
    color: "white",
    background: "#043c5c",
    height: "3vh",
    border: "none",
    outline: "none",
    padding: "0 1rem",
  };

  return (
    <div
      style={{
        position: "relative",
        backgroundColor: "#043c5c",
        height: "3vh",
      }}
    >
      <select
        value={language}
        onChange={handleLanguageChange}
        style={selectStyle}
      >
        <option value="en">English</option>
        <option value="tr">Türkçe</option>
      </select>
    </div>
  );
};

export default LanguageNavbar;
