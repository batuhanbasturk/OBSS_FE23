import { useLanguageContext } from "../context/LanguageContext";
import styles from "../styles/LanguageNavbar.module.css";

const LanguageNavbar = () => {
  const { language, setLanguage } = useLanguageContext();

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <div className={styles.navRow}>
      <select
        value={language}
        onChange={handleLanguageChange}
        className={styles.selectStyle}
      >
        <option value="en">English</option>
        <option value="tr">Türkçe</option>
      </select>
    </div>
  );
};

export default LanguageNavbar;
