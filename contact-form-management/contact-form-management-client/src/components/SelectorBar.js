//Context
import { useThemeContext } from "../context/ThemeContext";
import { useLanguageContext } from "../context/LanguageContext";
//Components
import LanguageSelector from "./LanguageSelector";
import ThemeSelector from "./ThemeSelector";
//UI
import styles from "../styles/SelectorBar.module.css";

const SelectorBar = () => {
  const { theme, toggleTheme } = useThemeContext();
  const { language, setLanguage } = useLanguageContext();

  const handleToggleTheme = () => {
    toggleTheme();
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <div className={styles.container}>
      {/* Language*/}
      <LanguageSelector
        language={language}
        onLanguageChange={handleLanguageChange}
      />
      {/* Theme*/}
      <ThemeSelector theme={theme} handleToggleTheme={handleToggleTheme} />
    </div>
  );
};

export default SelectorBar;
