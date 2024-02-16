import { Box } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";

const Logo = (props) => {
  const history = useHistory();

  return (
    <Box style={{ padding: " 0px 10px", borderRadius: "4px" }}>
      <img
        onClick={() => history.push("/")}
        src="https://res.cloudinary.com/dtbw2hh88/image/upload/v1708023413/h0bpj8tuiys51ex2t9dp.png"
        alt="Logo"
        {...props}
        width="100px"
      />
    </Box>
  );
};

export default Logo;
