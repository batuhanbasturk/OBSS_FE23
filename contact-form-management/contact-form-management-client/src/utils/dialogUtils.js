import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

export const useDialog = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const DialogComponent = ({ title, message, actionText, handleAction }) => (
    <Dialog open={dialogOpen} onClose={handleDialogClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography>{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleAction} color="primary" autoFocus>
          {actionText}
        </Button>
      </DialogActions>
    </Dialog>
  );

  return {
    handleDialogOpen,
    handleDialogClose,
    DialogComponent,
  };
};
