import {
  Button,
  Dialog,
  DialogContent,
  Box,
  Typography,
} from "@material-ui/core";
import { useWeb3React } from "@web3-react/core";
import React, { useContext, useEffect } from "react";
import { SUPPORTED_WALLETS } from "src/connectors";
import { UserContext } from "src/context/User";

export default function ConnectWallet({ open, handleClose }) {
  const user = useContext(UserContext);
  const { account } = useWeb3React();

  useEffect(() => {
    if (account) {
      handleClose();
    }
  }, [account]);
console.log("SUPPORTED_WALLETS",SUPPORTED_WALLETS);
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
      <Box textAlign='center' mt={2} mb={2}>
        <Typography variant='h3'>Connect wallet</Typography>
      </Box>
      <DialogContent>
        {SUPPORTED_WALLETS.map((item, i) => {
          return (
            <Box mt={2} display='flex' justifyContent='center' width='100%'>
              <Button
                fullWidth
                variant='contained'
                color='primary'
                onClick={() => {
                  window.sessionStorage.removeItem("walletName");
                  window.sessionStorage.setItem("walletName", item.name);
                  user.connectWallet(item.data);
                }}
              >
                <Box textAlign='center'>
                  <img
                    src={item.data.iconName}
                    alt={""}
                    width='25'
                    height='25'
                    style={{ marginRight: 10, marginTop: 8 }}
                  />
                </Box>
                {item.data.name}
              </Button>
            </Box>
          );
        })}
      </DialogContent>
      <Box textAlign='center' mt={2} mb={2}>
        <Button onClick={handleClose} variant='contained' color='primary'>
          Close
        </Button>
      </Box>
    </Dialog>
  );
}
