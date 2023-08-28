import { useState, useEffect } from "react";
import { Grid, TextField, Button } from "@mui/material";
import { useLanguageContext } from "../context/LanguageContext";
import { updateLabels } from "../api/label/updateLabels";
import { useSnackbar } from "../utils/snackbarUtils";
import Navbar from "./Navbar";

const LabelPage = () => {
  const { trLabels, enLabels, labels } = useLanguageContext();
  const [updatedTrLabels, setUpdatedTrLabels] = useState({});
  const [updatedEnLabels, setUpdatedEnLabels] = useState({});

  const [trLabelChanged, setTrLabelChanged] = useState(false);
  const [enLabelChanged, setEnLabelChanged] = useState(false);

  const {
    handleSnackbarOpen: handleSuccessSnackbarOpen,
    SnackbarComponent: SuccessSnackbar,
  } = useSnackbar();

  const {
    handleSnackbarOpen: handleErrorSnackbarOpen,
    SnackbarComponent: ErrorSnackbar,
  } = useSnackbar();

  const handleTrLabelChange = (key, value) => {
    setUpdatedTrLabels((prevLabels) => ({
      ...prevLabels,
      [key]: value,
    }));
    setTrLabelChanged(true);
  };

  const handleEnLabelChange = (key, value) => {
    setUpdatedEnLabels((prevLabels) => ({
      ...prevLabels,
      [key]: value,
    }));
    setEnLabelChanged(true);
  };

  const handleSubmit = async () => {
    try {
      if (trLabelChanged) {
        await updateLabels("tr", updatedTrLabels);
      }
      if (enLabelChanged) {
        await updateLabels("en", updatedEnLabels);
      }
      handleSuccessSnackbarOpen(labels.labelUpdated, "success");
    } catch (error) {
      console.log(error);
      handleErrorSnackbarOpen(labels.labelUpdateFailed, "error");
    } finally {
      setTrLabelChanged(false);
      setEnLabelChanged(false);
    }
  };

  useEffect(() => {
    setUpdatedTrLabels(trLabels);
    setUpdatedEnLabels(enLabels);
  }, [trLabels, enLabels]);

  return (
    <>
      <Navbar />
      <div style={{ textAlign: "center" }}>
        <h2>{trLabels.locale}</h2>
        <form>
          <Grid container spacing={2}>
            {Object.keys(trLabels).map((key) => (
              <Grid item key={key} xs={12} sm={6} md={4} lg={3}>
                <TextField
                  label={key}
                  value={updatedTrLabels[key]}
                  variant="outlined"
                  fullWidth
                  onChange={(e) => handleTrLabelChange(key, e.target.value)}
                />
              </Grid>
            ))}
          </Grid>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{ margin: 1 }}
            disabled={!trLabelChanged}
          >
            {trLabels.submitButton}
          </Button>
        </form>
        <h2>{enLabels.locale}</h2>
        <form>
          <Grid container spacing={2}>
            {Object.keys(enLabels).map((key) => (
              <Grid item key={key} xs={12} sm={6} md={4} lg={3}>
                <TextField
                  label={key}
                  value={updatedEnLabels[key]}
                  variant="outlined"
                  fullWidth
                  onChange={(e) => handleEnLabelChange(key, e.target.value)}
                />
              </Grid>
            ))}
          </Grid>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{ margin: 1 }}
            disabled={!enLabelChanged}
          >
            {enLabels.submitButton}
          </Button>
        </form>
      </div>
      <SuccessSnackbar />
      <ErrorSnackbar />
    </>
  );
};

export default LabelPage;
