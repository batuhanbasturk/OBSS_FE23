import { useState } from "react";

const useFileInput = () => {
  const [file, setFile] = useState(null);
  const [base64Photo, setBase64Photo] = useState("");

  const handleChange = (newFile) => {
    setFile(newFile);

    if (newFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64String = e.target.result;
        setBase64Photo(base64String);
      };
      reader.readAsDataURL(newFile);
    } else {
      setBase64Photo("");
    }
  };

  return { file, base64Photo, handleChange };
};

export default useFileInput;
