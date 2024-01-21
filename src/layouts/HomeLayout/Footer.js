import React from "react";
import { Grid, Box, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({}));

export default function Footer() {
  const classes = useStyles();

  return (
    <Box className={classes.mainFooter} mt={5} pt={5}>
      <Grid container spacing={5} justifyContent="space-between">
        <Grid item lg={5}>
          <Box>
            <img src="/images/kian-logo.png" alt="Logo" width="100%" style={{maxWidth:"180px"}} />
          </Box>
          <Typography variant="body1" className="textColorFormate">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temposLorem ipsum dolor sit amet</Typography>
        </Grid>
        <Grid item lg={2}>
            <Typography variant="h3" style={{marginBottom:"10px"}}>App</Typography>
            <Typography variant="body1" className="textColorFormate">Lending</Typography>
            <Typography variant="body1" className="textColorFormate">Stake</Typography>
            <Typography variant="body1" className="textColorFormate">Swap</Typography>
            <Typography variant="body1" className="textColorFormate">Bridge</Typography>
        </Grid>
        <Grid item lg={2}>
        <Typography variant="h3" style={{marginBottom:"10px"}}>Docs</Typography>
            <Typography variant="body1" className="textColorFormate">GitHub</Typography>
            <Typography variant="body1" className="textColorFormate">Documnets</Typography>
            <Typography variant="body1" className="textColorFormate">Medium</Typography>
            <Typography variant="body1" className="textColorFormate">Audit</Typography>
        </Grid>
        <Grid item lg={2}>
        <Typography variant="h3" style={{marginBottom:"10px"}}>Social</Typography>
            <Typography variant="body1" className="textColorFormate">Twitter</Typography>
            <Typography variant="h4">Community</Typography>
            <Typography variant="body1" className="textColorFormate">Telegram</Typography>
            <Typography variant="body1" className="textColorFormate">Discord</Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
