import * as React from "react";
import { Box, CircularProgress } from "@material-ui/core";

export default function CircularIndeterminate(props) {
  return (
    <Box sx={{ display: "flex", paddingLeft: props?.pedding }}>
      <CircularProgress
        size={props?.size}
        thickness={props?.thickness}
        style={{ color: "rgb(2 109 91)", width: "50px" }}
      />
    </Box>
  );
}
