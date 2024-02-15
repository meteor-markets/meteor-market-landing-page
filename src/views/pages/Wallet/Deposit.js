import React, { useState } from "react";
import {
  Box,
  Typography,
  makeStyles,
  Button,
  Tooltip,
} from "@material-ui/core";
import CopyToClipboard from "react-copy-to-clipboard";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  depositMainBox: {
    backgroundColor: "#1C1C1C",
    borderRadius: "9px",
    padding: "40px",
    maxWidth: "800px",
  },
  selectBox: {
    "& select": {
      width: "100%",
      backgroundColor: "rgb(255 255 255 / 30%)",
      padding: "15px 10px",
      borderRadius: "9px",
      color: "#fff",
      "& option": {
        color: "#000",
      },
    },
  },
  depositAddress: {
    padding: "10px 15px",
    borderRadius: "9px",
    backgroundColor: "rgb(255 255 255 / 5%)",
    border: "1px solid rgb(255 255 255 / 10%)",
    "& .addressType": {
      color: "rgb(255 255 255 / 20%)",
    },
  },
}));

export default function Deposit() {
  const classes = useStyles();
  const [getSelectNetWork, setSelectNetWork] = useState("0");

  return (
    <Box className={classes.depositMainBox} mb={4}>
      <Box className={classes.selectBox}>
        <select
          onChange={(e) => setSelectNetWork(e.target.value)}
          value={getSelectNetWork}
        >
          <option value="0">
            Select
          </option>
          <option value="Dai">DAI</option>
          <option value="BTC">BNB</option>
        </select>
        
      </Box>
      <Box textAlign={"center"} mt={5} mb={5}>
        <img src="../images/deposit-qrcode.png" alt="deposit" />
      </Box>
      <Box
        className={classes.depositAddress}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Box>
          <Typography variant="body1" className={classes.addressType}>
            deposit address (bTC)
          </Typography>
          <Typography variant="h4">283h976qwe9ry25r817gf31f4fk17f9g</Typography>
        </Box>
        <Tooltip title="Copy">
          <CopyToClipboard text={"283h976qwe9ry25r817gf31f4fk17f9g"}>
            <FileCopyIcon
              style={{
                marginLeft: "5px",
                color: "#fff",
                cursor: "pointer",
              }}
              fontSize="small"
              onClick={() =>
                toast.info("Copied", {
                  position: toast.POSITION.BOTTOM_RIGHT,
                })
              }
            />
          </CopyToClipboard>
        </Tooltip>
      </Box>
      <Typography
        variant="body1"
        style={{ maxWidth: "435px", margin: "20px auto", textAlign: "center" }}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        temposLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempo
      </Typography>
      <Box textAlign={"center"}>
        <Button
          variant="contained"
          style={{ padding: "10px 50px", fontSize: "1rem" }}
        >
          PLEACE WHITDRAWAL
        </Button>
      </Box>
    </Box>
  );
}
