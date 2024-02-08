import { Box } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";

const Logo = (props) => {
  const history = useHistory();

  return (
    <Box style={{ padding: " 0px 10px", borderRadius: "4px" }}>
      <img
        onClick={() => history.push("/")}
        src="https://i.ibb.co/NtRnxg4/Kian-logo.png"
        alt="Logo"
        {...props}
        width="70px"
      />
    </Box>
  );
};

export default Logo;
