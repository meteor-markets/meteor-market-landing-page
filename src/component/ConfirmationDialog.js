import React from "react";
import {
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { Link } from "react-router-dom";
export default function AlertDialog({ open, handleClose }) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" style={{ textAlign: "center" }}>
          <Typography variant="h2" style={{ color: "#ffff" }}>
            Disconnect
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography
              style={{
                textAlign: "center",
                fontSize: "24px",
                fontWeight: "400",
                color: "#fff",
              }}
            >
              Are you sure you want to Disconnect ?
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              handleClose();
            }}
          >
            No
          </Button>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button
              variant="containedPrimary"
              onClick={() => {
                window.sessionStorage.clear();
                handleClose();
              }}
              autoFocus
            >
              Yes
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </div>
  );
}
