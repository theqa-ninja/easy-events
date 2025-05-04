/*
Toast component
Uses Material UI Snackbar and Alert components
Has icon and color based on status and a close button
https://mui.com/material-ui/react-snackbar/
https://mui.com/material-ui/react-alert/
*/

"use client";

import { Alert, Snackbar } from "@mui/material";
import React, { useState } from "react";

interface ToastProps {
  message: string;
  status?: "success" | "error";
}

export const Toast: React.FC<ToastProps> = ({
  message,
  status = "success",
}) => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <Alert
        onClose={handleClose}
        severity={status}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};
