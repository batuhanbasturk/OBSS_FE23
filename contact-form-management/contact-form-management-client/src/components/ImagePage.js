import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
//api
import { fetchImages } from "../api/image/fetchImages";
import { deleteImage } from "../api/image/deleteImage";
import { uploadImage } from "../api/image/uploadImage";
import { strapi } from "../server/server";
//language
import { useLanguageContext } from "../context/LanguageContext";
import trTranslations from "../translations/tr";
import enTranslations from "../translations/en";
//utils
import { useSnackbar } from "../utils/snackbarUtils";
//UI
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  IconButton,
  TextField,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

const ImagePage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [customFileName, setCustomFileName] = useState("");
  const [images, setImages] = useState([]);
  //delete
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [deleteImageId, setDeleteImageId] = useState(null);
  const [imageToDeleteName, setImageToDeleteName] = useState("");
  //token
  const token = localStorage.getItem("token");
  //language
  const { language } = useLanguageContext();
  const translations = language === "tr" ? trTranslations : enTranslations;
  //snackbar
  const {
    handleSnackbarOpen: handleSuccessSnackbarOpen,
    SnackbarComponent: SuccessSnackbar,
  } = useSnackbar();

  const {
    handleSnackbarOpen: handleErrorSnackbarOpen,
    SnackbarComponent: ErrorSnackbar,
  } = useSnackbar();

  const handleDeleteConfirmationOpen = (id, imageName) => {
    setDeleteImageId(id);
    setImageToDeleteName(imageName);
    setDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirmationClose = () => {
    setDeleteImageId(null);
    setImageToDeleteName("");
    setDeleteConfirmationOpen(false);
  };

  // drag and drop
  const handleImageSelect = (event) => {
    const selectedFile = event.target.files[0];
    setSelectedImage(selectedFile);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    setSelectedImage(droppedFile);
  };
  const handleCancel = () => {
    setSelectedImage(null);
    setCustomFileName("");
  };

  const handleImageDelete = async () => {
    if (!token) {
      return;
    }
    try {
      await deleteImage(deleteImageId);
      setDeleteConfirmationOpen(false);
      handleSuccessSnackbarOpen(translations.imagePage.imageDeleted, "info");
      fetchImagesData();
    } catch (error) {
      handleErrorSnackbarOpen(
        translations.imagePage.imageDeleteFailed,
        "error"
      );
      setDeleteConfirmationOpen(false);
      console.error("Error deleting image:", error);
    }
  };

  const handleImageUpload = async () => {
    if (!token || !selectedImage) {
      return;
    }

    const imageNames = images.map((image) => image.name);
    const isImageNameUsed = imageNames.includes(selectedImage.name);
    const isCustomNameUsed =
      customFileName !== "" && imageNames.includes(customFileName);

    if (isImageNameUsed || isCustomNameUsed) {
      handleErrorSnackbarOpen(translations.imagePage.imageNameExists, "error");
      return;
    }

    try {
      const uploadFile =
        customFileName !== ""
          ? new File([selectedImage], customFileName, {
              type: selectedImage.type,
            })
          : selectedImage;

      await uploadImage(uploadFile);
      fetchImagesData();
      handleSuccessSnackbarOpen(
        translations.imagePage.imageUploaded,
        "success"
      );
      setSelectedImage(null);
      setCustomFileName("");
    } catch (error) {
      handleErrorSnackbarOpen(
        translations.imagePage.imageUploadFailed,
        "error"
      );
      console.error("Error uploading image:", error);
    }
  };

  //fetch images
  const fetchImagesData = async () => {
    try {
      const imagesByName = await fetchImages();
      const imagesArray = Object.values(imagesByName);
      setImages(imagesArray);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchImagesData();
  }, []);

  return (
    <>
      <Navbar />
      <div style={{ padding: "16px" }}>
        <Card style={{ maxWidth: "500px", margin: "0 auto" }}>
          <CardContent>
            <h2>{translations.imagePage.uploadImage}</h2>
            <div
              style={{
                border: "2px dashed #aaa",
                padding: "20px",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
            >
              {selectedImage ? (
                <div>
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt={selectedImage.name}
                    style={{ maxWidth: "100%", maxHeight: "200px" }}
                  />
                  <TextField
                    label={translations.imagePage.customFileName}
                    value={customFileName}
                    onChange={(e) => setCustomFileName(e.target.value)}
                  />
                  <p>{selectedImage.name}</p>
                  <IconButton onClick={handleCancel}>
                    <CancelIcon />
                  </IconButton>
                </div>
              ) : (
                <div>
                  <CloudUploadIcon fontSize="large" />
                  <p>{translations.imagePage.dragdropImage}</p>
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleImageSelect}
                    id="fileInput"
                  />
                  <label htmlFor="fileInput">
                    <Button variant="outlined" color="primary" component="span">
                      {translations.imagePage.chooseFile}
                    </Button>
                  </label>
                </div>
              )}
            </div>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              color="primary"
              onClick={handleImageUpload}
              fullWidth
            >
              {translations.imagePage.upload}
            </Button>
          </CardActions>
        </Card>

        <Grid container spacing={2}>
          {images.map((image) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={image.name}>
              <Card style={{ maxWidth: "345px", margin: "8px" }}>
                <CardMedia
                  component="img"
                  sx={{
                    width: "100%",
                    height: "140px",
                    objectFit: "fill",
                    padding: "8px",
                    background: "#D3D3D3",
                  }}
                  src={`${strapi}${image.url}`}
                  alt={image.alternativeText}
                />
                <CardContent>
                  <h3>{image.name}</h3>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    color="secondary"
                    onClick={() =>
                      handleDeleteConfirmationOpen(image.id, image.name)
                    }
                  >
                    {translations.imagePage.delete}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
      <Dialog
        open={deleteConfirmationOpen}
        onClose={handleDeleteConfirmationClose}
      >
        <DialogTitle>
          {translations.imagePage.deleteConfirmationTitle}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {translations.imagePage.deleteConfirmationContent} "
            {imageToDeleteName}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteConfirmationClose} color="primary">
            {translations.imagePage.deleteConfirmationCancel}
          </Button>
          <Button onClick={handleImageDelete} color="primary">
            {translations.imagePage.deleteConfirmationDelete}
          </Button>
        </DialogActions>
      </Dialog>
      <SuccessSnackbar />
      <ErrorSnackbar />
    </>
  );
};

export default ImagePage;
