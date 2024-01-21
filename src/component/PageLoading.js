import React from "react";
import { makeStyles, Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    alignItems: "center",
    background: "transparent",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    justifyContent: "center",
    left: 0,
    padding: theme.spacing(3),
    position: "fixed",
    top: 0,
    width: "100%",
    zIndex: 2000,
  },
  loader: {
    width: "100%",
    maxWidth: "160px",
    margin: "auto",
  },
  progressBar: {
    height: "3px",
  },
}));

export default function PageLoading() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Box width={300}>
        <img
          className={classes.loader}
          src="/images/pageLoading1.gif"
          alt="loader"
        />
      </Box>
    </div>
  );
}
