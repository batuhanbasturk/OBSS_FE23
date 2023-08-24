import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchImages } from "../api/image/fetchImages";

const ImageContext = createContext();

export const useImageContext = () => useContext(ImageContext);

export const ImageProvider = ({ children }) => {
  const [images, setImages] = useState([]);

  const getImages = async () => {
    try {
      const imagesData = await fetchImages();
      setImages(imagesData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getImages();
  }, []);

  return (
    <ImageContext.Provider value={{ images }}>{children}</ImageContext.Provider>
  );
};
